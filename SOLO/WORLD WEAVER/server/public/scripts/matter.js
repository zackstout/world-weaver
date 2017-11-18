
console.log('in matter');
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var engine;

var world;
var box1 = Bodies.rectangle(200, 100, 20, 20);


function setup() {
var canvas = createCanvas(1000,1000);
engine = Engine.create();
//wow, super weird, this seems to make the cannonballs have less force....which is odd:
// engine.timing.timeScale = 0.5;

world = engine.world;
Engine.run(engine);

//flyers:
// for (var l=0; l<grounds.length; l++) {
//   World.add(world, grounds[l]);
// }
World.add(world, box1);

}

function draw() {
rect(box1.position.x,box1.position.y, 20, 20);

}
