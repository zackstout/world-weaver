
myApp.controller('InfoController', function(UserService, $http, $location, WorldService, EditService) {
  console.log('InfoController created');
  var vm = this;

  //well.....here's a super hack-y way of doing it I guess:
  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].remove();
    }
  }

  vm.faves = [];
  vm.worlds = [];
  // vm.worldsSaved = UserService.worldsSaved;
  vm.obstacles = [];
  // vm.obstaclesSaved = [];
  vm.worldIds = [];
  // vm.savedWorldIds = [];
  // vm.allWorlds = [];
  // vm.allWorldIds = [];
  // vm.allObstacles = [];
  vm.faveIds = [];


  vm.userService = UserService;

  //we're gonna have to implement a service to go between the info and playing controllers:
  vm.play2World = function(world) {
    WorldService.play2(world);
    // $location.path('/playing');
    WorldService.origin = 'mine';

  };

  vm.play3World = function(world) {
    WorldService.play3(world);
    // $location.path('/playing');
    WorldService.origin = 'faves';

  };

  //VERY ODD!!!....only works once...:
  vm.editWorld = function(world) {
    console.log(world);
    EditService.newWorld = false;
    EditService.editWorld(world);
  };


  //gonna have to be YET ANOTHER different one for the FAVES ......because that object isn't the same, i.e. doesn't have obstacles on it. Ughhhhhhh
  //also auto-directly back to ALL, even when we've clicked into PLAY from the INFO page.....


  vm.getObstacles = function() {
    UserService.getObstacles().then(function(res) {
      vm.obstacles = res;
      console.log(vm.obstacles, vm.worldIds);
      for (var i=0; i<vm.worldIds.length; i++) {
        for (var j=0; j<vm.obstacles.length; j++) {
          if (vm.obstacles[j].world_id == vm.worldIds[i].id) {
            vm.worldIds[i].obstacles.push(vm.obstacles[j]);
            // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
          }
        }
      }

      for (var k=0; k<vm.faveIds.length; k++) {
        for (var l=0; l<vm.obstacles.length; l++) {
          if (vm.obstacles[l].world_id == vm.faveIds[k].id) {
            vm.faveIds[k].obstacles.push(vm.obstacles[l]);
            // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
          }
        }
      }

      console.log(vm.worldIds);
    });
  };

  vm.getWorlds = function() {
    // UserService.getuser();
    setTimeout(logCanvas, 200);
    // logCanvas();
    // logCanvas();

    vm.worldIds = [];
    UserService.getWorlds().then(function(res) {
      vm.worlds = res;
      console.log(vm.worlds);
      //probably unnecessary:
      // vm.worldIds = [];

      //would be nice to make all the extra stuff conditional on there being no obstacles, but whatever for now:
      for (var i=0; i<vm.worlds.length; i++) {
        vm.worldIds.push({
          id: vm.worlds[i].id,
          attempts: vm.worlds[i].attempts,
          completions: vm.worlds[i].completions,
          end_x: vm.worlds[i].end_x,
          end_y: vm.worlds[i].end_y,
          start_x: vm.worlds[i].start_x,
          start_y: vm.worlds[i].start_y,
          title: vm.worlds[i].title,
          obstacles: []
        });
      }

      vm.getObstacles();
    });
  };

  // vm.getWorlds();


  vm.getFaves = function() {
    // vm.getWorlds();
    setTimeout(logCanvas, 200);
    // logCanvas();

    $http.get('/more/favorites2').then(function(response) {
      // vm.getWorlds();

      vm.faves = response.data;
      vm.faveIds = [];

      for (var j=0; j<vm.faves.length; j++) {
        vm.faveIds.push({
          id: vm.faves[j].id,
          attempts: vm.faves[j].attempts,
          // completions: vm.worlds[i].completions,
          end_x: vm.faves[j].end_x,
          end_y: vm.faves[j].end_y,
          start_x: vm.faves[j].start_x,
          start_y: vm.faves[j].start_y,
          title: vm.faves[j].title,
          obstacles: []
        });
      }

      vm.getObstacles();

      console.log(vm.faves);
      console.log(vm.faveIds);
      // console.log(self.worlds);
      // return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  //ODD that it doesn't immediately refresh.......
  //fixed: needed to clear out FaveIds array on Get faves call:
  vm.unfavorite = function(world) {
    console.log(world);
    $http.delete('/more/delete/' + world.id).then(function (response) {
      console.log('Success');
      vm.getFaves();
    }).catch(function(error) {
      console.log('nuts');
    });
  };



  function logCanvas() {
    var can = document.getElementsByTagName("canvas");
    console.log(can);
    for (var i=0; i<can.length;i++) {
      var canvas = can[i];
      // console.log(canvas.id.slice(6));
      // var canvasId = canvas.id.slice(6);

      // for (var j=0; j<vm.allWorldIds.length; j++) {
      //   if (vm.allWorldIds[j].id == canvasId) {
      //     console.log(vm.allWorldIds[j]);
      //
      //   }
      // }

      var ctx = canvas.getContext("2d");
      ctx.fillStyle = 'blue';
      ctx.fillRect(0,0,270,200);
      //draw border:
      ctx.moveTo(0,0);
      ctx.lineTo(0,200);
      ctx.stroke();

      ctx.moveTo(0,0);
      ctx.lineTo(270,0);
      ctx.stroke();

      ctx.moveTo(270,0);
      ctx.lineTo(270,200);
      ctx.stroke();

      ctx.moveTo(270,200);
      ctx.lineTo(0,200);
      ctx.stroke();


    }
  }

  // setTimeout(logCanvas, 1000);




  //Hmmmm.....in order for user to delete their own world, will need to delete all
  //RUNS, FAVORITES, OBSTACLES for that world.



});
