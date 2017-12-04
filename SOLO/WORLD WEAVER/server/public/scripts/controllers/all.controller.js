
myApp.controller('AllController', function(UserService, $anchorScroll, $http, $location, WorldService) {
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


  vm.getPortals = function() {
    $http.get('/edit/portals').then(function(response) {
      console.log(response.data);
      var portals = response.data;

      for (var i=0; i<vm.allWorldIds.length; i++) {
        for (var j=0; j<portals.length; j++) {
          if (portals[j].world_id == vm.allWorldIds[i].id) {
            vm.allWorldIds[i].portals = portals[j];
            // world: vm.worlds[i],

          }
        }
      }

      console.log(vm.allWorldIds);

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
      console.log(err);
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

      for (var k=0; k<vm.allWorldIds.length; k++) {
        if (!vm.allWorldIds[k].favs) {
          vm.allWorldIds[k].favs = 0;
        }
        if (!vm.allWorldIds[k].completions) {
          vm.allWorldIds[k].completions = 0;
        }
        // if (!vm.allWorldIds[k])
      }
    }).catch(function(err) {
      console.log(err);
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
      vm.getPortals();

      //this is the KEY console LOG:
    console.log(vm.allWorldIds);

    // console.log(WorldService.world.id);
    //
    }).catch(function(err) {
      console.log('oh no dog', err);
    });
  };

  vm.faveWorld = function(world) {
    // UserService.faveWorld(world);
    console.log(world);
    //
    $http.post('/more/favorites', world).then(function (response) {
      console.log(response.data);
      // vm.getAllWorlds();
      // world.faves = world.faves + 1;
      vm.getFavs();
      world.isFavorited = !world.isFavorited;


      // setTimeout(logCanvas, 200);

    }).catch(function (err) {
      console.log(error);
    });
  };

  vm.unfavorite = function(world) {
    // console.log(world);
    $http.delete('/more/delete/' + world.id).then(function (response) {
      console.log('Success');
      //WE REALLY shouldn't have to call both of these here, right....?
      //yeah shoot, if we DON'T call getAllWorlds, then we don't see the change....but if we do, user gets taken to top of page:
      // vm.getAllWorlds();
      // vm.getMyFaves();
      // setTimeout(logCanvas, 200);
      world.favs = world.favs - 1;
      world.isFavorited = !world.isFavorited;

      // console.log(world);

    }).catch(function(error) {
      console.log('nuts');
    });
  };


  vm.getAllWorlds();
  vm.getMyFaves();


  //why can't i get this to work?????

  function logCanvas() {
    var can = document.getElementsByTagName("canvas");
    console.log(can);
    console.log(WorldService.world.id);
    //
    for (var i=0; i<can.length;i++) {

      var canvas = can[i];
      // console.log(canvas.id.slice(6));
      var canvasId = canvas.id.slice(6);



//well....this is better but still not there, because will remember last world you played from ALL even if you go home....how about when we go home we set something false. ok.
      console.log(WorldService.origin);
//issue: this will preserve the scroll-spot, even if you're coming from MAIN PAGE:
    if (WorldService.origin == 'all' && WorldService.justPlayed) {
      if (canvasId == WorldService.world.id) {
        $location.hash(canvas.id);
        $anchorScroll();
      }
    }




      var ctx = canvas.getContext("2d");

      ctx.fillStyle = 'lightblue';
      ctx.fillRect(0,0,270,200);


      for (var j=0; j<vm.allWorldIds.length; j++) {
        if (vm.allWorldIds[j].id == canvasId) {

          // console.log(vm.allWorldIds[j]);
          var cannonX = vm.allWorldIds[j].world.start_x/3;
          var cannonY = vm.allWorldIds[j].world.start_y/3;
          var bucketX = vm.allWorldIds[j].world.end_x/3;
          var bucketY = vm.allWorldIds[j].world.end_y/3;

      //added .y1
          if (vm.allWorldIds[j].portals) {
            var port1 = vm.allWorldIds[j].portals.y1/3;
            var port2 = vm.allWorldIds[j].portals.y2/3;
            ctx.fillStyle = 'purple';
            ctx.beginPath();
            ctx.arc(265, port1, 5, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.arc(5, port2, 5, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
          }


          for (var k=0; k<vm.allWorldIds[j].obstacles.length; k++) {
            var obs = vm.allWorldIds[j].obstacles[k];
            var x = obs.x/3, y = obs.y/3, h = obs.h/3, w = obs.w/3, a = obs.a;
            ctx.fillStyle = 'blue';

            if (obs.type == 'rect') {
              ctx.translate(x, y);
              ctx.rotate(a*Math.PI/180);
              ctx.fillRect(-w/2, -h/2, w, h);
              ctx.rotate(-a*Math.PI/180);
              ctx.translate(-x, -y);
            } else if (obs.type == 'circle') {
              ctx.beginPath();
              ctx.arc(x, y, h, 0, 2*Math.PI);
              ctx.stroke();
              ctx.fill();
            }

          }


          // console.log(cannonX, cannonY, bucketX, bucketY);

          //draw cannon and bucket:
          ctx.fillStyle = 'yellow';
          //it's x, y, width, height:
          ctx.fillRect(cannonX-8, cannonY-4, 16, 8);
          ctx.fillStyle = 'green';
          ctx.fillRect(bucketX-5, bucketY-5, 10, 10);

          // ctx.moveTo()
        }
      }

      //draw border:
      ctx.moveTo(0,0);
      ctx.lineTo(0,200);
      ctx.stroke();

      ctx.moveTo(0,0);
      ctx.lineTo(270,0);
      ctx.stroke();

      ctx.moveTo(270,0);
      ctx.lineTo(270,200);
      ctx.stroke();

      ctx.moveTo(270,200);
      ctx.lineTo(0,200);
      ctx.stroke();

    }
  }

  setTimeout(logCanvas, 200);


  //
  // function checkForFavorites() {
  //   for (var i = 0; i < vm.allWorldIds.length; i++ ) {
  //     var world = vm.allWorldIds[i];
  //   }
  // }

});
