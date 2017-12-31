
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "worlds" (
  "id" serial PRIMARY KEY,
  "maker_id" INT REFERENCES "users",
  "start_x" INT,
  "start_y" INT,
  "end_x" INT,
  "end_y" INT
);

CREATE TABLE "worlds_saved" (
  "id" serial PRIMARY KEY,
  "maker_id" INT REFERENCES "users",
  "start_x" INT,
  "start_y" INT,
  "end_x" INT,
  "end_y" INT
);

CREATE TABLE "obstacles" (
  "id" serial PRIMARY KEY,
  "world_id" INT REFERENCES "worlds",
  "x" INT,
  "y" INT,
  "h" INT,
  "w" INT,
  "type" varchar(20)
);

CREATE TABLE "obstacles_saved" (
  "id" serial PRIMARY KEY,
  "world_id" INT REFERENCES "worlds_saved",
  "x" INT,
  "y" INT,
  "h" INT,
  "w" INT,
  "type" varchar(20)
);

CREATE TABLE "portals" (
  "id" serial PRIMARY KEY,
  "world_id" INT REFERENCES "worlds",
  "y1" INT,
  "y2" INT
);

CREATE TABLE "portals_saved" (
  "id" serial PRIMARY key,
  "world_id" INT REFERENCES "worlds_saved",
  "y1" INT,
  "y2" INT
);

CREATE TABLE "favorites" (
  "id" serial PRIMARY KEY,
  "world_id" INT REFERENCES "worlds",
  "user_id" INT REFERENCES "users"
);

CREATE TABLE "plays" (
  "id" serial PRIMARY KEY,
  "world_id" INT REFERENCES "worlds",
  "user_id" INT REFERENCES "users",
  "time" INT
);
