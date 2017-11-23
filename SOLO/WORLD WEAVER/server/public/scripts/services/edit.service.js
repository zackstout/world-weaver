
myApp.service('EditService', function($http, $location){
  console.log('editService Loaded');
  var self = this;
  self.editingWorld = {};
  self.newWorld = false;

  self.editWorld = function(world) {
    console.log(world);
    self.editingWorld = world;
    $location.path('/edit');
  };

});
