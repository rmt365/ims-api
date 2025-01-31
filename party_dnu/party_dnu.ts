/*
Get party by id
    /party/:id
    {id, type, name, 
    contactMechs:{
        email:{id, value, isPrimary}, 
        phone:{id, value, isPrimary}, 
        address:{id, value, isPrimary}, 
        url::{id, value, isPrimary}
    }, 
    roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}

Get full party by id
    /party/:id/full
    {id, type, name, 
    contactMechs:{
        email:[{id, value, isPrimary}], 
        phone:[{id, value, isPrimary}], 
        address:[{id, value, isPrimary}], 
        url:[{id, value, isPrimary}]
    }, 
    roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}],
    relationships:{from:[{id, type, partyId, partyName}], to:[{id, type, partyId, partyName}]}}
    }

Get party roles by party id
    /party/:id/roles
    {roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}

Get party relationships by party id
    /party/:id/relationships
    {from:[{id, type, partyId, partyName}], to:[{id, type, partyId, partyName}]}

Get party contact mechs by party id
    /party/:id/cms
    {email:[{id, value, isPrimary}], 
    phone:[{id, value, isPrimary}], 
    address:[{id, value, isPrimary}], 
    url:[{id, value, isPrimary}]}

get party contact mech by party id and type
    /party/:id/cms/:type
    [{id, value, isPrimary}]
    
Get party primary contact mech by party id and type
    /party/:id/cms/:type/primary
    {id, value}

get party primary contact mechs by party id
    /party/:id/cms/primary
    {email:{id, value, isPrimary}, 
     phone:{id, value, isPrimary}, 
     address:{id, value, isPrimary}, 
     url::{id, value, isPrimary}}   
    
Get party by name
    /party/name/:name
    [{id, type, name, 
        contactMechs:{
            email:{id, value, isPrimary}, 
            phone:{id, value, isPrimary}, 
            address:{id, value, isPrimary}, 
            url::{id, value, isPrimary}
        }, 
        roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}
   ]

******
list parties
    /party
    [{id, type, name, 
    contactMechs:{
        email:{id, value, isPrimary}, 
        phone:{id, value, isPrimary}, 
        address:{id, value, isPrimary}, 
        url::{id, value, isPrimary}
    }, 
    roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}]

list parties full
    /party/full
    [{id, type, name,
     contactMechs:{ 
        email:[{id, value, isPrimary}], 
        phone:[{id, value, isPrimary}], 
        address:[{id, value, isPrimary}], 
        url::[{id, value, isPrimary}]
    }, 
    roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}],
    relationships:{from:[{id, type, partyId, partyName}], to:[{id, type, partyId, partyName}]}}}]

list parties that meet criteria
    /party?criteria
    [{id, type, name,
     contactMechs:{ 
        email:{id, value, isPrimary}, 
        phone:{id, value, isPrimary}, 
        address:{id, value, isPrimary}, 
        url:{id, value, isPrimary}
        }, 
     roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}],
     relationships:{from:[{id, type, partyId, partyName}], to:[{id, type, partyId, partyName}]}}}]
     criteria is xpath format

list full parties that meet criteria
    /party/full?criteria
    [{id, type, name,
     contactMechs:{ 
        email:[{id, value, isPrimary}], 
        phone:[{id, value, isPrimary}], 
        address:[{id, value, isPrimary}], 
        url::[{id, value, isPrimary}]
        }, 
     roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}],
     relationships:{from:[{id, type, partyId, partyName}], to:[{id, type, partyId, partyName}]}}}]
     criteria is xpath format

******
Post party
    accept name, type, validFrom, validTo
    return {id, type, name, validFrom, validTo, isActive}
    
post party with primary contact mechs
    accept id, primary email, primary phone, primary address
    return {id, type, name,
        contactMechs:{ 
            email:{id, value, isPrimary}, 
            phone:{id, value, isPrimary}, 
            address:{id, value, isPrimary}, 
            url::{id, value, isPrimary}
            }
        } 
    }

post party with roles
    accept name, type, roles:[{type, validFrom, validTo, cmsForRole:[{type, value, isPrimary}]}]
    return {id, type, name, roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}

post party with primary contact mechs and roles
    accept name, type, 
            primary email, 
            primary phone, 
            primary address, 
            roles:[{type, validFrom, validTo, cmsForRole:[{type, value, isPrimary}]}]
    return {id, type, name,         
       contactMechs:{ 
            email:{id, value, isPrimary}, 
            phone:{id, value, isPrimary}, 
            address:{id, value, isPrimary}, 
            url::{id, value, isPrimary}
            }, 
        roles:[{id, type, cmsForRole:[{id, type, value, isPrimary}]}]}

*******
Put party
    accept id, name, type
    return {id, type, name}

put party contact mech
    accept id, type, value, isPrimary, validFrom, validTo
    return {id, value, isPrimary, validFrom, validTo, isActive}

put party role
    accept id, type, validFrom, validTo
    return {id, type, validFrom, validTo, isActive}

put party relationship
    accept id, type, fromPartyId, toPartyId, validFrom, validTo
    return {id, type, fromPartyId, toPartyId, validFrom, validTo, isActive}

*******
del party
    /party/:id
    {id, type, name, deletedAt}

del party contact mech
    /party/:id/cms/:type/:id
    {id, value, isPrimary, deletedAt}

del party contact mech by type
    /party/:id/cms/:type
    [{id, value, isPrimary, deletedAt}]

del party role
    /party/:id/role/:id
    {id, type, deletedAt}

del party role by type
    /party/:id/role/:type
    [{id, type, deletedAt}]

del party relationship
    /party/:id/relationship/:id
    {id, type, fromPartyId, toPartyId, deletedAt}

*/

