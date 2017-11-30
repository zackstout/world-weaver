
myApp.controller('SavedController', function(UserService, $http, $location, WorldService, EditService) {
  console.log('savedController created');
  var vm = this;

  // vm.worldsSaved = UserService.worldsSaved;
  //HUH! this has to be first!!!
  vm.worldsSaved = [];
  vm.obstaclesSaved = [];
  vm.portalsSaved = [];
  vm.savedWorldIds = [];

  vm.editWorld = function(world) {
    console.log(world);
    EditService.isNewWorld = false;
    EditService.editWorld(world);
    EditService.origin = 'saved';

  };



    vm.getSavedObstacles = function() {
      UserService.getSavedObstacles().then(function(res) {
        vm.obstaclesSaved = res;
        console.log(vm.obstaclesSaved);
        for (var i=0; i<vm.savedWorldIds.length; i++) {
          for (var j=0; j<vm.obstaclesSaved.length; j++) {
            if (vm.obstaclesSaved[j].world_id == vm.savedWorldIds[i].id) {
              vm.savedWorldIds[i].obstacles.push(vm.obstaclesSaved[j]);
            }
          }
        }
        console.log(vm.savedWorldIds);
      });
    };

    vm.getSavedPortals = function() {
      EditService.getSavedPortals().then(function(res) {
        vm.portalsSaved = res;
        console.log(vm.portalsSaved);
        for (var i=0; i<vm.savedWorldIds.length; i++) {
          for (var j=0; j<vm.portalsSaved.length; j++) {
            if (vm.portalsSaved[j].world_id == vm.savedWorldIds[i].id) {
              vm.savedWorldIds[i].portals = vm.portalsSaved[j];
            }
          }
        }
        console.log(vm.savedWorldIds);
      });
    };


    vm.getSavedWorlds = function() {
      UserService.getSavedWorlds().then(function(res) {
        vm.worldsSaved = res;
        console.log(res);
        vm.savedWorldIds = [];
        for (var i=0; i<vm.worldsSaved.length; i++) {
          vm.savedWorldIds.push({
            id: vm.worldsSaved[i].id,
            start_x: vm.worldsSaved[i].start_x,
            start_y: vm.worldsSaved[i].start_y,
            end_x: vm.worldsSaved[i].end_x,
            end_y: vm.worldsSaved[i].end_y,

            obstacles: []
          });
        }
        setTimeout(logCanvasSaved, 200);
        vm.getSavedObstacles();
        vm.getSavedPortals();
      });
    };

    vm.getSavedWorlds();


      vm.delWorld = function(world) {
        console.log(world);
        $http.delete('/edit/saved/delete/' + world.id).then(function (response) {
          console.log('Success');
          vm.getSavedWorlds();
          // self.refreshItems();
        }).catch(function(error) {
          console.log('nuts');
        });
      };
      

    function logCanvasSaved() {
      var can = document.getElementsByTagName("canvas");
      console.log(can);
      for (var i=0; i<can.length;i++) {
        var canvas = can[i];
        // console.log(canvas.id.slice(6));
        var canvasId = canvas.id.slice(5);

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'lightblue';
        ctx.fillRect(0,0,270,200);


        for (var j=0; j<vm.savedWorldIds.length; j++) {
          if (vm.savedWorldIds[j].id == canvasId) {

            // console.log(vm.allWorldIds[j]);
            var cannonX = vm.savedWorldIds[j].start_x/3;
            var cannonY = vm.savedWorldIds[j].start_y/3;
            var bucketX = vm.savedWorldIds[j].end_x/3;
            var bucketY = vm.savedWorldIds[j].end_y/3;

            if (vm.savedWorldIds[j].portals) {
              var port1 = vm.savedWorldIds[j].portals.y1/3;
              var port2 = vm.savedWorldIds[j].portals.y2/3;
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

            for (var k=0; k<vm.savedWorldIds[j].obstacles.length; k++) {
              var obs = vm.savedWorldIds[j].obstacles[k];
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

});
