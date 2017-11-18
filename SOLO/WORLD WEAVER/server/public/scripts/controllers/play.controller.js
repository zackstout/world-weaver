
var x, y, h, wid;

myApp.controller('PlayController', function(UserService, WorldService, $http) {
  console.log('playController created');
  var vm = this;

//i am seriously confused: it shows vm.ws as having a "world" property, but won't let us grab it:
  // function getWorld() {
  //   WorldService.getWorld();
  //   vm.ws = WorldService;
  //   console.log(vm.ws.world);
  // }

  function getWorld() {
      $http.get('/worlds').then(function (response) {
        console.log('got world!');
        vm.world = response.data;
        console.log(vm.world[0]);
        var w = vm.world[0];
        x = w.obstacle_x;
        y = w.obstacle_y;
        h = w.obstacle_h;
        //lol i was reusing 'w':
        wid = w.obstacle_w;
        console.log(x,y,w,h);
      }).catch(function (err) {
        console.log('whooooops');
      });
  }

  getWorld();
  setTimeout(doMatter, 2000);


function doMatter() {
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });

  // var boxA = Bodies.rectangle(400, 200, 80, 80);
  // var boxB = Bodies.rectangle(450, 50, 80, 80);
  console.log(x,y,h,wid);
  var obstacle = Bodies.rectangle(x, y, wid, h, { isStatic: true });

  World.add(engine.world, [obstacle]);

  Engine.run(engine);
  Render.run(render);
}

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
//
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
