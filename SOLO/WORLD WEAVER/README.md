
# World Weaver

A full-stack application that gives users the ability to design, edit and post puzzles to be solved by other users. The puzzles take the form of a simple game involving a rotatable cannon, a target, a set of obstacles, and an optional pair of portals. Users can save their puzzles (or "worlds") to continue editing later, and can alter or delete obstacles and reposition all objects when editing. Users can favorite worlds, track their fastest time to complete a world, and see the top three best times in which a world has been completed, as well as how many attempts and completions that world has.

## Built With

- AngularJS
- PostgreSQL
- Node.js
- Express.js
- Angular Material
- Matter.js

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

To install node packages, run:
```
npm install
```

To set up the database, run the query commands found in the ```dbsetup.sql``` file.

Database visualization:

![footprint_database2](https://user-images.githubusercontent.com/29472568/33974430-f21984bc-e04d-11e7-95da-2b38f5703602.png)

## Screen Shot

The editing screen:

![ww_preview1](https://user-images.githubusercontent.com/29472568/33973840-c03274f2-e04a-11e7-9568-e96ed5b006dd.png)

![ww_preview2](https://user-images.githubusercontent.com/29472568/33973844-c95d3f9e-e04a-11e7-995d-e0fb8bdb71ad.png)

The gameplay screen:

![ww_preview4](https://user-images.githubusercontent.com/29472568/33973849-d12467d4-e04a-11e7-8beb-5a21c91b322e.png)

The selection screen:

![solo_preview](https://user-images.githubusercontent.com/29472568/33973779-651ef93c-e04a-11e7-977b-b7387f88afe2.png)


## Documentation

Link to a read-only version of my scope: https://docs.google.com/document/d/1_7BCfpZBIYsvJ4YVFDtsLRTdOGjQnYGGFSxE2ExGnUI/edit?usp=sharing


### Completed Features

- [x] Users can play worlds created by other users by rotating the cannon (with the 's' and 'f' keys) and firing cannonballs (on mouse click).
- [x] Cannon will fire with variable force that is tracked by an oscillating force-meter on the side of the world.
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
- [x] Users can preview each world by means of a canvas that contains the world's obstacles and portals.

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

## Acknowledgments

Thanks to my instructors at Prime for supplying the Passport architecture for this project!
