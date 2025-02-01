

CREATE TABLE role_contact_mechanisms (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    contact_mechanism_id INTEGER NOT NULL REFERENCES contact_mechanisms(id),
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(role_id, contact_mechanism_id, valid_from, deleted_at)
);

ALTER TABLE contact_mechanisms
ALTER COLUMN party_id SET NOT NULL;

ALTER TABLE roles
ALTER COLUMN party_id SET NOT NULL;

ALTER TABLE relationships
ALTER COLUMN from_party_id SET NOT NULL,
ALTER COLUMN to_party_id SET NOT NULL;

ALTER TABLE payment_methods
ALTER COLUMN party_id SET NOT NULL;

