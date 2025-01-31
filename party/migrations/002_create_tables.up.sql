ALTER TABLE parties 
ADD COLUMN salutation TEXT,
ADD COLUMN first_name TEXT,
ADD COLUMN middle_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN legal_name TEXT,
ADD COLUMN operating_name TEXT,
ADD COLUMN display_name_format TEXT;

-- Update existing data (assuming you want to preserve existing names in first_name)
UPDATE parties 
SET first_name =  SPLIT_PART(name, ' ', 1),
    last_name =  SPLIT_PART(name, ' ', 2),
    display_name_format = 'FIRST_LAST';

alter table parties
ADD CONSTRAINT valid_party_types 
    CHECK (type IN ('PERSON', 'ORG', 'SYSTEM')),
ADD CONSTRAINT party_name_rules CHECK (
    (type = 'PERSON' AND last_name IS NOT NULL) OR
    (type = 'ORG' AND (legal_name IS NOT NULL OR operating_name IS NOT NULL)) OR
    (type = 'SYSTEM' AND operating_name IS NOT NULL) OR
    (type NOT IN ('PERSON', 'ORG', 'SYSTEM'))
),
ADD CONSTRAINT valid_display_name_formats CHECK (
    (type = 'ORG' AND display_name_format IN ('LEGAL_ONLY', 'OPERATING_ONLY', 'LEGAL_OA_OPERATING'))
    OR
    (type = 'PERSON' AND display_name_format IN ('FIRST_LAST', 'SALUTATION_FIRST_LAST', 'FIRST_MIDDLE_LAST', 'FULL'))
    OR
    (type = 'SYSTEM' AND display_name_format = 'OPERATING_ONLY')
);

-- Consider also making display_name_format required
ALTER TABLE parties
ALTER COLUMN display_name_format SET NOT NULL;

-- Remove the original name column
ALTER TABLE parties
DROP COLUMN name;

/*
-- Rollback SQL
ALTER TABLE parties
ADD COLUMN name TEXT;

UPDATE parties
SET name = CONCAT_WS(' ', 
    COALESCE(salutation, ''),
    first_name,
    COALESCE(middle_name, ''),
    last_name
);

ALTER TABLE parties
ALTER COLUMN name SET NOT NULL,
DROP COLUMN salutation,
DROP COLUMN first_name,
DROP COLUMN middle_name,
DROP COLUMN last_name;
DROP CONSTRAINT party_name_rules,
DROP CONSTRAINT valid_party_types,
DROP COLUMN legal_name,
DROP COLUMN operating_name,
DROP COLUMN display_name_format;

*/

CREATE TABLE contact_mechanisms (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    party_id INTEGER REFERENCES parties(id),
    type TEXT NOT NULL,
    value TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(party_id, type, value, valid_from, deleted_at)
);

CREATE TABLE roles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    party_id INTEGER REFERENCES parties(id),
    role_type TEXT NOT NULL,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(party_id, role_type, valid_from, deleted_at)
);

CREATE TABLE relationships (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    from_party_id INTEGER REFERENCES parties(id),
    to_party_id INTEGER REFERENCES parties(id),
    reln_type TEXT NOT NULL,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(from_party_id, to_party_id, reln_type, valid_from, deleted_at)
);

CREATE TABLE payment_methods (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    party_id INTEGER REFERENCES parties(id),
    payment_type TEXT NOT NULL,
    payment_details JSONB NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(party_id, payment_type, deleted_at)
);
