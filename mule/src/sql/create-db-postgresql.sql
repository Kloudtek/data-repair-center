CREATE TABLE data_repair_queue
(
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    bid VARCHAR(255),
    mime_type VARCHAR(255),
    data_type VARCHAR(255),
    origin VARCHAR(255),
    origin_id VARCHAR(255),
    retry INTEGER,
    timestamp TIMESTAMP NOT NULL,
    cid VARCHAR(255),
    data BYTEA NOT NULL,
    metadata JSON
);