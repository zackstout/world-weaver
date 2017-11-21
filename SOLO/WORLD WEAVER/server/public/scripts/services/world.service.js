
myApp.service('WorldService', function($http, $location){
  console.log('WorldService Loaded');
  var self = this;
  self.world = {};

  self.getWorld = function() {
    $http.get('/worlds').then(function (response) {
      console.log('got world!');
      self.world.stuff = response.data;
      console.log(self.world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  self.play = function(world) {
    console.log('hi', world);
    self.world = world;
    console.log('yooo', self.world);
    $location.path('/playing');

  };


});
