
myApp.controller('UserController', function(UserService, $location) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  
  vm.go = function(path) {
    $location.path(path);
  };
});
