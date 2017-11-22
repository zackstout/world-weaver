
myApp.service('WorldService', function($http, $location){
  console.log('WorldService Loaded');
  var self = this;
  self.world = {};


  self.postFinish = function(fin) {
    $http.post('/more/times', fin).then(function(response) {
      console.log("good job bud");
    }).catch(function(err) {
      console.log('nutso');
    });
  };

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

    $http.post('/more/stats', world).then(function(response) {
      console.log("good job friendo");
    }).catch(function(err) {
      console.log('nuts');
    });

  };


});
