
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";
import _ from "lodash";

// Base types
export type ContactMechType = 'email' | 'phone' | 'address' | 'url'
export type PartyType = 'PERSON' | 'ORG' | 'SYSTEM'
export type DisplayFormat = 'LEGAL_ONLY'| 'OPERATING_ONLY'| 'LEGAL_OA_OPERATING' |'FIRST_LAST'| 'SALUTATION_FIRST_LAST'| 'FIRST_MIDDLE_LAST'| 'FULL'

// Base interfaces
export interface BaseEntity {
    id: number;
    validFrom?: Date;
    validTo?: Date;
    isActive?: boolean;
    deletedAt?: Date;
}

// Contact Mechanism interfaces
export interface ContactMech extends BaseEntity {
    type: ContactMechType;
    value: string;
    isPrimary: boolean;
}

export interface ContactMechsMap {
    email?: ContactMech | ContactMech[];
    phone?: ContactMech | ContactMech[];
    address?: ContactMech | ContactMech[];
    url?: ContactMech | ContactMech[];
}

// Role interfaces
export interface Role extends BaseEntity {
    type: string;
    partyId: string;
    cmsForRole?: ContactMech[];
}

// Relationship interfaces
export interface Relationship extends BaseEntity {
    type: string;
    fromPartyId: number;
    toPartyId: number;
    fromPartyName?: string;
    toPartyName?: string;
}

export interface RelationshipMap {
    from: Relationship[];
    to: Relationship[];
}

// Party interfaces
export interface Party extends BaseEntity {
    type: PartyType;
    salutation?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    legalName?: string;
    operatingName?: string;
    displayNameFormat?: DisplayFormat;
    contactMechs?: ContactMechsMap;
    roles?: Role[];
    relationships?: RelationshipMap;
}

// Request/Response interfaces
export interface CreatePartyRequest {
    type: PartyType;
    salutation?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    legalName?: string;
    operatingName?: string;
    displayNameFormat?: DisplayFormat;
    validFrom?: Date;
    validTo?: Date;
    primaryContactMechs?: {
        email?: string;
        phone?: string;
        address?: string;
        url?: string;
    };
    roles?: {
        type: string;
        validFrom?: Date;
        validTo?: Date;
        cmsForRole?: {
            type: ContactMechType;
            value: string;
            isPrimary?: boolean;
        }[];
    }[];
}

interface BaseResponse {
    id: number;
    validFrom?: Date;
    validTo?: Date;
    isActive?: boolean;
    deletedAt?: Date;
}

interface ContactMechResponse extends BaseResponse {
    type: ContactMechType;
    value: string;
    isPrimary: boolean;
}

interface RoleResponse extends BaseResponse {
    type: string;
    cmsForRole?: ContactMechResponse[];
}

interface RelationshipResponse extends BaseResponse {
    type: string;
    fromPartyId: number;
    toPartyId: number;
    fromPartyName?: string;
    toPartyName?: string;
}

interface PartyResponse extends BaseResponse {
    salutation?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    legalName?: string;
    operatingName?: string;
    displayNameFormat: DisplayFormat;
    type: string;
    contactMechs?: {
        email?: ContactMechResponse;
        phone?: ContactMechResponse;
        address?: ContactMechResponse;
        url?: ContactMechResponse;
    };
    roles?: RoleResponse[];
    relationships?: {
        from: RelationshipResponse[];
        to: RelationshipResponse[];
    };
}

// Database configuration
const PartyDB = new SQLDatabase("party", {
    migrations: "./migrations",
});

const orm = knex({ client: "pg", connection: PartyDB.connectionString,
    postProcessResponse: (result) => {
        // Convert snake_case to camelCase in returned data
        if (Array.isArray(result)) {
          return result.map(row => _.mapKeys(row, (v, k) => _.camelCase(k)));
        } else {
          return _.mapKeys(result, (v, k) => _.camelCase(k));
        }
      },
      wrapIdentifier: (value, origImpl) => {
        // Convert camelCase to snake_case in queries
        if (value === '*') return value;
        const newValue = _.snakeCase(value);
        return origImpl(newValue);
      }
 });

// Get party by id
export const get = api(
    { expose: true, method: "GET", path: "/party/:id" },
    async ({ id }: { id: number }): Promise<Party> => {
        const party = await orm('parties').where('id', id).first();
        const contactMechs = await getPartyPrimaryContactMechs(id, orm);
        return { ...party, contactMechs };
    }
);

export const create = api(
    { expose: true, method: "POST", path: "/party" },
    async (params: CreatePartyRequest): Promise<Party> => {
        return await orm.transaction(async trx => {
            // Create party
            const displayFormat = params.displayNameFormat || (params.type === 'PERSON' ? 'FIRST_LAST' : 'OPERATING_ONLY');

            const [party] = await trx('parties').insert({
                salutation: params.salutation,
                firstName: params.firstName,
                middleName: params.middleName,
                lastName: params.lastName,
                legalName: params.legalName,
                operatingName: params.operatingName,
                displayNameFormat: displayFormat,
                type: params.type,
                valid_from: params.validFrom,
                valid_to: params.validTo
            }).returning('*');

            // Add primary CMs if provided
            if (params.primaryContactMechs) {
                await addPrimaryContactMechs(party.id, params.primaryContactMechs, trx);
            }

            // // Add roles and their CMs if provided
            // if (params.roles) {
            //     await addRolesWithCMs(party.id, params.roles, trx);
            // }

            return await getFullParty(party.id, trx);
        });
    }
);

async function getFullParty(partyId: number, trx: any): Promise<PartyResponse> {
    const party = await trx('parties').where({'id': partyId, deleted_at: null}).first();
    const cms = await getPartyPrimaryContactMechs(partyId);
    // const roles = await getPartyRolesWithCMs(partyId, trx);
    // const relationships = await getPartyRelationships(partyId, trx);
    
    return {
        ...party,
        contactMechs: cms//,
        // roles,
        // relationships,
        // isActive: isCurrentlyValid(party.valid_from, party.valid_to)
    };
}

// Helper functions
async function addPrimaryContactMechs(partyId: number, cms: Record<string, string>, trx: any ) {
    const entries = Object.entries(cms);
    for (const [type, value] of entries) {
        if (value) {
            await trx('contact_mechanisms').insert({
                party_id: partyId,
                type,
                value,
                is_primary: true
            });
        }
    }
}

async function getPartyPrimaryContactMechs(partyId: number) {
    const cms = await orm('contact_mechanisms')
        .where({ party_id: partyId, is_primary: true, deleted_at: null })
        .select();
    
    return cms.reduce((acc, cm) => ({
        ...acc,
        [cm.type]: { id: cm.id, value: cm.value, isPrimary: cm.isPrimary }
    }), {});

}

