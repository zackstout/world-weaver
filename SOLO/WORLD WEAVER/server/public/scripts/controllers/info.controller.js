
myApp.controller('InfoController', function(UserService, $http, $location, WorldService, EditService) {
  console.log('InfoController created');
  var vm = this;

  //well.....here's a super hack-y way of doing it I guess:
  var myCanvas = document.getElementsByTagName("canvas");
  console.log(myCanvas);
  if (myCanvas.length !== 0) {
    for (var l=0; l<myCanvas.length; l++) {
      myCanvas[l].remove();
    }
  }

  vm.faves = [];
  vm.worlds = [];
  // vm.worldsSaved = UserService.worldsSaved;
  vm.obstacles = [];
  // vm.obstaclesSaved = [];
  vm.worldIds = [];
  // vm.savedWorldIds = [];
  // vm.allWorlds = [];
  // vm.allWorldIds = [];
  // vm.allObstacles = [];
  vm.faveIds = [];


  vm.userService = UserService;

  //we're gonna have to implement a service to go between the info and playing controllers:
  vm.play2World = function(world) {
    WorldService.play2(world);
    // $location.path('/playing');
    WorldService.origin = 'mine';

  };

  vm.play3World = function(world) {
    WorldService.play3(world);
    // $location.path('/playing');
    WorldService.origin = 'faves';

  };

  //VERY ODD!!!....only works once...:
  vm.editWorld = function(world) {
    console.log(world);
    EditService.newWorld = false;
    EditService.editWorld(world);
  };


  //gonna have to be YET ANOTHER different one for the FAVES ......because that object isn't the same, i.e. doesn't have obstacles on it. Ughhhhhhh
  //also auto-directly back to ALL, even when we've clicked into PLAY from the INFO page.....


  //GET ROUTES: Obstacles, Worlds, Faves, Portals -- still need Completions, Number Faves (for Mine), and My Best Time (for Faves)
  function getObstacles() {
    UserService.getObstacles().then(function(res) {
      vm.obstacles = res;
      console.log(vm.obstacles, vm.worldIds);
      for (var i=0; i<vm.worldIds.length; i++) {
        for (var j=0; j<vm.obstacles.length; j++) {
          if (vm.obstacles[j].world_id == vm.worldIds[i].id) {
            vm.worldIds[i].obstacles.push(vm.obstacles[j]);
            // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
          }
        }
      }

      for (var k=0; k<vm.faveIds.length; k++) {
        for (var l=0; l<vm.obstacles.length; l++) {
          if (vm.obstacles[l].world_id == vm.faveIds[k].id) {
            vm.faveIds[k].obstacles.push(vm.obstacles[l]);
            // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
          }
        }
      }

      // console.log("worlds", vm.worldIds, "faves", vm.faveIds);
    });
  }



  function getCompletions() {
    $http.get('/more/completions').then(function(response) {
      // console.log(response.data);
      var comps = response.data;

      for (var i=0; i<vm.worldIds.length; i++) {
        for (var j=0; j<comps.length; j++) {
          if (comps[j].world_id == vm.worldIds[i].id) {
            // console.log(comps[j]);
            vm.worldIds[i].completions = comps[j].count;
            // world: vm.worlds[i],

          }
        }
      }

      for (var k=0; k<vm.faveIds.length; k++) {
        for (var l=0; l<comps.length; l++) {
          if (comps[l].world_id == vm.faveIds[k].id) {
            vm.faveIds[k].completions = comps[l].count;
            // world: vm.worlds[i],

          }
        }
      }


      // console.log(vm.worldIds);

    }).catch(function(err) {
      console.log(err);
    });
  }


  function getFavs() {
    $http.get('/more/favs').then(function(response) {
      // console.log(response.data);
      var favs = response.data;
      // console.log(vm.worldIds);

      for (var i=0; i<vm.worldIds.length; i++) {
        for (var j=0; j<favs.length; j++) {
          if (favs[j].world_id == vm.worldIds[i].id) {
            vm.worldIds[i].favs = favs[j].count;
            // world: vm.worlds[i],

          }
        }
      }

      for (var k=0; k<vm.faveIds.length; k++) {
        for (var l=0; l<favs.length; l++) {
          if (favs[l].world_id == vm.faveIds[k].id) {
            vm.faveIds[k].favs = favs[l].count;
            // world: vm.worlds[i],

          }
        }
      }

      console.log(vm.worldIds);

    }).catch(function(err) {
      console.log(err);
    });
  }

  function setDefaultsFave() {
    // console.log(vm.faveIds, vm.worldIds);
    for (var m=0; m<vm.faveIds.length; m++) {
      if (!vm.faveIds[m].favs) {
        vm.faveIds[m].favs = 0;
      }
      if (!vm.faveIds[m].completions) {
        vm.faveIds[m].completions = 0;
      } }

    }

    function setDefaultsMine() {
      // console.log(vm.faveIds, vm.worldIds);

      for (var n=0; n<vm.worldIds.length; n++) {

        if (!vm.worldIds[n].favs) {
          vm.worldIds[n].favs = 0;
        }
        if (!vm.worldIds[n].completions) {
          vm.worldIds[n].completions = 0;
        }

        // if (!vm.allWorldIds[k])
      }
    }


    function getPortals() {
      $http.get('/edit/portals').then(function(response) {
        // console.log(response.data);
        var portals = response.data;

        for (var i=0; i<vm.worldIds.length; i++) {
          for (var j=0; j<portals.length; j++) {
            if (portals[j].world_id == vm.worldIds[i].id) {
              vm.worldIds[i].portals = portals[j];
              // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
            }
          }
        }

        for (var k=0; k<vm.faveIds.length; k++) {
          for (var l=0; l<portals.length; l++) {
            if (portals[l].world_id == vm.faveIds[k].id) {
              vm.faveIds[k].portals = portals[l];
              // vm.faveIds[i].obstacles.push(vm.obstacles[j]);
            }
          }
        }

        console.log(vm.faveIds, vm.worldIds);

      }).catch(function(err) {
        console.log('oooooo im mister bill!');
      });
    }


    vm.getWorlds = function() {
      // UserService.getuser();
      setTimeout(logCanvasMine, 200);

      //Pretty odd that i can't get both of these working at once.....:
      // setTimeout(logCanvasFave, 100);

      // logCanvas();
      // logCanvas();

      vm.worldIds = [];
      UserService.getWorlds().then(function(res) {
        vm.worlds = res;
        // console.log(vm.worlds);
        //probably unnecessary:
        // vm.worldIds = [];

        //would be nice to make all the extra stuff conditional on there being no obstacles, but whatever for now:
        for (var i=0; i<vm.worlds.length; i++) {
          vm.worldIds.push({
            id: vm.worlds[i].id,
            attempts: vm.worlds[i].attempts,
            // completions: vm.worlds[i].completions,
            end_x: vm.worlds[i].end_x,
            end_y: vm.worlds[i].end_y,
            start_x: vm.worlds[i].start_x,
            start_y: vm.worlds[i].start_y,
            title: vm.worlds[i].title,
            obstacles: []

          });
        }

        // console.log(vm.worldIds);

        getCompletions();
        getFavs();
        setDefaultsMine();
        getObstacles();
        getPortals();
      });
    };

    // vm.getWorlds();


    vm.getFaves = function() {
      // vm.getWorlds();
      setTimeout(logCanvasFave, 200);
      // setTimeout(logCanvasMine, 100);

      // logCanvas();

      $http.get('/more/favorites2').then(function(response) {
        // vm.getWorlds();

        vm.faves = response.data;
        // console.log(vm.faves);
        vm.faveIds = [];

        for (var j=0; j<vm.faves.length; j++) {
          vm.faveIds.push({
            id: vm.faves[j].id,
            attempts: vm.faves[j].attempts,
            // completions: vm.worlds[i].completions,
            end_x: vm.faves[j].end_x,
            end_y: vm.faves[j].end_y,
            start_x: vm.faves[j].start_x,
            start_y: vm.faves[j].start_y,
            title: vm.faves[j].title,
            obstacles: []
          });
        }

        getObstacles();
        getFavs();
        setDefaultsFave();
        getPortals();
        getCompletions();

        // console.log(vm.faves);
        // console.log(vm.faveIds);
        // console.log(self.worlds);
        // return response.data;
      }).catch(function(err) {
        console.log('oh no dog', err);
      });
    };

    //ODD that it doesn't immediately refresh.......
    //fixed: needed to clear out FaveIds array on Get faves call:
    vm.unfavorite = function(world) {
      console.log(world);
      $http.delete('/more/delete/' + world.id).then(function (response) {
        console.log('Success');
        vm.getFaves();
      }).catch(function(error) {
        console.log('nuts');
      });
    };


    function logCanvasMine() {
      var can = document.getElementsByTagName("canvas");
      console.log(can);
      for (var i=0; i<can.length;i++) {
        var canvas = can[i];
        // console.log(canvas.id.slice(6));
        var canvasId = canvas.id.slice(4);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0,0,270,200);


        for (var j=0; j<vm.worldIds.length; j++) {
          if (vm.worldIds[j].id == canvasId) {

            // console.log(vm.allWorldIds[j]);
            var cannonX = vm.worldIds[j].start_x/3;
            var cannonY = vm.worldIds[j].start_y/3;
            var bucketX = vm.worldIds[j].end_x/3;
            var bucketY = vm.worldIds[j].end_y/3;

            if (vm.worldIds[j].portals) {
              var port1 = vm.worldIds[j].portals.y1/3;
              var port2 = vm.worldIds[j].portals.y2/3;
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

            for (var k=0; k<vm.worldIds[j].obstacles.length; k++) {
              var obs = vm.worldIds[j].obstacles[k];
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


    function logCanvasFave() {
      var can = document.getElementsByTagName("canvas");
      console.log(can);
      for (var i=0; i<can.length;i++) {
        var canvas = can[i];
        // console.log(canvas.id.slice(6));
        var canvasId = canvas.id.slice(3);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0,0,270,200);


        for (var j=0; j<vm.faveIds.length; j++) {
          if (vm.faveIds[j].id == canvasId) {

            // console.log(vm.allWorldIds[j]);
            var cannonX = vm.faveIds[j].start_x/3;
            var cannonY = vm.faveIds[j].start_y/3;
            var bucketX = vm.faveIds[j].end_x/3;
            var bucketY = vm.faveIds[j].end_y/3;

            if (vm.faveIds[j].portals) {
              var port1 = vm.faveIds[j].portals.y1/3;
              var port2 = vm.faveIds[j].portals.y2/3;
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

            for (var k=0; k<vm.faveIds[j].obstacles.length; k++) {
              var obs = vm.faveIds[j].obstacles[k];
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




    //Hmmmm.....in order for user to delete their own world, will need to delete all
    //RUNS, FAVORITES, OBSTACLES for that world.



  });
