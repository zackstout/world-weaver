myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  var vm = this;

  vm.worlds = UserService.worlds;
  vm.worldsSaved = UserService.worldsSaved;

  vm.userService = UserService;

  vm.getWorlds = function() {
    UserService.getWorlds().then(function(res) {
      vm.worlds = res;
      console.log(vm.worlds);
    });
  };

  vm.getSavedWorlds = function() {
    UserService.getSavedWorlds().then(function(res) {
      vm.worldsSaved = res;
      console.log(res);
    });
  };

});
