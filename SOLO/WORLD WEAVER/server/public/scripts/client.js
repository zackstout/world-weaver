
var myApp = angular.module('myApp', ['ngRoute']);

var x, y, h, w;
/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'LoginController as lc',
  })
  .when('/register', {
    templateUrl: '/views/templates/register.html',
    controller: 'LoginController as lc'
  })
  .when('/user', {
    templateUrl: '/views/templates/user.html',
    controller: 'UserController as uc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/info', {
    templateUrl: '/views/templates/info.html',
    controller: 'InfoController',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/play', {
    templateUrl: '/views/templates/play.html',
    controller: 'PlayController as pc',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/edit', {
    templateUrl: '/views/templates/edit.html',
    controller: 'EditController as ec',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .otherwise({
    redirectTo: 'home'
  });
  // WorldService.getWorld();
});

//
// var Engine = Matter.Engine;
// var World = Matter.World;
// var Bodies = Matter.Bodies;
// var Render = Matter.Render;
// var engine;
//
// var world;
// var box1 = Bodies.rectangle(200, 100, 20, 20);
//
// // engine = Engine.create();
// // var render = Render.create({
// //     element: document.body,
// //     engine: engine
// // });
// // world = engine.world;
//
// // World.add(world, box1);
// //
// // Engine.run(engine);
//
//
// // Render.run(render);
//
// function setup() {
//   var canvas = createCanvas(1000,1000);
//   engine = Engine.create();
//   world = engine.world;
//   Engine.run(engine);
//
//   World.add(world, box1);
//
// }
//
// function draw() {
//   background(180);
//   rect(box1.position.x,box1.position.y, 20, 20);
//
// }
