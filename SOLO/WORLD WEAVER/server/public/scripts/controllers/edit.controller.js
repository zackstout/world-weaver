
myApp.controller('EditController', function(UserService) {
  console.log('IeditController created');
  var vm = this;

  vm.showWorld = function() {
    console.log('clickin new world');
    doMatterStart();
  };

  vm.moving = false;

  vm.toggleMouse = function() {
    vm.moving = !vm.moving;
  };

  // var making = true;

  function doMatterStart() {
    // console.log(vm.newWorld.obstacles);
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
    var box;

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

    var ourBoy;

    Events.on(mc, "mousedown", function() {
      console.log('hello sir', mouse.position.x, mouse.position.y);
      cannonball = Bodies.circle(50, 50, 15, {restitution: 1, friction: 0});
      World.add(world, cannonball);
      Body.applyForce(cannonball, {x: 50, y: 50}, {x: 0.04, y: 0.04});

      if (vm.moving) {
        Events.on(mc, "startdrag", function() {
          console.log('we draggin', mc.body);
          ourBoy = mc.body;
          // ourBoy.isStatic = false;
        });

        Events.on(mc, "enddrag", function() {
          console.log('alllll done hoss');
          // ourBoy.isStatic = true;
        });
      } else {
        box = Bodies.rectangle(mouse.position.x, mouse.position.y, 60, 60, {isStatic: true});
        var mousePos = {x: mouse.position.x, y: mouse.position.y};
        World.add(world, box);
        // setInterval(staticBox, 5);
      }

      function staticBox() {
        Body.setVelocity(box, {x: 0, y: 0});
      }



    });




        Engine.run(engine);
        Render.run(render);

      }

});
