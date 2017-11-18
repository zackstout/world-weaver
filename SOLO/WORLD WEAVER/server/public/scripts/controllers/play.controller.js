
var x, y, h, wid;

myApp.controller('PlayController', function(UserService, WorldService, $http) {
  console.log('playController created');
  var vm = this;
  vm.world = [];

  function getWorld() {
    $http.get('/worlds').then(function (response) {
      console.log('got world!');
      vm.world = response.data;
      console.log(vm.world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  }

  getWorld();
  setTimeout(doMatter, 300);

  function doMatter() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
    var engine = Engine.create();
    var world = engine.world;
    var obstacle, cannon, cannonball, bucket;

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });


    var mouse = Mouse.create(render.canvas);
    var mc = MouseConstraint.create(engine, {
      mouse: mouse
    });
    console.log(mc);
    Events.on(mc, "mousedown", function() {
      console.log('hello sir', mouse.position.x, mouse.position.y);
      cannonball = Bodies.circle(cannon.position.x + 40*Math.cos(cannon.angle), cannon.position.y + 40*Math.sin(cannon.angle), 15, {restitution: 1, friction: 0});
      World.add(world, cannonball);
      Body.applyForce(cannonball, {x: cannon.position.x, y: cannon.position.y}, {x: 0.04*Math.cos(cannon.angle), y: 0.04*Math.sin(cannon.angle)});

    });


    // console.log(vm.world);
    var ourWorld = vm.world[0];
    cannon = Bodies.rectangle(ourWorld.start_x, ourWorld.start_y, 40, 20, {isStatic: true});
    bucket = Bodies.rectangle(ourWorld.end_x, ourWorld.end_y, 30, 30, {isStatic: true});
    // console.log(cannon, bucket);
    World.add(world, [cannon, bucket]);

    for (var i=0; i<vm.world.length; i++) {
      var wor = vm.world[i];
      if (wor.type == "rect") {
        obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true });
      } else if (wor.type == "ellipse") {
        obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
      }
      World.add(world, [obstacle]);
    }

    Engine.run(engine);
    Render.run(render);
  }

  // function setup() {
  // console.log('hi', vm.world);
  // var Engine = Matter.Engine,
  // Render = Matter.Render,
  // World = Matter.World,
  // Bodies = Matter.Bodies;
  // var engine = Engine.create();
  // var world = engine.world;
  // var obstacle;
  // var cannon;
  // var bucket;
  // var canvas = createCanvas(1000,1000);
  //
  // Engine.run(engine);
  //
  // var ourWorld = vm.world[0];
  // cannon = Bodies.rectangle(ourWorld.start_x, ourWorld.start_y, 40, 20, {isStatic: true});
  // bucket = Bodies.rectangle(ourWorld.end_x, ourWorld.end_y, 30, 30, {isStatic: true});
  // // console.log(cannon, bucket);
  // World.add(world, [cannon, bucket]);
  //
  // for (var i=0; i<vm.world.length; i++) {
  //   var wor = vm.world[i];
  //   if (wor.type == "rect") {
  //     obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true });
  //   } else if (wor.type == "ellipse") {
  //     obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
  //   }
  //   World.add(world, [obstacle]);
  // }
  //
  // }
  //
  // function draw() {
  //   background(160);
  //   rect(100, 100, 200, 200);
  //   // World.add(world, obstacle);
  // // rect(box1.position.x,box1.position.y, 20, 20);
  // // rect(obstacle.position.x, obstacle.position.y, 100, 100);
  //
  // }

});




//
// var Engine = Matter.Engine;
// var World = Matter.World;
// var Bodies = Matter.Bodies;
// var engine;
// console.log(x, y, w, h);
//
// var world;
// var box1 = Bodies.rectangle(200, 100, 20, 20);
// var obstacle = Bodies.rectangle(x, y, h, w, {isStatic: true});
//
// //
// function setup() {
// console.log('hi');
// var canvas = createCanvas(1000,1000);
// engine = Engine.create();
//
// world = engine.world;
// Engine.run(engine);
//
// World.add(world, [box1]);
// console.log(obstacle);
//
// }
//
// function draw() {
//   background(160);
//   World.add(world, obstacle);
// rect(box1.position.x,box1.position.y, 20, 20);
// rect(obstacle.position.x, obstacle.position.y, 100, 100);
//
// }
