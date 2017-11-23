
myApp.controller('UserController', function(UserService, $location, $mdDialog, EditService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.go = function(path) {
    $location.path(path);
  };

  //well.....here's a super hack-y way of doing it I guess:
  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].style.display = 'none';
    }
  }

  vm.status = '';

  vm.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Many worlds have yet to be woven!')
          // .textContent('May weaving bring you peace.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('NEW WORLD')
          .cancel('SAVED WORLD');

    $mdDialog.show(confirm).then(function() {
      vm.status = 'A new world it shall be!';
      EditService.newWorld = true;
      vm.go('/edit');
    }, function() {
      vm.status = 'Let\'s grab your saved worlds...';
      vm.go('/saved_games');
    });
  };

});
