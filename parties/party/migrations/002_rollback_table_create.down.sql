-- Rollback for parties table changes
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
DROP COLUMN last_name,
DROP CONSTRAINT party_name_rules,
DROP CONSTRAINT valid_party_types,
DROP COLUMN legal_name,
DROP COLUMN operating_name,
DROP COLUMN display_name_format,
DROP CONSTRAINT valid_display_name_formats;

-- Rollback for contact_mechanisms table
DROP TABLE contact_mechanisms;

-- Rollback for roles table
DROP TABLE roles;

-- Rollback for relationships table
DROP TABLE relationships;

-- Rollback for payment_methods table
DROP TABLE payment_methods;