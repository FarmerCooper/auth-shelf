-- Create dabase called 'auth_shelf'
CREATE DATABASE "auth_shelf";

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);


-- Add dummy data by registering for a user, examples below

-- INSERT INTO "user" (
--     "username", "password"
-- )
-- VALUES (
--     'Timmy Turner',
--     'OddParents'
-- ), (
--     'Magic Mike',
--     'Muscles'    
-- );


-- dummy data for items

INSERT INTO "item" (
    "description",
    "image_url",
    "user_id"
)
VALUES (
    'Mac n Cheese',
    'https://imgur.com/gallery/RK8Vi',
    '1'
), (
    'Big Mac',
    'https://imgur.com/gallery/CnJ0r',
    '1'
), (
    'Maple Pie',
    'https://i.imgur.com/XKQTiT7.jpg',
    '2'
);

