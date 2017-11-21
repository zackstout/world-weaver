
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

  vm.worlds = UserService.worlds;
  vm.worldsSaved = UserService.worldsSaved;
  vm.obstacles = [];
  vm.obstaclesSaved = [];
  vm.worldIds = [];
  vm.savedWorldIds = [];
  vm.allWorlds = [];
  vm.allWorldIds = [];
  vm.allObstacles = [];


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
    UserService.getWorlds().then(function(res) {
      vm.worlds = res;
      console.log(vm.worlds);
      //probably unnecessary:
      vm.worldIds = [];
      for (var i=0; i<vm.worlds.length; i++) {
        vm.worldIds.push({
          id: vm.worlds[i].id,
          obstacles: []
        });
      }
      vm.getObstacles();
    });
  };

  //
  // vm.getAllObstacles = function() {
  //   UserService.getAllObstacles().then(function(res) {
  //     vm.allObstacles = res;
  //     // console.log(vm.obstacles, vm.worldIds);
  //     for (var i=0; i<vm.allWorldIds.length; i++) {
  //       for (var j=0; j<vm.allObstacles.length; j++) {
  //         if (vm.allObstacles[j].world_id == vm.allWorldIds[i].id) {
  //           vm.allWorldIds[i].obstacles.push(vm.allObstacles[j]);
  //         }
  //       }
  //     }
  //     // console.log(vm.worldIds);
  //   });
  // };
  vm.getAllObstacles = function() {
    // var userId = self.userObject.userId;
    $http.get('/more/obstacles').then(function(response) {
      // self.allWorlds = response.data;
      // console.log(self.worlds);
    console.log(response.data);
    vm.allObstacles = response.data;
    for (var i=0; i<vm.allWorldIds.length; i++) {
      for (var j=0; j<vm.allObstacles.length; j++) {
        if (vm.allObstacles[j].world_id == vm.allWorldIds[i].id) {
          vm.allWorldIds[i].obstacles.push(vm.allObstacles[j]);
          // world: vm.worlds[i],

        }
      }
    }
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  vm.getAllWorlds = function() {
    // var userId = self.userObject.userId;
    $http.get('/more').then(function(response) {
      vm.allWorlds = response.data;
      // console.log(self.worlds);
    console.log(response.data);
    for (var i=0; i<vm.allWorlds.length; i++) {
      vm.allWorldIds.push({
        id: vm.allWorlds[i].id,
        world: vm.allWorlds[i],
        obstacles: []
      });
    }
    vm.getAllObstacles();
    console.log(vm.allWorldIds);
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };
  //
  // vm.getAllWorlds = function() {
  //   UserService.getAllWorlds().then(function(res) {
  //     vm.allWorlds = res;
  //     console.log(vm.allWorlds);
  //     //probably unnecessary:
  //     // vm.worldIds = [];
  //     for (var i=0; i<vm.allWorlds.length; i++) {
  //       vm.allWorldIds.push({
  //         id: vm.allWorlds[i].id,
  //         obstacles: []
  //       });
  //     }
  //     vm.getAllObstacles();
  //   });
  // };


  vm.getSavedObstacles = function() {
    UserService.getSavedObstacles().then(function(res) {
      vm.obstaclesSaved = res;
      console.log(vm.obstaclesSaved);
      for (var i=0; i<vm.savedWorldIds.length; i++) {
        for (var j=0; j<vm.obstaclesSaved.length; j++) {
          if (vm.obstaclesSaved[j].world_id == vm.savedWorldIds[i].id) {
            vm.savedWorldIds[i].obstacles.push(vm.obstaclesSaved[j]);
          }
        }
      }
      console.log(vm.savedWorldIds);
    });
  };

  vm.getSavedWorlds = function() {
    UserService.getSavedWorlds().then(function(res) {
      vm.worldsSaved = res;
      console.log(res);
      vm.savedWorldIds = [];
      for (var i=0; i<vm.worldsSaved.length; i++) {
        vm.savedWorldIds.push({
          id: vm.worldsSaved[i].id,
          obstacles: []
        });
      }
      vm.getSavedObstacles();
    });
  };



});
