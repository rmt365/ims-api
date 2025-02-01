DROP TABLE role_contact_mechanisms;

ALTER TABLE contact_mechanisms
ALTER COLUMN party_id DROP NOT NULL;

ALTER TABLE roles
ALTER COLUMN party_id DROP NOT NULL;

ALTER TABLE relationships
ALTER COLUMN from_party_id DROP NOT NULL,
ALTER COLUMN to_party_id DROP NOT NULL;

ALTER TABLE payment_methods
ALTER COLUMN party_id DROP NOT NULL;