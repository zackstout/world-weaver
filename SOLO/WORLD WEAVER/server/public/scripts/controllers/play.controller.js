
myApp.controller('PlayController', function(UserService, WorldService, $http, $interval, $mdDialog) {
  console.log('playController created');
  var vm = this;

  vm.world = [];
  // vm.userObject = {};
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
    h: 10,
    w: 10,
    type: 'rect'
  };

  vm.showObst = false;

  vm.showObstacle = function() {
    vm.showObst = !vm.showObst;
  };

  var canvas = document.getElementById('hi');
  console.log(canvas);

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0,0,800,600);


  function changeCannon() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0,0,800,600);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(vm.newWorld.start_x, vm.newWorld.start_y, 40, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(vm.newWorld.end_x, vm.newWorld.end_y, 30, 30);
    // console.log('before showobst');
    if (vm.showObst) {
      // console.log('in showobst');
      ctx.fillStyle = 'red';
      var x = vm.newObstacle.x, y = vm.newObstacle.y, w = vm.newObstacle.w, h = vm.newObstacle.h;
      ctx.fillRect(x - w/2, y - h/2, w, h);
      // ctx.fillRect(vm.newObstacle.x, vm.newObstacle.y, 30, 30);

    }

    // console.log(vm.newWorld.obstacles);
    for (var i=0; i<vm.newWorld.obstacles.length; i++) {
      ctx.fillStyle = 'pink';
      var x1 = vm.newWorld.obstacles[i].x;
      var y1 = vm.newWorld.obstacles[i].y;
      var h1 = vm.newWorld.obstacles[i].h;
      var w1 = vm.newWorld.obstacles[i].w;

      ctx.fillRect(x1 - w1/2, y1 - h1/2, w1, h1);
    }

  }

  // function changeObstacle() {
  //   ctx.fillStyle = 'lightblue';
  // }
  //
  // function changeBucket() {
  //   // ctx.fillStyle = 'lightblue';
  //   // ctx.fillRect(0,0,800,600);
  //   ctx.fillStyle = 'green';
  //   ctx.fillRect(vm.newWorld.end_x, vm.newWorld.end_y, 30, 30);
  //
  // }

  function resetCanvas() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0,0,800,600);
  }

  setInterval(changeCannon, 20);
  // setInterval(changeBucket, 25);
  // setInterval(resetCanvas, 20);


  vm.status = '';

  vm.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
    .title('Has your world a name?')
    // .textContent('Bowser is a common name.')
    .placeholder('King\'s Keep')
    .ariaLabel('Dog name')
    // .initialValue('Buddy')
    .targetEvent(ev)
    // .required(true)
    .ok('Post World!')
    .cancel('Untitled');

    $mdDialog.show(confirm).then(function(result) {
      vm.status = 'You decided to name your dog ' + result + '.';
      // console.log(vm.newWorld);
      vm.newWorld.title = result;
      UserService.addWorld(vm.newWorld);
    }, function() {
      vm.status = 'You didn\'t name your dog.';
    });
  };

  //so strange....for now i'm just going to move the request into the service:
  //could prob also solve this with promises like we did with the GET routes, connecting the service to the Info Controller;
  vm.userObject = UserService.userObject;
  // UserService.getuser();
  // console.log(UserService.userObject);
  // console.log(vm.userObject);

  //Kris's suggestion:
  // if userObject isn't there
  // service.getuser
  // then do the thing

  // vm.realvassin = '';
  // vm.yes = true;
  //
  vm.capture = function() {
    var vassin = document.getElementsByTagName('canvas');
    var realvassin = vassin[0];
    // vm.realvassin = realvassin;
    // var t = realvassin.getContext('2d');
    console.log('capturing', vassin, realvassin);
    window.open('', realvassin.toDataURL());


  };
  //
  // vm.capture2 = function() {
  //
  // };
  //
  // vm.addTitle = function(ev) {
  //   var confirm = $mdDialog.prompt()
  //     .title('What would you name your dog?')
  //     .textContent('Bowser is a common name.')
  //     .placeholder('Dog name')
  //     .ariaLabel('Dog name')
  //     .initialValue('Buddy')
  //     .targetEvent(ev)
  //     .required(true)
  //     .ok('Okay!')
  //     .cancel('I\'m a cat person');
  //
  //   $mdDialog.show(confirm).then(function(result) {
  //     vm.status = 'You decided to name your dog ' + result + '.';
  //     // world.title = result;
  //     // console.log(vm.newWorld);
  //     // UserService.addWorld(world);
  //   }, function() {
  //     vm.status = 'You didn\'t name your dog.';
  //   });
  // };

  vm.showWorld = function() {
    console.log('clickin new world');
    doMatterStart();
  };

  vm.addWorld = function(world) {
    UserService.addWorld(world);
  };

  vm.saveWorld = function(world) {
    UserService.saveWorld(world);
  };

  vm.addObstacle = function(obstacle) {
    console.log(obstacle);
    vm.newWorld.obstacles.push(obstacle);
    vm.showObst = false;

    //comment this out while working on interface:
    // doMatterStart();

    //reset object to avoid over-data-binding:

    vm.newObstacle = {
      x: 0,
      y: 0,
      h: 10,
      w: 10,
      type: 'rect'
    };
  };

  //get data necessary to construct the world from the DB:
  //wait when are we calling this?? Oh on Get It button click
  vm.getWorld = function() {
    $http.get('/worlds').then(function (response) {
      console.log('got world!');
      vm.world = response.data;
      console.log(vm.world);
      //call doMatter here; shouldn't need setTimeout if you do it like this:
      doMatter();

      //sadly this does not seem to be working:
      // var myCanvas = document.getElementsByTagName('canvas');
      // var ctx = myCanvas[0].getContext("2d");
      // console.log(ctx);
      // function circle(a, b, x, r) {
      //   ctx.beginPath();
      //   for (var i = 0; i < x; i++) {
      //     ctx.moveTo(r*a*Math.cos(i*2*Math.PI/x), r*b*Math.sin(i*2*Math.PI/x));
      //     ctx.lineTo(r*a*Math.cos((i+1)*2*Math.PI/x), r*b*Math.sin((i+1)*2*Math.PI/x));
      //     ctx.stroke();
      //   }
      // }

      //the perfect pentagon, lol looks weird if you misalign a and b:
      //ahhh the pesky translate:
      // ctx.translate(500, 500);
      // circle(1, 1, 5, 250);
      // ctx.translate(-500,-500);
      // grid(10,1000);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  //   function grid(x, s) {
  //   for (var i = 0; i <= x; i++) {
  //     ctx.moveTo(i*s/x, 0);
  //     ctx.lineTo(i*s/x, s);
  //     ctx.stroke();
  //   }
  //   for (var j = 0; j <=x; j++) {
  //     ctx.moveTo(0, j*s/x);
  //     ctx.lineTo(s, j*s/x);
  //     ctx.stroke();
  //   }
  // }

  // getWorld();
  //ensure we get our data before trying to populate the world:
  // setTimeout(doMatter, 200);



  //for editing functionality:
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
        //
        // else if (pair.bodyA === omega) {
        //   console.log('OMEGA <3', pair.bodyB);
        //
        //   // world.gravity.y = -world.gravity.y;
        // }
        // else if (pair.bodyB === omega) {
        //   console.log('OMEGA', pair.bodyA);
        //   // world.gravity.y = -world.gravity.y;
        // }
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








//wait when is this used?

  //for getting worlds from DB:
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
    //can we pass in arguments here??:
    var engine = Engine.create();
    var world = engine.world;
    var obstacle, cannon, cannonball, bucket, bar, heat, portal1, portal2, flier, t=0, x=0, offset=0;

    //odd that data-binding is failing us here -- just needed $interval instead of setInterval:
    var now = 0;
    vm.now = 0;

    function tick() {
      vm.now += 1;
      now += 1;
      // console.log(vm.now);
    }
    //will have to figure out how to cancel the clock on goal-achievement:
    $interval(tick, 1000);

    // create a renderer
    //can we affect how large it is, where it is, here?
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
        // console.log(pair);
        if (pair.bodyA === bucket) {
          console.log('collision dog <3');
          world.gravity.y = -world.gravity.y;
        }
        else if (pair.bodyB === bucket) {
          console.log('whatup');
          world.gravity.y = -world.gravity.y;
        }

        //attempting portals:
        else if (pair.bodyA === portal1) {
          console.log(pair.bodyB, portal1);
          Body.setPosition(pair.bodyB, {x: portal2.position.x, y: portal2.position.y});
          // Body.setVelocity(pair.bodyB, {x: -10, y: 5});
        } else if (pair.bodyB === portal1) {
          console.log(pair.bodyA, portal1);
          Body.setPosition(pair.bodyA, {x: portal2.position.x, y: portal2.position.y});
          // Body.setVelocity(pair.bodyA, {x: -10, y: 5});
        }


        else if (pair.bodyA.position.x == 780) {
          console.log('OMEGA <3', pair.bodyB);

          // world.gravity.y = -world.gravity.y;
        }
        else if (pair.bodyB.position.x == 780) {
          console.log('OMEGA', pair.bodyA);
          // world.gravity.y = -world.gravity.y;
        }
        //why isn't this working??
        // else if (pair.bodyA === portal2) {
        //   console.log(pair.bodyB);
        //   Body.setPosition(pair.bodyB, {x: portal1.position.x, y: portal1.position.y});
        //   // Body.setVelocity(pair.bodyB, {x: -10, y: 5});
        // } else if (pair.bodyB === portal2) {
        //   console.log(pair.bodyA);
        //   Body.setPosition(pair.bodyA, {x: portal1.position.x, y: portal1.position.y});
        //   // Body.setVelocity(pair.bodyA, {x: -10, y: 5});
        // }
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
    bar = Bodies.rectangle(780, 100, 40, 150, {isStatic: true, isSensor: true, chamfer: {radius: 7}});
    World.add(world, bar);
    heat = Bodies.rectangle(780, t, 40, 19, {isStatic: true, chamfer: {radius: 7}});
    World.add(world, heat);

    //ahhhh of course, just manually set the position!
    function moveHeat() {
      //changing the plus to minus here fixes the upside down force problem:
      Body.setPosition(heat, {x: 780, y: 100 - 64*Math.sin(t)});
      t += 0.05;
    }

    setInterval(moveHeat, 50);

    var fliers = [];
    var random = 5000;
    //adding random fliers:
    //i mean it kind of works it's just weirdly flashy/buggy with a second dropping box.
    function newFlier() {
      flier = Bodies.rectangle(780, 550, 50, 20);
      flier.offset = 0;
      fliers.push(flier);
      World.add(world, flier);
      random = Math.random()*12000;
    }

    //weird, even doing it this way doesn't seem to generate random intervals:

    //commenting out for the moment:
    // setInterval(newFlier, random);

    function fly() {
      for (var i = 0; i < fliers.length; i ++) {
        Body.setPosition(fliers[i], {x: 780 - fliers[i].offset, y: 550});
        fliers[i].offset += 10;
      }
      offset += 10;
    }
    //commenting out for the moment:
    // setInterval(fly, 50);


    //attempting portals:
    portal1 = Bodies.circle(780, 200, 15, { isStatic: true, isSensor: true });
    portal2 = Bodies.circle(20, 300, 15, { isStatic: true, isSensor: true });
    // var portal2 = Bodies.circle(780, 500, 15, { isStatic: true, isSensor: true });

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
