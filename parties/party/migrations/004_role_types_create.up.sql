CREATE TABLE allowed_roles (
    role_name VARCHAR(255) NOT NULL PRIMARY KEY,
    description TEXT NOT NULL,
    for_party_types TEXT[] NOT NULL CHECK (for_party_types <@ ARRAY['PERSON', 'ORG', 'SYSTEM']),
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

INSERT INTO allowed_roles (role_name, for_party_types, description) VALUES 
('Client', ARRAY['PERSON','ORG'], 'Party has an active, paying relationship with TFS'),
('Author', ARRAY['PERSON'], 'Party is an author'),
('Audiobook Referral Partner', ARRAY['ORG'], 'Party actively refers audiobook prospects'),
('Audiobook Referral Partner Contact', ARRAY['PERSON'], 'Party is a contact for an Audiobook Referral Partner'),
('Audiobook Partner', ARRAY['ORG','PERSON'], 'Party and TFS have a formal partnership agreement where TFS provides audiobook production services for party'),
('Audiobook Partner PM', ARRAY['PERSON'], 'Party manages projects for white label partners'),
('Podcast Referral Partner', ARRAY['ORG'], 'Party actively refers podcast prospects'),
('Podcast Referral Partner Contact', ARRAY['PERSON'], 'Party is a contact for an Podcast Referral Partner'),
('Podcast Partner', ARRAY['ORG'], 'TFS supplies podcast services for party'),
('Staff', ARRAY['PERSON'], '');

ALTER TABLE roles
ALTER COLUMN role_type TYPE VARCHAR(255),
ADD CONSTRAINT fk_role_type FOREIGN KEY (role_type) REFERENCES allowed_roles(role_name);
