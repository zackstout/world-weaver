
myApp.controller('NavController', function(UserService, $http, $location, WorldService, EditService) {
  console.log('NavController created');
  var vm = this;

  vm.userService = UserService;

  vm.goHome = function() {
    $location.path('/user');
  };


});
