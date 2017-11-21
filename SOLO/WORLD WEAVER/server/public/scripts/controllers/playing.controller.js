
myApp.controller('PlayingController', function(UserService, WorldService, $http, $interval) {
  console.log('playingController created');
  var vm = this;

  doMatterStart();

  function doMatterStart() {
    // console.log(vm.newWorld.obstacles);
    console.log(WorldService.world.world);
    var wor = WorldService.world.world;

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
    var cannon, bucket;
    // var box = Bodies.rectangle(100,100,100,100);
    // World.add(world, box);

//ok it does work, as long as we don't start on the PLAYING page without any info from the service:
    if (wor.start_x != undefined) {
      cannon = Bodies.rectangle(wor.start_x, wor.start_y, 40, 20, {isStatic: true});
      bucket = Bodies.rectangle(wor.end_x, wor.end_y, 30, 30, {isStatic: true});
      World.add(world, [cannon, bucket]);
    }


    // create a renderer
    var render = Render.create({
      element: document.body,
      engine: engine
    });

    //ahh yes, a few key ingredients we forgot:
    Engine.run(engine);
    Render.run(render);



  }

});
