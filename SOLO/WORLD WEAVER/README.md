
# World Weaver

A full-stack application that gives users the ability to design, edit and post puzzles to be solved by other users. The puzzles take the form of a simple game involving a rotatable cannon, a target, a set of obstacles, and an optional pair of portals. Users can save their puzzles (or "worlds") to continue editing later, and can alter or delete obstacles and reposition all objects when editing. Users can favorite worlds, track their fastest time to complete a world, and see the top three best times in which a world has been completed, as well as how many attempts and completions that world has.

## Built With

- AngularJS
- PostgreSQL
- Node.js
- Express
- Angular Material
- Matter.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

### Installing

To install node packages, run:
```
npm install
```

To set up the database, run the following query commands:

```sql
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
"end_y" INT);

CREATE TABLE "worlds_saved" (
"id" serial PRIMARY KEY,
"maker_id" INT REFERENCES "users",
"start_x" INT,
"start_y" INT,
"end_x" INT,
"end_y" INT);

CREATE TABLE "obstacles" (
"id" serial PRIMARY KEY,
"world_id" INT REFERENCES "worlds",
"x" INT,
"y" INT,
"h" INT,
"w" INT,
"type" varchar(20));

CREATE TABLE "obstacles_saved" (
"id" serial PRIMARY KEY,
"world_id" INT REFERENCES "worlds_saved",
"x" INT,
"y" INT,
"h" INT,
"w" INT,
"type" varchar(20));

CREATE TABLE "portals" (
	"id" serial PRIMARY key,
	"world_id" INT REFERENCES "worlds",
	"y1" INT,
	"y2" INT);

CREATE TABLE "portals_saved" (
"id" serial PRIMARY key,
"world_id" INT REFERENCES "worlds_saved",
"y1" INT,
"y2" INT);

CREATE TABLE "favorites" (
"id" serial PRIMARY KEY,
"world_id" INT REFERENCES "worlds",
"user_id" INT REFERENCES "users");

CREATE TABLE "plays" (
"id" serial PRIMARY KEY,
"world_id" INT REFERENCES "worlds",
"user_id" INT REFERENCES "users",
"time" INT);


```

## Screen Shot





## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Zack Stout
