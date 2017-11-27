
myApp.controller('PlayingController', function(UserService, $location, WorldService, $http, $interval, $mdDialog) {


  // window.onload = function() {
  console.log('playingController created');
  var vm = this;
  vm.world = [];
  vm.count = 0;
  vm.origin = WorldService.origin;
  vm.done = false;
  var newPortal = false;

      vm.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
        .clickOutsideToClose(true)

        .title('Level completed in ' + vm.now + ' seconds!')
        // .textContent('May weaving bring you peace.')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Awesome');
        // .cancel('SAVED WORLD');

        $mdDialog.show(confirm).then(function() {
          // vm.status = 'A new world it shall be!';
          vm.goHome();
        }, function() {
          // vm.status = 'Let\'s grab your saved worlds...';
          vm.goHome();
        });
      };


  vm.goHome = function() {
    if (vm.origin == 'all') {
      $location.path('/all');
    } else if (vm.origin == 'mine') {
      $location.path('/info');
    } else if (vm.origin == 'faves') {
      $location.path('/info');
    }
  };

  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].remove();
    }
  }

  doMatterStart();

  function doMatterStart() {
    // console.log(vm.newWorld.obstacles);
    console.log(WorldService.world);
    var world1 = WorldService.world.world;
    var obstacles = WorldService.world.obstacles;

    var finish = {
      time: 0,
      complete: false,
      worldId: WorldService.world.world.id
    };

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
    // var obstacle, cannon, cannonball, bucket, x=0;
    var cannon, bucket, t=0, x=0;

    var now = 0;
    vm.now = 0;

    function tick() {
      // vm.now = (vm.now + 0.1).toFixed(1);
      now += 0.1;
      vm.now = now.toFixed(1);
      // console.log(vm.now);
    }
    //will have to figure out how to cancel the clock on goal-achievement:
    $interval(tick, 100);

    // create a renderer
    //can we affect how large it is, where it is, here?
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        showShadows: true,
        background: '#ADD8E6',

        //this will add coloring but obliterate our force bar:
        // wireframes: false
      }
    });

    //rotate the cannon:
    window.onkeydown = function(e) {
      console.log(e.keyCode);
      //'s' key:
      if (e.keyCode == 83) {
        x -= 0.18;
      //'f' key:
      } else if (e.keyCode == 70) {
        x += 0.18;
      }
      Body.setAngle(cannon, x);
    };



    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; i++) {
        var pair = pairs[i];

        //attempting portals:
        if (newPortal) {
        if (pair.bodyA === portal1) {
          console.log(pair.bodyB, portal1);

          Body.setPosition(pair.bodyB, {x: portal2.position.x, y: portal2.position.y});
          // Body.setVelocity(pair.bodyB, {x: -10, y: 5});
          newPortal = false;
        }
        else if (pair.bodyA === portal2) {
          console.log(pair.bodyB, portal1);
          Body.setPosition(pair.bodyB, {x: portal1.position.x, y: portal1.position.y});
          // Body.setVelocity(pair.bodyB, {x: -10, y: 5});
          newPortal = false;
        }
      }
      }
    });

    var portals = WorldService.world.portals;

    var portal1 = Bodies.circle(780, portals.y1, 15, { isStatic: true, isSensor: true });

    //a pretty poor way of trying to rig reflecting portals (i.e. same-wall portals):
    // var portal1wall = Bodies.rectangle(785, 210, 15, 60, { isStatic: true });
    var portal2 = Bodies.circle(20, portals.y2, 15, { isStatic: true, isSensor: true });
    // portal2 = Bodies.circle(780, 550, 15, { isStatic: true, isSensor: true });

    World.add(world, [portal1, portal2]);


    //ok it does work, as long as we don't start on the PLAYING page without any info from the service:
    if (world1.start_x != undefined) {
      cannon = Bodies.rectangle(world1.start_x, world1.start_y, 40, 20, {isStatic: true});
      bucket = Bodies.rectangle(world1.end_x, world1.end_y, 30, 30, {isStatic: true});
      World.add(world, [cannon, bucket]);
    }

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

      vm.count++;
      newPortal = true;

    });




    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; i++) {
        var pair = pairs[i];
        // console.log(pair);
        if (pair.bodyA === bucket) {
          console.log('collision dog <3', vm.now);


//huh, can't capitalize false, that's kind of disappointing:
          if (vm.done == false) {
            vm.showConfirm(event);

            //changing to deci-seconds:
            finish.time = vm.now*10;

            finish.complete = true;
            WorldService.postFinish(finish);
          }

          vm.done = true;

        }
        else if (pair.bodyB === bucket) {
          console.log('whatup');

        }
      }
    });


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


    console.log(obstacles);

    //add obstacles:
    for (var i=0; i<obstacles.length; i++) {
      var wor = obstacles[i];
      if (wor.type == "rect") {
        obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true, angle: wor.a*Math.PI/180 });
      } else if (wor.type == "circle") {
        obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
      }
      World.add(world, [obstacle]);
    }

    //ahh yes, a few key ingredients we forgot:
    Engine.run(engine);
    Render.run(render);



  }
  // };
});
