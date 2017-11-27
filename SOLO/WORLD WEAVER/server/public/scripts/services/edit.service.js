
myApp.service('EditService', function($http, $location){
  console.log('editService Loaded');
  var self = this;
  self.editingWorld = {};
  self.isNewWorld = false;
  self.worldToAdd = {};

  self.editWorld = function(world) {
    console.log(world);
    self.editingWorld = world;
    $location.path('/edit');
  };

  //
  // self.showPrompt = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.prompt()
  //   .title('Has your world a name?')
  //   // .textContent('Bowser is a common name.')
  //   .placeholder('King\'s Keep')
  //   .ariaLabel('Dog name')
  //   // .initialValue('Buddy')
  //   .targetEvent(ev)
  //   // .required(true)
  //   .ok('Post World!')
  //   .cancel('Untitled');
  //
  //   $mdDialog.show(confirm).then(function(result) {
  //     // vm.status = 'You decided to name your dog ' + result + '.';
  //     // console.log(vm.newWorld);
  //     self.worldToAdd.title = result;
  //     // UserService.addWorld(vm.newWorld);
  //     self.postEdit(world);
  //   }, function() {
  //     // vm.status = 'You didn\'t name your dog.';
  //   });
  // };


  self.postEdit = function(world) {
    console.log(world);
    console.log(self.newWorld);
    $http.post('/edit/world', world).then(function (response) {
      //why isn't it logging this stuff out, even though it did do the post to DB???
      //ahhhh because we were only sending 201 back if there were obstacles attached!
      console.log('making world!', world);
    }).catch(function (err) {
      console.log('whooooops');
    });

  };

  self.saveWorld = function(world) {
    console.log(world);
    $http.post('/edit/save', world).then(function (response) {
      console.log('saving world!', world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

});
