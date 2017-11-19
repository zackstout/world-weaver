
myApp.controller('PlayController', function(UserService, WorldService, $http) {
  console.log('playController created');
  var vm = this;
  vm.world = [];
  vm.newWorld = {
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
    obstacles: []
  };
  vm.newObstacle = {
    x: 0,
    y: 0,
    h: 0,
    w: 0,
    type: 'rect'
  };

  vm.showWorld = function() {
    console.log('clickin new world');
    doMatterStart();
  };

  vm.addWorld = function(world) {
    $http.post('/worlds', world).then(function (response) {
      console.log('making world!', world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  vm.addObstacle = function(obstacle) {
    console.log(obstacle);
    vm.newWorld.obstacles.push(obstacle);
    //reset object to avoid over-data-binding:
    doMatterStart();
    vm.newObstacle = {
      x: 0,
      y: 0,
      h: 0,
      w: 0,
      type: 'rect'
    };
  };

  //get data necessary to construct the world from the DB:
  vm.getWorld = function() {
    $http.get('/worlds').then(function (response) {
      console.log('got world!');
      vm.world = response.data;
      console.log(vm.world);
      //call doMatter here; shouldn't need setTimeout if you do it like this:
      doMatter();
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  // getWorld();
  //ensure we get our data before trying to populate the world:
  // setTimeout(doMatter, 200);




  function doMatterStart() {
    console.log(vm.newWorld.obstacles);
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
    var obstacle, cannon, cannonball, bucket, x=0;

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });

    //rotate the cannon:
    //but we'll need to set a specific key if we want to listen for any *other* key changes:
    window.onkeydown = function(e) {
      x-=0.14;
      Body.setAngle(cannon, x);
    };

    //listen for mouse-clicks, fire cannon:
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

    //listen for collisions:
    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; i++) {
        var pair = pairs[i];
        if (pair.bodyA === bucket) {
          console.log('collision dog <3');
          // world.gravity.y = -world.gravity.y;
        }
        else if (pair.bodyB === bucket) {
          console.log('whatup');
          // world.gravity.y = -world.gravity.y;
        }
      }
    });

    //add cannon and bucket:
    // console.log(vm.world);
    var ourWorld = vm.newWorld;
    cannon = Bodies.rectangle(ourWorld.start_x, ourWorld.start_y, 40, 20, {isStatic: true});
    bucket = Bodies.rectangle(ourWorld.end_x, ourWorld.end_y, 30, 30, {isStatic: true});
    // console.log(cannon, bucket);
    World.add(world, [cannon, bucket]);

    //add force bar:
    var bar = Bodies.rectangle(780, 100, 40, 150, {isStatic: true, isSensor: true});
    World.add(world, bar);

    //add obstacles:
    for (var i=0; i<vm.newWorld.obstacles.length; i++) {
      var wor = vm.newWorld.obstacles[i];
      if (wor.type == "rect") {
        obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true });
      } else if (wor.type == "circle") {
        obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
      }
      World.add(world, [obstacle]);
    }

    Engine.run(engine);
    Render.run(render);
  } //end doMatterStart






  function doMatter() {
    console.log(document.body);
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
    var obstacle, cannon, cannonball, bucket, bar, heat, t=0, x=0;

    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });

    //rotate the cannon:
    window.onkeydown = function(e) {
      x -= 0.14;
      Body.setAngle(cannon, x);
    };

    //listen for mouse-clicks, fire cannon:
    var mouse = Mouse.create(render.canvas);
    var mc = MouseConstraint.create(engine, {
      mouse: mouse
    });
    console.log(mc);

    Events.on(mc, "mousedown", function() {
      console.log('hello sir', mouse.position.x, mouse.position.y);
      cannonball = Bodies.circle(cannon.position.x + 40*Math.cos(cannon.angle), cannon.position.y + 40*Math.sin(cannon.angle), 15, {restitution: 1, friction: 0});
      World.add(world, cannonball);
      // Body.applyForce(cannonball, {x: cannon.position.x, y: cannon.position.y}, {x: 0.04*Math.cos(cannon.angle), y: 0.04*Math.sin(cannon.angle)});
      Body.applyForce(cannonball, {x: cannon.position.x, y: cannon.position.y}, {x: 0.04*Math.cos(cannon.angle)*(1+Math.sin(t)), y: 0.04*Math.sin(cannon.angle)*(1+Math.sin(t))});

    });

    //listen for collisions:
    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; i++) {
        var pair = pairs[i];
        if (pair.bodyA === bucket) {
          console.log('collision dog <3');
          // world.gravity.y = -world.gravity.y;
        }
        else if (pair.bodyB === bucket) {
          console.log('whatup');
          // world.gravity.y = -world.gravity.y;
        }

        //attempting portals:
        else if (pair.bodyA === portal1) {
          console.log(pair.bodyB);
          Body.setPosition(pair.bodyB, {x: portal2.position.x, y: portal2.position.y});
        } else if (pair.bodyB === portal1) {
          console.log(pair.bodyA);
          Body.setPosition(pair.bodyA, {x: portal2.position.x, y: portal2.position.y});
        }
      }
    });

    //add cannon and bucket:
    // console.log(vm.world);
    var ourWorld = vm.world[0];
    cannon = Bodies.rectangle(ourWorld.start_x, ourWorld.start_y, 40, 20, {isStatic: true});
    bucket = Bodies.rectangle(ourWorld.end_x, ourWorld.end_y, 30, 30, {isStatic: true});
    // console.log(cannon, bucket);
    World.add(world, [cannon, bucket]);

    //add force level or "heat" bar:
    bar = Bodies.rectangle(780, 100, 40, 150, {isStatic: true, isSensor: true});
    World.add(world, bar);
    heat = Bodies.rectangle(780, t, 40, 19, {isStatic: true});
    World.add(world, heat);

    //ahhhh of course, just manually set the position!
    function moveHeat() {
      Body.setPosition(heat, {x: 780, y: 100 + 64*Math.sin(t)});
      t += 0.1;
    }

    setInterval(moveHeat, 100);


    //attempting portals:
    var portal1 = Bodies.circle(780, 200, 15, { isStatic: true, isSensor: true });
    var portal2 = Bodies.circle(20, 300, 15, { isStatic: true, isSensor: true });
    World.add(world, [portal1, portal2]);






    //add obstacles:
    for (var i=0; i<vm.world.length; i++) {
      var wor = vm.world[i];
      if (wor.type == "rect") {
        obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true });
      } else if (wor.type == "ellipse") {
        obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
      }
      World.add(world, [obstacle]);
    }

    //for a spinner:
    // var z = 0;
    // function rotateG2() {
    // z += 0.04;
    // Body.setAngle(bucket, z);
    //
    // }
    // setInterval(rotateG2, 100);

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
