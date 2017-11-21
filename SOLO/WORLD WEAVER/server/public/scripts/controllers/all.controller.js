
myApp.controller('AllController', function(UserService, $http, $location, WorldService) {
  console.log('allController created');
  var vm = this;

  vm.allWorlds = [];
  vm.allWorldIds = [];
  vm.allObstacles = [];

  vm.playWorld = function(world) {
    WorldService.play(world);
  };

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

  vm.getAllWorlds();

});
