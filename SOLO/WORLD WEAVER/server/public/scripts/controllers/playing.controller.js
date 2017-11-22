
myApp.controller('PlayingController', function(UserService, WorldService, $http, $interval) {
  console.log('playingController created');
  var vm = this;
  vm.world = [];

  doMatterStart();

  function doMatterStart() {
    // console.log(vm.newWorld.obstacles);
    console.log(WorldService.world.world);
    var world1 = WorldService.world.world;

    var finish = {
      time: 0,
      complete: false
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
    // var box = Bodies.rectangle(100,100,100,100);
    // World.add(world, box);


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

    });


    Events.on(engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      for (var i = 0, j = pairs.length; i != j; i++) {
        var pair = pairs[i];
        // console.log(pair);
        if (pair.bodyA === bucket) {
          console.log('collision dog <3', vm.now);

          //mdDialog here


          // world.gravity.y = -world.gravity.y;
        }
        else if (pair.bodyB === bucket) {
          console.log('whatup');

          //mdDialog here though it doesn't seem to ever run this..



          // world.gravity.y = -world.gravity.y;
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


    //ahh yes, a few key ingredients we forgot:
    Engine.run(engine);
    Render.run(render);



  }

});
