
myApp.controller('AllController', function(UserService, $http, $location, WorldService) {
  console.log('allController created');
  var vm = this;

  vm.allWorlds = [];
  vm.allWorldIds = [];
  vm.allObstacles = [];
  var faves = [];


  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].remove();
    }
  }

  vm.playWorld = function(world) {
    WorldService.play(world);
    WorldService.origin = 'all';
  };

  vm.getCompletions = function() {
    $http.get('/more/completions').then(function(response) {
      console.log(response.data);
      var comps = response.data;

      for (var i=0; i<vm.allWorldIds.length; i++) {
        for (var j=0; j<comps.length; j++) {
          if (comps[j].world_id == vm.allWorldIds[i].id) {
            vm.allWorldIds[i].completions = comps[j].count;
            // world: vm.worlds[i],

          }
        }
      }

    }).catch(function(err) {
      console.log(error);
    });
  };

  vm.getCompletionsList = function() {
    $http.get('/more/completions/list').then(function(response) {
      console.log(response.data);
      var compsList = response.data;

      for (var i=0; i<vm.allWorldIds.length; i++) {
        vm.allWorldIds[i].compList = [];
        for (var j=0; j<compsList.length; j++) {
          if (compsList[j].world_id == vm.allWorldIds[i].id) {
            vm.allWorldIds[i].compList.push(compsList[j]);

            // vm.allWorldIds[i].completions = comps[j].count;
            // world: vm.worlds[i],

          }
        }
      }

      // console.log(vm.allWo);

    }).catch(function(err) {
      console.log(error);
    });
  };

  vm.getFavs = function() {
    $http.get('/more/favs').then(function(response) {
      console.log(response.data);
      var favs = response.data;
      for (var i=0; i<vm.allWorldIds.length; i++) {
        for (var j=0; j<favs.length; j++) {
          if (favs[j].world_id == vm.allWorldIds[i].id) {
            vm.allWorldIds[i].favs = favs[j].count;
            // world: vm.worlds[i],

          }
        }
      }
    }).catch(function(err) {
      console.log(error);
    });
  };


  vm.getAllObstacles = function() {
    // var userId = self.userObject.userId;
    $http.get('/more/obstacles').then(function(response) {
      // self.allWorlds = response.data;
      // console.log(self.worlds);
    console.log(response.data);
    vm.allObstacles = response.data;
    for (var i=0; i<vm.allWorldIds.length; i++) {
      for (var j=0; j<vm.allObstacles.length; j++) {
        if (vm.allObstacles[j].world_id == vm.allWorldIds[i].id) {
          vm.allWorldIds[i].obstacles.push(vm.allObstacles[j]);
          // world: vm.worlds[i],

        }
      }
    }
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  vm.getMyFaves = function() {

    $http.get('/more/favorites').then(function(response) {
      console.log(response.data);
      vm.faves = response.data;

      for (var i=0; i<vm.faves.length; i++) {
        var worldId = vm.faves[i].world_id;
        for (var j=0; j<vm.allWorldIds.length; j++) {
          if (vm.allWorldIds[j].id == worldId) {
            vm.allWorldIds[j].isFavorited = true;
          }
        }
      }
      console.log(vm.allWorldIds);

    }).catch(function(err) {
      console.log(error);
    });
  };

  vm.getAllWorlds = function() {
    // var userId = self.userObject.userId;
    vm.allWorldIds = [];
    $http.get('/more').then(function(response) {
      vm.allWorlds = response.data;
      // console.log(self.worlds);
    console.log(response.data);
    for (var i=0; i<vm.allWorlds.length; i++) {
      vm.allWorldIds.push({
        id: vm.allWorlds[i].id,
        world: vm.allWorlds[i],
        obstacles: []
      });
    }
    vm.getAllObstacles();
    vm.getMyFaves();

      vm.getFavs();
      vm.getCompletions();
      vm.getCompletionsList();

      //this is the KEY console LOG:
    console.log(vm.allWorldIds);
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  vm.faveWorld = function(world) {
    // UserService.faveWorld(world);
    //
    $http.post('/more/favorites', world).then(function (response) {
      console.log(response.data);
      vm.getAllWorlds();
      vm.getMyFaves();

    }).catch(function (err) {
      console.log(error);
    });
  };


  vm.getAllWorlds();
  vm.getMyFaves();



  //
  // function checkForFavorites() {
  //   for (var i = 0; i < vm.allWorldIds.length; i++ ) {
  //     var world = vm.allWorldIds[i];
  //   }
  // }

});
