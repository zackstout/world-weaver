
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


});
