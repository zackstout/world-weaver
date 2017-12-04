
myApp.controller('PlayingController', function(UserService, $location, WorldService, $http, $interval, $mdDialog) {


  // window.onload = function() {
  console.log('playingController created');
  var vm = this;
  vm.world = [];
  vm.count = 0;
  vm.origin = WorldService.origin;
  vm.done = false;
  var newPortal = false;
  var heatMoverGlobal;

  WorldService.justPlayed = true;


  vm.goHome = function() {
    if (vm.origin == 'all') {
      // console.log(WorldService.world.id);
      clearInterval(heatMoverGlobal);
      $location.path('/all');
    } else if (vm.origin == 'mine') {
      clearInterval(heatMoverGlobal);
      $location.path('/myworlds');
    } else if (vm.origin == 'faves') {
      clearInterval(heatMoverGlobal);
      $location.path('/favs');
    }
  };

  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].remove();
    }
  }

  var t = 0;
  doMatterStart();

  function doMatterStart() {
    console.log("t is ", t);
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
    var cannon, bucket, x=0;

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
        // background: '#ADD8E6',
        // background: '#191970',
        background: '#000000',
        // background: '#00008b',

        //this will add coloring but obliterate our force bar:
        wireframes: false
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

    // var luna = Bodies.circle(100, 200, 10, { isStatic: true, isSensor: true, render:
    //   {sprite:
    //     {texture:
    //       'https://i.imgur.com/KBEqBvs.png'}}});
    // World.add(world, luna);

    var stars = Bodies.rectangle(400, 300, 500, 600, { isStatic: true , isSensor: true, render:
      {sprite:
        {texture:
          'https://cdn.pixabay.com/photo/2017/08/24/03/41/milky-way-2675322_960_720.jpg'}}});
          // 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/169995.jpg'}}});
          // 'https://pbs.twimg.com/media/BxCkS0_IUAArl4T.jpg'}}});
        // 'https://vignette.wikia.nocookie.net/starrysky/images/4/4f/Starry_sky_1.png/revision/latest?cb=20150724135550'}}});

    // stars.render.sprite.xScale = 0.8;
    stars.render.sprite.yScale = 1.1;
    // World.add(world, stars);


    var stars2 = Bodies.rectangle(400, 300, 500, 600, { isStatic: true , isSensor: true, render:
      {sprite:
        {texture:
          'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/169995.jpg'}}});

    stars2.render.sprite.xScale = 0.28;
    stars2.render.sprite.yScale = 0.28;
    World.add(world, stars2);

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

    if (WorldService.world.portals || WorldService.world.world.portals) {

      var portals;
      if (WorldService.world.portals) {
        portals = WorldService.world.portals;

      } else {
        portals = WorldService.world.world.portals;

      }
      console.log('hi there portals');


      var portal1 = Bodies.circle(780, portals.y1, 15, { isStatic: true, isSensor: true });

      var portal2 = Bodies.circle(20, portals.y2, 15, { isStatic: true, isSensor: true });

      portal1.render.fillStyle = '#9400d3';
      portal2.render.fillStyle = '#9400d3';
      World.add(world, [portal1, portal2]);
    }





    //ok it does work, as long as we don't start on the PLAYING page without any info from the service:
    if (world1.start_x != undefined) {
      cannon = Bodies.rectangle(world1.start_x, world1.start_y, 40, 20, {isStatic: true});
      bucket = Bodies.rectangle(world1.end_x, world1.end_y, 30, 30, {isStatic: true});
      cannon.render.fillStyle = '#ffd700';
      bucket.render.fillStyle = '#228b22';
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
      cannonball = Bodies.circle(cannon.position.x + 20*Math.cos(cannon.angle), cannon.position.y + 20*Math.sin(cannon.angle), 15, {restitution: 1, friction: 0});

      World.add(world, cannonball);
      // Body.applyForce(cannonball, {x: cannon.position.x, y: cannon.position.y}, {x: 0.04*Math.cos(cannon.angle), y: 0.04*Math.sin(cannon.angle)});
      Body.applyForce(cannonball, {x: cannon.position.x, y: cannon.position.y}, {x: 0.04*Math.cos(cannon.angle)*(1+Math.sin(t)), y: 0.04*Math.sin(cannon.angle)*(1+Math.sin(t))});

      vm.count++;
      newPortal = true;

    });


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
        // Matter.Composite.remove(world, heat);
        // World.clear(world, true);
        // t=0;
        // clearInterval(heatMoverGlobal);

        vm.goHome();
        // Render.stop(render);
      }, function() {
        // vm.status = 'Let\'s grab your saved worlds...';
        // Matter.Composite.remove(world, heat);
        // World.clear(world, true);

        // t=0;
        // clearInterval(heatMover);


        vm.goHome();
        // Render.stop(render);

      });
    };



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

            //changing to deciseconds:
            finish.time = vm.now*10;

            finish.complete = true;
            t = 0;
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
    bar.render.fillStyle = '#dcdcdc';
    World.add(world, bar);
    heat = Bodies.rectangle(780, t, 40, 19, {isStatic: true, chamfer: {radius: 7}});
    heat.render.fillStyle = '#ff69b4';
    World.add(world, heat);

    //ahhhh of course, just manually set the position!
    function moveHeat() {
      // console.log(t);
      //changing the plus to minus here fixes the upside down force problem:
      Body.setPosition(heat, {x: 780, y: 100 - 64*Math.sin(t)});
      t += 0.05;
    }





    // var heatMover = setInterval(moveHeat, 50);
    heatMoverGlobal = setInterval(moveHeat, 50);


    console.log(obstacles);

    //add obstacles:
    for (var i=0; i<obstacles.length; i++) {
      var wor = obstacles[i];
      if (wor.type == "rect") {
        obstacle = Bodies.rectangle(wor.x, wor.y, wor.w, wor.h, { isStatic: true, angle: wor.a*Math.PI/180 });
      } else if (wor.type == "circle") {
        obstacle = Bodies.circle(wor.x, wor.y, wor.h, { isStatic: true });
      }
      obstacle.render.fillStyle = '#1e90ff';
      World.add(world, [obstacle]);
    }

    //ahh yes, a few key ingredients we forgot:
    Engine.run(engine);
    Render.run(render);



  }
  // };
});
