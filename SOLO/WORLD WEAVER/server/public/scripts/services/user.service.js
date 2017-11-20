
myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.worlds = [];
  self.worldsSaved = [];

  self.addWorld = function(world) {
    // console.log(self.userObject, "making world");
    world.userId = self.userObject.userId;
    $http.post('/worlds', world).then(function (response) {
      //why isn't it logging this stuff out, even though it did do the post to DB???
      //ahhhh because we were only sending 201 back if there were obstacles attached!
      console.log('making world!', world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  self.saveWorld = function(world) {
    world.userId = self.userObject.userId;
    $http.post('/worlds/save', world).then(function (response) {
      console.log('saving world!', world);
    }).catch(function (err) {
      console.log('whooooops');
    });
  };

  self.getWorlds = function() {
    var userId = self.userObject.userId;
    return $http.get('/worlds/' + userId).then(function(response) {
      self.worlds = response.data;
      console.log(self.worlds);
      return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  self.getSavedWorlds = function() {
    var userId = self.userObject.userId;
    return $http.get('/worlds/save/' + userId).then(function(response) {
      self.worldsSaved = response.data;
      console.log(self.worldsSaved);
      return response.data;
    }).catch(function(err) {
      console.log('ayyyyyiiiiieee!!!');
    });
  };


  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.userId = response.data.id;
            // console.log('UserService -- getuser -- User Data: ', response.data);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
        //whoa what is with this comma????
    }, function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  };

  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  };

});
