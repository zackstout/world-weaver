
myApp.controller('InfoController', function(UserService, $http, $location, WorldService) {
  console.log('InfoController created');
  var vm = this;

  //well.....here's a super hack-y way of doing it I guess:
  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].style.display = 'none';
    }
  }

  vm.worlds = [];
  // vm.worldsSaved = UserService.worldsSaved;
  vm.obstacles = [];
  // vm.obstaclesSaved = [];
  vm.worldIds = [];
  // vm.savedWorldIds = [];
  // vm.allWorlds = [];
  // vm.allWorldIds = [];
  // vm.allObstacles = [];


  vm.userService = UserService;

//we're gonna have to implement a service to go between the info and playing controllers:
  vm.playWorld = function(world) {
    WorldService.play(world);
    // $location.path('/playing');

  };

  vm.getObstacles = function() {
    UserService.getObstacles().then(function(res) {
      vm.obstacles = res;
      console.log(vm.obstacles, vm.worldIds);
      for (var i=0; i<vm.worldIds.length; i++) {
        for (var j=0; j<vm.obstacles.length; j++) {
          if (vm.obstacles[j].world_id == vm.worldIds[i].id) {
            vm.worldIds[i].obstacles.push(vm.obstacles[j]);
          }
        }
      }
      console.log(vm.worldIds);
    });
  };

  vm.getWorlds = function() {
    // UserService.getuser();
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



  // vm.getSavedObstacles = function() {
  //   UserService.getSavedObstacles().then(function(res) {
  //     vm.obstaclesSaved = res;
  //     console.log(vm.obstaclesSaved);
  //     for (var i=0; i<vm.savedWorldIds.length; i++) {
  //       for (var j=0; j<vm.obstaclesSaved.length; j++) {
  //         if (vm.obstaclesSaved[j].world_id == vm.savedWorldIds[i].id) {
  //           vm.savedWorldIds[i].obstacles.push(vm.obstaclesSaved[j]);
  //         }
  //       }
  //     }
  //     console.log(vm.savedWorldIds);
  //   });
  // };
  //
  // vm.getSavedWorlds = function() {
  //   UserService.getSavedWorlds().then(function(res) {
  //     vm.worldsSaved = res;
  //     console.log(res);
  //     vm.savedWorldIds = [];
  //     for (var i=0; i<vm.worldsSaved.length; i++) {
  //       vm.savedWorldIds.push({
  //         id: vm.worldsSaved[i].id,
  //         obstacles: []
  //       });
  //     }
  //     vm.getSavedObstacles();
  //   });
  // };



});
