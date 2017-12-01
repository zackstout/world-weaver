
myApp.controller('GameController', function(UserService, $http, $location, WorldService) {
  console.log('gameController created');
  var vm = this;
  vm.addClass1 = '';
  vm.addClass2 = '';
  vm.addClass3 = '';
  vm.addClass4 = '';

  vm.TwoComp = WorldService.TwoComp;
  vm.ThreeComp = WorldService.ThreeComp;

  vm.play = function(num) {
    console.log(num);
    var level = 'game' + num;
    WorldService.origin = level;
    console.log(WorldService.origin);
    WorldService.playTut();
  };



  vm.showWorld = function() {
    console.log('clickin new world');
    doMatterStart();
  };

  vm.moving = false;
  vm.status = '';

  vm.hi = 'md-primary';

  vm.changeClass = function() {
    if (vm.hi == 'md-primary') {
      vm.hi = 'md-warn';
    } else {
      vm.hi = 'md-primary';
    }
  };




  vm.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Many worlds have yet to be woven!')
          .textContent('May weaving bring you peace.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('NEW WORLD')
          .cancel('SAVED WORLD');

    $mdDialog.show(confirm).then(function() {
      vm.status = 'A new world it shall be!';
    }, function() {
      vm.status = 'Let\'s grab your saved worlds...';
    });
  };

  vm.toggleMouse = function() {
    vm.moving = !vm.moving;
  };

  // var making = true;

});
