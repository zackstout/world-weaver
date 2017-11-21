
myApp.controller('SavedController', function(UserService, $http, $location, WorldService) {
  console.log('savedController created');
  var vm = this;

  // vm.worldsSaved = UserService.worldsSaved;
  //HUH! this has to be first!!!
  vm.worldsSaved = [];
  vm.obstaclesSaved = [];
  vm.savedWorldIds = [];

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

    vm.getSavedWorlds();

});
