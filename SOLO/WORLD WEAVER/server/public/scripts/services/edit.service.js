
myApp.service('EditService', function($http, $location){
  console.log('editService Loaded');
  var self = this;
  self.editingWorld = {};
  self.isNewWorld = false;
  self.worldToAdd = {};
  // self.portalsSaved = [];

  self.origin = '';

  self.editWorld = function(world) {
    console.log(world);
    self.editingWorld = world;
    $location.path('/edit');
  };

  self.getSavedPortals = function() {
    // var userId = self.userObject.userId;
    return $http.get('/edit/savedPortals/').then(function(response) {
      self.portalsSaved = response.data;
      // console.log(self.obstaclesSaved);
      return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };


  self.postEdit = function(world) {
    console.log(world);
    // console.log(self.newWorld);
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