/*
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import knex from "knex";

// Base types
export type ContactMechType = 'email' | 'phone' | 'address' | 'url'
export type PartyType = 'PERSON' | 'ORG' | 'SYSTEM'

// Base interfaces
export interface BaseEntity {
    id: string;
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
    fromPartyId: string;
    toPartyId: string;
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
    name: string;
    contactMechs?: ContactMechsMap;
    roles?: Role[];
    relationships?: RelationshipMap;
}

// Request/Response interfaces
export interface CreatePartyRequest {
    name: string;
    type: PartyType;
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

export interface UpdatePartyRequest {
    name?: string;
    type?: PartyType;
    validFrom?: Date;
    validTo?: Date;
}

export interface ListResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}

// Search interfaces
export interface SearchParams {
    criteria?: string;
    page?: number;
    limit?: number;
}


interface UpdatePartyRequest {
    name?: string;
    type?: string;
    validFrom?: Date;
    validTo?: Date;
}

interface UpdateContactMechRequest {
    value: string;
    isPrimary?: boolean;
    validFrom?: Date;
    validTo?: Date;
}

interface UpdateRoleRequest {
    type?: string;
    validFrom?: Date;
    validTo?: Date;
    cmsForRole?: {
        type: 'email' | 'phone' | 'address' | 'url';
        value: string;
        isPrimary?: boolean;
    }[];
}

interface UpdateRelationshipRequest {
    type?: string;
    fromPartyId?: number;
    toPartyId?: number;
    validFrom?: Date;
    validTo?: Date;
}

// Database configuration
const PartyDB = new SQLDatabase("party", {
    migrations: "./migrations",
});

const orm = knex({ client: "pg", connection: PartyDB.url() });

// Get party by id
export const get = api(
    { expose: true, method: "GET", path: "/party/:id" },
    async ({ id }: { id: number }): Promise<Party> => {
        const party = await orm('parties').where('id', id).first();
        const contactMechs = await getPartyPrimaryContactMechs(id);
        return { ...party, contactMechs };
    }
);

// Get full party details
export const getFull = api(
    { expose: true, method: "GET", path: "/party/:id/full" },
    async ({ id }: { id: number }): Promise<Party> => {
        const party = await orm('parties').where('id', id).first();
        const contactMechs = await getAllPartyContactMechs(id);
        const roles = await getPartyRoles(id);
        const relationships = await getPartyRelationships(id);
        return { ...party, contactMechs, roles, relationships };
    }
);

// Get party roles
export const getRoles = api(
    { expose: true, method: "GET", path: "/party/:id/roles" },
    async ({ id }: { id: number }): Promise<{ roles: Role[] }> => {
        const roles = await getPartyRoles(id);
        return { roles };
    }
);

// Get party relationships
export const getRelationships = api(
    { expose: true, method: "GET", path: "/party/:id/relationships" },
    async ({ id }: { id: number }): Promise<{ from: Relationship[], to: Relationship[] }> => {
        return await getPartyRelationships(id);
    }
);

// Get all contact mechanisms
export const getContactMechs = api(
    { expose: true, method: "GET", path: "/party/:id/cms" },
    async ({ id }: { id: number }) => {
        return await getAllPartyContactMechs(id);
    }
);

// Get contact mechanisms by type
export const getContactMechsByType = api(
    { expose: true, method: "GET", path: "/party/:id/cms/:type" },
    async ({ id, type }: { id: number, type: string }): Promise<ContactMech[]> => {
        return await orm('contact_mechanisms')
            .where({ party_id: id, type })
            .select();
    }
);

// Get primary contact mechanism by type
export const getPrimaryContactMech = api(
    { expose: true, method: "GET", path: "/party/:id/cms/:type/primary" },
    async ({ id, type }: { id: number, type: string }): Promise<ContactMech> => {
        return await orm('contact_mechanisms')
            .where({ party_id: id, type, is_primary: true })
            .first();
    }
);

// Get all primary contact mechanisms
export const getPrimaryContactMechs = api(
    { expose: true, method: "GET", path: "/party/:id/cms/primary" },
    async ({ id }: { id: number }) => {
        return await getPartyPrimaryContactMechs(id);
    }
);

// Get party by name
export const getByName = api(
    { expose: true, method: "GET", path: "/party/name/:name" },
    async ({ name }: { name: string }): Promise<PartyResponse[]> => {
        const parties = await orm('parties').where('name', 'like', `%${name}%`);
        return Promise.all(parties.map(async party => ({
            ...party,
            contactMechs: await getPartyPrimaryContactMechs(party.id)
        })));
    }
);

// Helper functions
async function getPartyPrimaryContactMechs(partyId: number) {
    const cms = await orm('contact_mechanisms')
        .where({ party_id: partyId, is_primary: true })
        .select();
    
    return cms.reduce((acc, cm) => ({
        ...acc,
        [cm.type]: { id: cm.id, value: cm.value, isPrimary: cm.is_primary }
    }), {});
}

async function getAllPartyContactMechs(partyId: number) {
    const cms = await orm('contact_mechanisms')
        .where({ party_id: partyId })
        .select();
    
    return cms.reduce((acc, cm) => ({
        ...acc,
        [cm.type]: [...(acc[cm.type] || []), 
            { id: cm.id, value: cm.value, isPrimary: cm.is_primary }]
    }), {});
}

async function getPartyRoles(partyId: number) {
    return await orm('roles')
        .where('party_id', partyId)
        .select();
}

async function getPartyRelationships(partyId: number) {
    const fromRels = await orm('relationships as r')
        .join('parties as p', 'p.id', 'r.party_id_2')
        .where('r.party_id_1', partyId)
        .select('r.id', 'r.type', 'p.id as partyId', 'p.name as partyName');

    const toRels = await orm('relationships as r')
        .join('parties as p', 'p.id', 'r.party_id_1')
        .where('r.party_id_2', partyId)
        .select('r.id', 'r.type', 'p.id as partyId', 'p.name as partyName');

    return { from: fromRels, to: toRels };
}

// Add these interfaces after existing interfaces
interface PaginationParams {
    page?: number;
    limit?: number;
}

interface ListResponse {
    items: Party[];
    total: number;
    page: number;
    limit: number;
}

// Add these new routes
export const list = api(
    { expose: true, method: "GET", path: "/party/list" },
    async (params: PaginationParams): Promise<ListResponse> => {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const offset = (page - 1) * limit;

        const [items, [{count}]] = await Promise.all([
            orm('parties')
                .limit(limit)
                .offset(offset)
                .select(),
            orm('parties')
                .count()
        ]);

        return {
            items: await Promise.all(items.map(async party => ({
                ...party,
                contactMechs: await getPartyPrimaryContactMechs(party.id)
            }))),
            total: parseInt(count),
            page,
            limit
        };
    }
);

export const listByType = api(
    { expose: true, method: "GET", path: "/party/type/:type" },
    async ({ type, ...params }: { type: string } & PaginationParams): Promise<ListResponse> => {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const offset = (page - 1) * limit;

        const [items, [{count}]] = await Promise.all([
            orm('parties')
                .where('type', type)
                .limit(limit)
                .offset(offset)
                .select(),
            orm('parties')
                .where('type', type)
                .count()
        ]);

        return {
            items: await Promise.all(items.map(async party => ({
                ...party,
                contactMechs: await getPartyPrimaryContactMechs(party.id)
            }))),
            total: parseInt(count),
            page,
            limit
        };
    }
);

export const listByRoleType = api(
    { expose: true, method: "GET", path: "/party/role/:roleType" },
    async ({ roleType, ...params }: { roleType: string } & PaginationParams): Promise<ListResponse> => {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const offset = (page - 1) * limit;

        const [items, [{count}]] = await Promise.all([
            orm('parties as p')
                .join('roles as r', 'p.id', 'r.party_id')
                .where('r.type', roleType)
                .limit(limit)
                .offset(offset)
                .select('p.*')
                .distinct(),
            orm('parties as p')
                .join('roles as r', 'p.id', 'r.party_id')
                .where('r.type', roleType)
                .countDistinct('p.id as count')
        ]);

        return {
            items: await Promise.all(items.map(async party => ({
                ...party,
                contactMechs: await getPartyPrimaryContactMechs(party.id)
            }))),
            total: parseInt(count),
            page,
            limit
        };
    }
);

export const search = api(
    { expose: true, method: "GET", path: "/party/search/:pattern" },
    async ({ pattern, ...params }: { pattern: string } & PaginationParams): Promise<ListResponse> => {
        const page = params.page || 1;
        const limit = params.limit || 10;
        const offset = (page - 1) * limit;

        const [items, [{count}]] = await Promise.all([
            orm('parties')
                .where('name', 'ilike', `%${pattern}%`)
                .limit(limit)
                .offset(offset)
                .select(),
            orm('parties')
                .where('name', 'ilike', `%${pattern}%`)
                .count()
        ]);

        return {
            items: await Promise.all(items.map(async party => ({
                ...party,
                contactMechs: await getPartyPrimaryContactMechs(party.id)
            }))),
            total: parseInt(count),
            page,
            limit
        };
    }
);

export const create = api(
    { expose: true, method: "POST", path: "/party" },
    async (params: CreatePartyRequest): Promise<Party> => {
        return await orm.transaction(async trx => {
            // Create party
            const [party] = await trx('parties').insert({
                name: params.name,
                type: params.type,
                valid_from: params.validFrom,
                valid_to: params.validTo
            }).returning('*');

            // Add primary CMs if provided
            if (params.primaryContactMechs) {
                await addPrimaryContactMechs(party.id, params.primaryContactMechs, trx);
            }

            // Add roles and their CMs if provided
            if (params.roles) {
                await addRolesWithCMs(party.id, params.roles, trx);
            }

            return await getFullParty(party.id, trx);
        });
    }
);

async function addPrimaryContactMechs(partyId: number, cms: Record<string, string>, trx: any) {
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

async function addRolesWithCMs(partyId: number, roles: Role[], trx: any) {
    for (const role of roles) {
        // Add role
        const [newRole] = await trx('roles').insert({
            party_id: partyId,
            type: role.type,
            valid_from: role.validFrom,
            valid_to: role.validTo
        }).returning('*');

        // Add role CMs if any
        if (role.cmsForRole) {
            for (const cm of role.cmsForRole) {
                await trx('contact_mechanisms').insert({
                    party_id: partyId,
                    role_id: newRole.id,
                    type: cm.type,
                    value: cm.value,
                    is_primary: cm.isPrimary ?? false
                });
            }
        }
    }
}

async function getFullParty(partyId: number, trx: any): Promise<PartyResponse> {
    const party = await trx('parties').where('id', partyId).first();
    const cms = await getPartyPrimaryContactMechs(partyId, trx);
    const roles = await getPartyRolesWithCMs(partyId, trx);
    const relationships = await getPartyRelationships(partyId, trx);
    
    return {
        ...party,
        contactMechs: cms,
        roles,
        relationships,
        isActive: isCurrentlyValid(party.valid_from, party.valid_to)
    };
}


// Update basic party
export const updateParty = api(
    { expose: true, method: "PUT", path: "/party/:id" },
    async ({ id, ...params }: { id: number } & UpdatePartyRequest) => {
        const [updated] = await orm.transaction(async trx => {
            return await trx('parties')
                .where('id', id)
                .update(params)
                .returning(['id', 'type', 'name', 'valid_from', 'valid_to']);
        });
        return {
            ...updated,
            isActive: isCurrentlyValid(updated.valid_from, updated.valid_to)
        };
    }
);

// Update contact mechanism
export const updateContactMech = api(
    { expose: true, method: "PUT", path: "/party/:partyId/cms/:type/:id" },
    async ({ partyId, type, id, ...params }: 
        { partyId: number, type: string, id: number } & UpdateContactMechRequest) => {
        const [updated] = await orm.transaction(async trx => {
            return await trx('contact_mechanisms')
                .where({ id, party_id: partyId, type })
                .update(params)
                .returning(['id', 'value', 'is_primary', 'valid_from', 'valid_to']);
        });
        return {
            ...updated,
            isPrimary: updated.is_primary,
            isActive: isCurrentlyValid(updated.valid_from, updated.valid_to)
        };
    }
);

// Update role
export const updateRole = api(
    { expose: true, method: "PUT", path: "/party/:partyId/role/:id" },
    async ({ partyId, id, ...params }: 
        { partyId: number, id: number } & UpdateRoleRequest) => {
        return await orm.transaction(async trx => {
            // Update role
            const [updated] = await trx('roles')
                .where({ id, party_id: partyId })
                .update({
                    type: params.type,
                    valid_from: params.validFrom,
                    valid_to: params.validTo
                })
                .returning(['id', 'type', 'valid_from', 'valid_to']);

            // Update or add contact mechanisms if provided
            if (params.cmsForRole) {
                await trx('contact_mechanisms')
                    .where({ role_id: id })
                    .delete();
                
                for (const cm of params.cmsForRole) {
                    await trx('contact_mechanisms').insert({
                        party_id: partyId,
                        role_id: id,
                        type: cm.type,
                        value: cm.value,
                        is_primary: cm.isPrimary ?? false
                    });
                }
            }

            return {
                ...updated,
                isActive: isCurrentlyValid(updated.valid_from, updated.valid_to)
            };
        });
    }
);

// Update relationship
export const updateRelationship = api(
    { expose: true, method: "PUT", path: "/party/:partyId/relationship/:id" },
    async ({ partyId, id, ...params }: 
        { partyId: number, id: number } & UpdateRelationshipRequest) => {
        const [updated] = await orm.transaction(async trx => {
            return await trx('relationships')
                .where({ 
                    id,
                    party_id_1: partyId 
                })
                .update(params)
                .returning(['id', 'type', 'party_id_1', 'party_id_2', 
                          'valid_from', 'valid_to']);
        });
        return {
            ...updated,
            fromPartyId: updated.party_id_1,
            toPartyId: updated.party_id_2,
            isActive: isCurrentlyValid(updated.valid_from, updated.valid_to)
        };
    }
);

// Helper function to check if a record is currently valid
function isCurrentlyValid(validFrom?: Date, validTo?: Date): boolean {
    const now = new Date();
    return (!validFrom || now >= validFrom) && (!validTo || now <= validTo);
}

interface DeletedResponse {
    id: number;
    deletedAt: Date;
}

// Delete party
export const deleteParty = api(
    { expose: true, method: "DELETE", path: "/party/:id" },
    async ({ id }: { id: number }) => {
        const [deleted] = await orm.transaction(async trx => {
            return await trx('parties')
                .where('id', id)
                .update({ deleted_at: new Date() })
                .returning(['id', 'type', 'name', 'deleted_at']);
        });
        return deleted;
    }
);

// Delete contact mechanism
export const deleteContactMech = api(
    { expose: true, method: "DELETE", path: "/party/:partyId/cms/:type/:id" },
    async ({ partyId, type, id }: { partyId: number, type: string, id: number }) => {
        const [deleted] = await orm.transaction(async trx => {
            return await trx('contact_mechanisms')
                .where({ id, party_id: partyId, type })
                .update({ deleted_at: new Date() })
                .returning(['id', 'value', 'is_primary', 'deleted_at']);
        });
        return {
            ...deleted,
            isPrimary: deleted.is_primary
        };
    }
);

// Delete all contact mechanisms by type
export const deleteContactMechsByType = api(
    { expose: true, method: "DELETE", path: "/party/:partyId/cms/:type" },
    async ({ partyId, type }: { partyId: number, type: string }) => {
        const deleted = await orm.transaction(async trx => {
            return await trx('contact_mechanisms')
                .where({ party_id: partyId, type })
                .update({ deleted_at: new Date() })
                .returning(['id', 'value', 'is_primary', 'deleted_at']);
        });
        return deleted.map(cm => ({
            ...cm,
            isPrimary: cm.is_primary
        }));
    }
);

// Delete role
export const deleteRole = api(
    { expose: true, method: "DELETE", path: "/party/:partyId/role/:id" },
    async ({ partyId, id }: { partyId: number, id: number }) => {
        const [deleted] = await orm.transaction(async trx => {
            return await trx('roles')
                .where({ id, party_id: partyId })
                .update({ deleted_at: new Date() })
                .returning(['id', 'type', 'deleted_at']);
        });
        return deleted;
    }
);

// Delete all roles by type
export const deleteRolesByType = api(
    { expose: true, method: "DELETE", path: "/party/:partyId/role/:type" },
    async ({ partyId, type }: { partyId: number, type: string }) => {
        const deleted = await orm.transaction(async trx => {
            return await trx('roles')
                .where({ party_id: partyId, type })
                .update({ deleted_at: new Date() })
                .returning(['id', 'type', 'deleted_at']);
        });
        return deleted;
    }
);

// Delete relationship
export const deleteRelationship = api(
    { expose: true, method: "DELETE", path: "/party/:partyId/relationship/:id" },
    async ({ partyId, id }: { partyId: number, id: number }) => {
        const [deleted] = await orm.transaction(async trx => {
            return await trx('relationships')
                .where({ 
                    id,
                    party_id_1: partyId 
                })
                .update({ deleted_at: new Date() })
                .returning(['id', 'type', 'party_id_1', 'party_id_2', 'deleted_at']);
        });
        return {
            ...deleted,
            fromPartyId: deleted.party_id_1,
            toPartyId: deleted.party_id_2
        };
    }
);

// Base interfaces
interface BaseResponse {
    id: number;
    validFrom?: Date;
    validTo?: Date;
    isActive?: boolean;
    deletedAt?: Date;
}

interface ContactMechResponse extends BaseResponse {
    type: string;
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
    name: string;
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

// Route corrections
export const getByName = api(
    { expose: true, method: "GET", path: "/party/name/:name" },
    async ({ name }: { name: string }): Promise<PartyResponse[]> => {
        // Implementation
    }
);

export const getPrimaryCMsByType = api(
    { expose: true, method: "GET", path: "/party/:id/cms/:type/primary" },
    async ({ id, type }: { id: number, type: string }): Promise<ContactMechResponse> => {
        // Implementation
    }
);

export const getRoleCMs = api(
    { expose: true, method: "GET", path: "/party/:id/role/:roleId/cms" },
    async ({ id, roleId }: { id: number, roleId: number }): Promise<ContactMechResponse[]> => {
        // Implementation
    }
);

export const search = api(
    { expose: true, method: "GET", path: "/party/search" },
    async ({ criteria }: { criteria: string }): Promise<PartyResponse[]> => {
        // Implementation using xpath-like criteria
    }
);

// Helper function updates
async function getFullParty(partyId: number, trx: any): Promise<PartyResponse> {
    const party = await trx('parties').where('id', partyId).first();
    const cms = await getPartyPrimaryContactMechs(partyId, trx);
    const roles = await getPartyRolesWithCMs(partyId, trx);
    const relationships = await getPartyRelationships(partyId, trx);
    
    return {
        ...party,
        contactMechs: cms,
        roles,
        relationships,
        isActive: isCurrentlyValid(party.valid_from, party.valid_to)
    };
}

// Additional exports needed
export const addRoleCM = api(
    { expose: true, method: "POST", path: "/party/:id/role/:roleId/cms" },
    async ({ id, roleId, ...params }: { 
        id: number, 
        roleId: number,
        type: string,
        value: string,
        isPrimary?: boolean 
    }): Promise<ContactMechResponse> => {
        // Implementation
    }
);
*/