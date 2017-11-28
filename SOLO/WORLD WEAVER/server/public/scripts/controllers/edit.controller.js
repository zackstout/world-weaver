
myApp.controller('EditController', function(UserService, $mdDialog, WorldService, EditService) {
  console.log('IeditController created');
  var vm = this;

  vm.world = EditService.editingWorld;
  vm.isNewWorld = EditService.isNewWorld;
  // console.log(vm.world, vm.isNewWorld);

  vm.newWorld = {
    start_x: 0,
    start_y: 0,
    end_x: 0,
    end_y: 0,
    title: 'Untitled',
    obstacles: [],
    portals: {}
  };

  vm.newObstacle = {
    x: 0,
    y: 0,
    h: 10,
    w: 10,
    a: 0,
    type: 'rect'
  };

  vm.isNewPortal = false;
  vm.portalExists = false;
  vm.newPortal = {
    y1: 30,
    y2: 30
  };

  vm.showPortal = function() {
    vm.isNewPortal = !vm.isNewPortal;
  };

  vm.addPortal = function(portal) {
    vm.newWorld.portals = portal;
    console.log(vm.newWorld);
    vm.isNewPortal = false;
    vm.portalExists = true;
  };


  var canvas = document.getElementById('hi');
  console.log(canvas);

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0,0,800,600);


  //populate existing world if coming from SavedWorlds:
  if (!vm.isNewWorld) {
    console.log(vm.world);
    vm.newWorld = vm.world;
    var cannonX = vm.world.start_x, cannonY = vm.world.start_y, bucketX = vm.world.end_x, bucketY = vm.world.end_y;
    var obstacles = vm.world.obstacles;
    setInterval(alterCanvasSaved, 20);
  } else {
    setInterval(alterCanvas, 20);

  }

  vm.showObst = false;

  vm.showObstacle = function() {
    vm.showObst = !vm.showObst;
  };

  function alterCanvasSaved() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(cannonX, cannonY, 40, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(bucketX, bucketY, 30, 30);
    // console.log('before showobst');
    if (vm.showObst) {
      // console.log('in showobst');
      ctx.fillStyle = 'red';
      var x = vm.newObstacle.x, y = vm.newObstacle.y, w = vm.newObstacle.w, h = vm.newObstacle.h;
      ctx.translate(x, y);
      ctx.rotate(vm.newObstacle.a*Math.PI/180);
      ctx.fillRect(-w/2, -h/2, w, h);
      ctx.rotate(-vm.newObstacle.a*Math.PI/180);
      ctx.translate(-x, -y);

    }

    //
    // ctx.fillStyle = 'yellow';
    // ctx.fillRect(vm.newWorld.start_x, vm.newWorld.start_y, 40, 20);
    // ctx.fillStyle = 'green';
    // ctx.fillRect(vm.newWorld.end_x, vm.newWorld.end_y, 30, 30);



    // console.log(vm.newWorld.obstacles);
    for (var i=0; i<obstacles.length; i++) {
      ctx.fillStyle = 'blue';
      var x1 = obstacles[i].x;
      var y1 = obstacles[i].y;
      var h1 = obstacles[i].h;
      var w1 = obstacles[i].w;

      ctx.translate(x1, y1);
      ctx.rotate(obstacles[i].a*Math.PI/180);
      ctx.fillRect(-w1/2, -h1/2, w1, h1);
      ctx.rotate(-obstacles[i].a*Math.PI/180);
      ctx.translate(-x1, -y1);
    }

  }



  //for a NEW WORLD:
  function alterCanvas() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(vm.newWorld.start_x, vm.newWorld.start_y, 40, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(vm.newWorld.end_x, vm.newWorld.end_y, 30, 30);
    // console.log('before showobst');
    if (vm.showObst) {
      // console.log('in showobst');
      ctx.fillStyle = 'red';

      if (vm.newObstacle.type == 'rect') {
        var x = vm.newObstacle.x, y = vm.newObstacle.y, w = vm.newObstacle.w, h = vm.newObstacle.h;
        ctx.translate(x, y);
        ctx.rotate(vm.newObstacle.a*Math.PI/180);
        ctx.fillRect(-w/2, -h/2, w, h);
        ctx.rotate(-vm.newObstacle.a*Math.PI/180);
        ctx.translate(-x, -y);
      } else if (vm.newObstacle.type == 'circle') {
        var xC = vm.newObstacle.x, yC = vm.newObstacle.y, r = vm.newObstacle.h;
        ctx.beginPath();
        ctx.arc(xC, yC, r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
      }

    }

    if (vm.isNewPortal) {
      ctx.fillStyle = 'orange';

      var p1 = vm.newPortal.y1;
      var p2 = vm.newPortal.y2;

      ctx.beginPath();
      ctx.arc(780, p1, 15, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(20, p2, 15, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }

    if (vm.portalExists) {

          var por1 = vm.newPortal.y1;
          var por2 = vm.newPortal.y2;
          ctx.fillStyle = 'purple';
          ctx.beginPath();
          ctx.arc(780, por1, 15, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fill();

          ctx.beginPath();
          ctx.arc(20, por2, 15, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fill();
    }



    // console.log(vm.newWorld.obstacles);
    for (var i=0; i<vm.newWorld.obstacles.length; i++) {
      var x1 = vm.newWorld.obstacles[i].x;
      var y1 = vm.newWorld.obstacles[i].y;
      var h1 = vm.newWorld.obstacles[i].h;
      var w1 = vm.newWorld.obstacles[i].w;

      ctx.fillStyle = 'blue';

      if (vm.newWorld.obstacles[i].type == 'rect') {
        ctx.translate(x1, y1);
        ctx.rotate(vm.newWorld.obstacles[i].a*Math.PI/180);
        ctx.fillRect(-w1/2, -h1/2, w1, h1);
        ctx.rotate(-vm.newWorld.obstacles[i].a*Math.PI/180);
        ctx.translate(-x1, -y1);
      } else if (vm.newWorld.obstacles[i].type == 'circle') {
        ctx.beginPath();
        ctx.arc(x1, y1, h1, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
      }

    }

  }

  // setInterval(alterCanvas, 20);

  vm.titleWorld = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
    .title('Has your world a name?')
    // .textContent('Bowser is a common name.')
    .placeholder('King\'s Keep')
    .ariaLabel('Dog name')
    // .initialValue('Buddy')
    .targetEvent(ev)
    // .required(true)
    .ok('Post World!')
    .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
      // vm.status = 'You decided to name your dog ' + result + '.';
      // console.log(vm.newWorld);
      vm.newWorld.title = result;
      EditService.postEdit(vm.newWorld);
    }, function() {
      // vm.status = 'You didn\'t name your dog.';
    });
  };

  vm.showWorld = function() {
    console.log('clickin new world');
    // doMatterStart();
  };

  vm.saveWorld = function(world) {
    EditService.saveWorld(world);
  };

  vm.addObstacle = function(obstacle) {
    console.log(obstacle);
    vm.newWorld.obstacles.push(obstacle);
    // vm.world.obstacles.push(obstacle);
    vm.showObst = false;

    //reset object to avoid over-data-binding:
    vm.newObstacle = {
      x: 0,
      y: 0,
      h: 10,
      w: 10,
      a: 0,
      type: 'rect'
    };
  };


});
