
myApp.service('WorldService', function($http, $location){
  console.log('WorldService Loaded');
  var self = this;
  self.world = {};
  // self.editWorld = {};

  self.origin = '';

  self.TwoComp = false;
  self.ThreeComp = false;
  self.tutorial = {};

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

  self.playTut = function() {
    console.log(self.origin);
    $http.get('/tutorial').then(function (response) {
      self.tutorial = response.data;

      console.log(self.tutorial);
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


//for calling PLAY from the INFO page rather than the ALL page:
  self.play2 = function(world) {
    console.log('hi', world);
    //can we just change this?
    self.world.world = world;
    self.world.obstacles = world.obstacles;
    console.log('yooo', self.world);

    $location.path('/playing');

    $http.post('/more/stats2', world).then(function(response) {
      console.log("good job friendo");
    }).catch(function(err) {
      console.log('nuts');
    });

  };

  self.play3 = function(world) {
    console.log('hi', world);
    //can we just change this?
    self.world.world = world;
    self.world.obstacles = world.obstacles;
    console.log('yooo', self.world);

    $location.path('/playing');

    $http.post('/more/stats2', world).then(function(response) {
      console.log("good job friendo");
    }).catch(function(err) {
      console.log('nuts');
    });

  };


});
