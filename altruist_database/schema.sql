DROP SCHEMA IF EXISTS db CASCADE;
CREATE SCHEMA db;

CREATE TABLE db.users(
    user_id BIGSERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_email TEXT UNIQUE NOT NULL,
    user_country TEXT,
    user_city TEXT,
    user_zip TEXT,
    user_phone_number TEXT
);

CREATE TABLE db.favors(
    favor_id BIGSERIAL PRIMARY KEY,
    favor_name TEXT NOT NULL,
    favor_description TEXT NOT NULL,
    favor_date TEXT NOT NULL,
    expiry_date TEXT,
    favor_difficulty TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES db.users(user_id)
);

CREATE TABLE db.comments(
    comment_id BIGSERIAL PRIMARY KEY,
    comment_date INTEGER NOT NULL,
    comment_body TEXT NOT NULL,
    user_id INTEGER,
    favor_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES db.users(user_id),
    FOREIGN KEY(favor_id) REFERENCES db.favors(favor_id)
);