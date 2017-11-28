# Name of Project

One Paragraph of project description goes here. Link to the live version of the app if it's hosted on Heroku.

## Built With

List technologies and frameworks here




## GOALS:

### HIGHEST PRIORITY
[x] fix editing interface: the obstacles you see yourself drawing must be the same as the obstacles that get added to the world

ok so it thinks the center is where the upper left of canvas was: e.g. (500, 100)...
then it flips width and height. So you intended it to start with left upper at (500, 100), but it shows up as having its center there. The math here is easy.

### HIGH PRIORITY
[x] add completions etc to FAVES and MYWORLDS (and default to 0)
- look into coloring things individually with Matter.Render
- EDIT should keep track of whether user came from MY WORLDS (vs saved worlds), because in that case should be a post rather than a put route, i think (?????)
[x] Should be two buttons in EDIT: SAVE and POST (which takes to Titling modal)
[x] to start we could just do an ng-show on the NEW OBSTACLE thing rather than a modal, to avoid the new-controller problem that everyone seems to be having
[x] finish drawing onto all the canvases stuff, for FAVES and MYWORLDS, and add OBSTACLES, etc.... (angles will be slightly tricky, will need matrices??)
- add two kinds of simulation button: with cannonballs, or with many random balls
[x] add ORDERBY to mYWORLDS AND FAVS so that they show up in same order always, as with all worlds



### LOW PRIORITY
- Make cards clickable so you can blow them up to like double size and center in screen
[x] finesse timing to tenth of a second
- get MY best time for FAVES
- figure a better way to freeze the timer on completion
- figure out why Views aren't saving the data, like where you've pulled a slider to
- let a user delete their own levels: ASK HOLLY how she did this in queries (nested??)
- figure out user permissions for the first five levels, look into image overlays (of a lock!)

- BUG: when you search for a second thing, the canvases won't show up anymore! (perhaps this is a disadvantage of the illusory simplicity of | filter .... )
- BUG: what's up with force bar bug??
- BUG: figure out why things break on page refresh sometimes


- one way of introducing puzzles (without portals) would be "have to do x y number of times" or something

- bootstrap floppy disk glyph icon is nice
- the "screenshot" icon look sa bit like a bullseye, like we hit the target? (could give info on mouseover)
- maybe "flash" icon for attempts...?

- oh wow can you do sliders with just input type="range"?

- oh no do we need p5 for mousedrag? that cannot be!

- ah, clearly the way i'm doing zero-gravity is the way to do zones of gravity: just partition up into sections and apply  a different gravity based on what seciton they're in....that would actually be easier than what i'm trying to do now. Ok, onto attempt number 3.

- a couple n00b mistakes with Matter: we were increasing the force with each setInterval iteration, and we were also inserting a new force (in the earlier attempt) with each iteration, instead of just at the initiation (i.e. mouseclick)




### STRETCH:
- implement MAGNETS
- ZONES OF GRAVITY (spent a bit of time here -- hard to get Matter inserting into specific canvases, but easy to stack them on each other to simulate zones...could maybe integrate them as a Composite??)
- FLYERS (for real, no bugs)
- SUPER-BOUNCE
- STICKINESS
- FIX PORTALS

### CORE:
- Build a few levels

- Editing interface.......yeah: on-click edit that shape.

- Styling (cards?)

- Organize code (routers, services,....etc.)





## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

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

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
