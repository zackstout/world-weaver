
myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.worlds = [];
  self.worldsSaved = [];
  self.obstacles = [];
  self.obstaclesSaved = [];


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



  self.getWorlds = function() {
    // self.getuser();
    var userId = self.userObject.userId;
    console.log("ID: ", userId);
    return $http.get('/worlds/' + userId).then(function(response) {
      self.worlds = response.data;
      // console.log(self.worlds);
      return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  self.getObstacles = function() {
    var userId = self.userObject.userId;
    return $http.get('/worlds/obstacles/' + userId).then(function(response) {
      self.obstacles = response.data;
      // console.log(self.obstacles);
      return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  // self.getAllWorlds = function() {
  //   // var userId = self.userObject.userId;
  //   return $http.get('/worlds/all').then(function(response) {
  //     // self.allWorlds = response.data;
  //     // console.log(self.worlds);
  //     return response.data;
  //   }).catch(function(err) {
  //     console.log('oh no dog', err);
  //   });
  // };
  //
  // self.getAllObstacles = function() {
  //   // var userId = self.userObject.userId;
  //   return $http.get('/worlds/obstacles/all').then(function(response) {
  //     // self.obstacles = response.data;
  //     // console.log(self.obstacles);
  //     return response.data;
  //   }).catch(function(err) {
  //     console.log('oh no dog', err);
  //   });
  // };

  self.getSavedWorlds = function() {
    var userId = self.userObject.userId;
    return $http.get('/worlds/save/' + userId).then(function(response) {
      self.worldsSaved = response.data;
      // console.log(self.worldsSaved);
      return response.data;
    }).catch(function(err) {
      console.log('ayyyyyiiiiieee!!!');
    });
  };

  // self.faveWorld = function(world) {
  //
  //
  //
  //   $http.post('/more/favorites', world).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (err) {
  //     console.log(error);
  //   });
  // };

  self.getSavedObstacles = function() {
    var userId = self.userObject.userId;
    return $http.get('/worlds/save/obstacles/' + userId).then(function(response) {
      self.obstaclesSaved = response.data;
      // console.log(self.obstaclesSaved);
      return response.data;
    }).catch(function(err) {
      console.log('oh no dog', err);
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
