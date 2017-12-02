
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
	"id" serial PRIMARY key,
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


```

## Screen Shot





## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

- [x] Users can play worlds created by other users by rotating the cannon (with the 's' and 'f' keys) and firing cannonballs (on mouse click).
- [x] On level completion, user is taken back to their starting point (either 'All Worlds', 'My Worlds', or 'My Favorites'), their time is saved, and the world's completion count is incremented.
- [x] Users can build new worlds from scratch by positioning the cannon, the target/bucket, and adding new obstacles and adjusting their dimensions and angle.
- [x] Users can save their world mid-edit to return to later, or post it immediately to the database to be played by other users.
- [x] Portals can be added to the world (along the two vertical borders of the world); a ball entering one will exit out of the other with unchanged velocity.
- [x] Users can alter their saved worlds by adding new obstacles, adjusting the positions of the cannon, target, and portals.
- [x] Users can also edit or delete existing obstacles by clicking on them and then adjusting their properties.
- [x] Users can favorite (bookmark) worlds, adding the world to that user's list of favorites and incrementing the world's favorite count.
- [x] Users can view the shortest three times in which a world has been completed, as well as their own personal best time for completing their favorite worlds.
- [x] Users can delete worlds they have created.
- [x] Users are returned to the scroll-spot of the world they played when coming back to the 'All worlds' view from the 'Playing' view.

### Next Steps

- [ ] Give users the ability to simulate their worlds before posting them, possibly by generating a stream of small balls on mouse drag.
- [ ] Add a tutorial (a handful of levels) that a user must complete before gaining access to world-weaving and world-playing functionality.
- [ ] Complete portal functionality, i.e. give user the option to place their portals on any two borders, not just the two vertical borders.
- [ ] Give users control over the gravity of their worlds; possibly implement zones of gravity, or planetary orbits.
- [ ] Let users build curved walls (in particular, elliptical or parabolic walls).
- [ ] Let users add obstacles that fly in predetermined paths across the world, and control the frequency with which they appear.
- [ ] Let users add oscillating obstacles to their worlds.
- [ ] Give users the option to make the target/bucket oscillate or move along some path.
- [ ] Implement magnets (treating cannonballs as electrons).

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Zack Stout
