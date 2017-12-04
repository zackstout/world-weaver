
myApp.controller('EditController', function(UserService, $mdDialog, WorldService, EditService) {
  console.log('IeditController created');
  var vm = this;

  var mouseX, mouseY;
  // document.onmousedown = function(e) {
  //   mouseX = e.pageX;
  //   mouseY = e.pageY;
  //   console.log('page: ', mouseX, mouseY);
  // };

  vm.world = EditService.editingWorld;
  vm.isNewWorld = EditService.isNewWorld;
  // console.log(vm.world, vm.isNewWorld);
  vm.origin = EditService.origin;

  vm.obstacleToEdit = {};

  console.log('origin: ', EditService.origin, 'world: ', EditService.editingWorld);

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

  vm.editingObstacle = false;
  vm.currentlyEditing = false;


  var canvas = document.getElementById('hi');
  console.log(canvas);
  // var rect = canvas.getBoundingClientRect();
  // var bodyRect = document.body.getBoundingClientRect();
  // var offset = rect.top - bodyRect.top;
  // console.log(rect, "offset: ", offset);
  canvas.onmousedown = function(e) {
    var hi = getOffset(canvas);
    mouseX = e.pageX - hi.left;
    mouseY = e.pageY - hi.top;
    // console.log(getOffset(canvas));
    console.log(mouseX, mouseY);
    console.log("obstacles: ", vm.newWorld.obstacles);
  };

  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0,0,800,600);



  vm.showConfirmEdit = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .clickOutsideToClose(true)

    .title('Click the obstacle, weaver.')
    // .textContent('May weaving bring you peace.')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Awesome');
    // .cancel('SAVED WORLD');

    $mdDialog.show(confirm);
  };

  vm.showConfirmEditor = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .clickOutsideToClose(true)

    .title('Now editing your '+ vm.obstacleToEdit.type)
    // .textContent('May weaving bring you peace.')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Awesome');
    // .cancel('SAVED WORLD');

    $mdDialog.show(confirm);
    vm.currentlyEditing = true;
  };

  canvas.onmousedown = function(e) {
    var hi = getOffset(canvas);

    mouseX = e.pageX - hi.left;
    mouseY = e.pageY - hi.top;
    // console.log(getOffset(canvas));
    if (vm.editingObstacle) {
      console.log(mouseX, mouseY);
      for (var i=0; i<vm.newWorld.obstacles.length; i++) {
        var ob = vm.newWorld.obstacles[i];

        if (ob.type == 'rect') {
          if (vm.editingObstacle && (mouseX > ob.x - ob.w/2) && (mouseX < ob.x + ob.w/2) && (mouseY > ob.y - ob.h/2) && (mouseY < ob.y + ob.h/2)) {
            console.log('we got a match, boss: ', ob, i);
            ob.myIndex = i;
            vm.editingObstacle = false;

            vm.obstacleToEdit = ob;
            vm.showConfirmEditor();
            vm.newObstacle = ob;
            vm.showObst = true;


            //not sure why this isn't working but whatever:
            ctx.strokeStyle = 'yellow';
            ctx.translate(ob.x, ob.y);
            ctx.rotate(ob.a*Math.PI/180);
            ctx.rect(-ob.w/2, -ob.h/2, ob.w, ob.h);
            ctx.rotate(-ob.a*Math.PI/180);
            ctx.translate(-ob.x, -ob.y);
          }
        } else if (ob.type == 'circle') {
          var d = Math.pow((Math.pow(mouseY - ob.y, 2) + Math.pow(mouseX - ob.x, 2)), 0.5);
          if (vm.editingObstacle && d < ob.h) {
            console.log('we got a match', ob);
            vm.editingObstacle = false;

            vm.obstacleToEdit = ob;
            vm.showConfirmEditor();
            vm.newObstacle = ob;
            vm.showObst = true;


          }
        }

      }
    }
    // console.log("obstacles: ", vm.newWorld.obstacles);
  };


  vm.editObstacle = function() {
    vm.showConfirmEdit();
    // console.log(mouseX, mouseY);

    vm.editingObstacle = true;



  };

  vm.showPortal = function() {
    vm.isNewPortal = !vm.isNewPortal;
  };

  vm.addPortal = function(portal) {

    vm.newWorld.portals = portal;
    console.log(vm.newWorld);
    vm.isNewPortal = false;
    vm.portalExists = true;

    // var rect = canvas.getBoundingClientRect();
    // console.log(rect);
  };

  // vm.addPortalSaved = function(portal) {
  //   vm.world.portals = portal;
  //   console.log(vm.world);
  //   vm.isNewPortal = false;
  //   vm.portalExists = true;
  // };


//this is it!:
  function getOffset(el) {
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY

    };
  }




  //populate existing world if coming from SavedWorlds:
  if (!vm.isNewWorld) {
    console.log(vm.world);
    //key line:
    vm.newWorld = vm.world;
    console.log(vm.newWorld);
    var cannonX = vm.world.start_x, cannonY = vm.world.start_y, bucketX = vm.world.end_x, bucketY = vm.world.end_y;
    var obstacles = vm.world.obstacles;
    var portals = vm.world.portals;
    setInterval(alterCanvasSaved, 20);
  } else {
    setInterval(alterCanvas, 20);

  }

  vm.showObst = false;

  vm.showObstacle = function() {
    // var rect = canvas.getBoundingClientRect();
    //
    // var bodyRect = document.body.getBoundingClientRect();
    // var offset = rect.top - bodyRect.top;
    // console.log(rect, "offset: ", offset);
    vm.showObst = !vm.showObst;
  };



  function alterCanvasSaved() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, 800, 600);

    //draw cannon and bucket:
    // ctx.fillStyle = 'yellow';
    // ctx.fillRect(cannonX, cannonY, 40, 20);
    // ctx.fillStyle = 'green';
    // ctx.fillRect(bucketX, bucketY, 30, 30);

    ctx.fillStyle = 'yellow';
    ctx.fillRect(vm.newWorld.start_x, vm.newWorld.start_y, 40, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(vm.newWorld.end_x, vm.newWorld.end_y, 30, 30);

    //draw new Obstacles:
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

      // var x = vm.newObstacle.x, y = vm.newObstacle.y, w = vm.newObstacle.w, h = vm.newObstacle.h;
      // ctx.translate(x, y);
      // ctx.rotate(vm.newObstacle.a*Math.PI/180);
      // ctx.fillRect(-w/2, -h/2, w, h);
      // ctx.rotate(-vm.newObstacle.a*Math.PI/180);
      // ctx.translate(-x, -y);
    }

    // Draw obstacles:
    for (var i=0; i<obstacles.length; i++) {
      ctx.fillStyle = 'blue';
      var x1 = obstacles[i].x;
      var y1 = obstacles[i].y;
      var h1 = obstacles[i].h;
      var w1 = obstacles[i].w;

      if (obstacles[i].type == 'rect') {
        ctx.translate(x1, y1);
        ctx.rotate(obstacles[i].a*Math.PI/180);
        ctx.fillRect(-w1/2, -h1/2, w1, h1);
        ctx.rotate(-obstacles[i].a*Math.PI/180);
        ctx.translate(-x1, -y1);
      } else if (obstacles[i].type == 'circle') {
        ctx.beginPath();
        ctx.arc(x1, y1, h1, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
      }
      //
      // ctx.translate(x1, y1);
      // ctx.rotate(obstacles[i].a*Math.PI/180);
      // ctx.fillRect(-w1/2, -h1/2, w1, h1);
      // ctx.rotate(-obstacles[i].a*Math.PI/180);
      // ctx.translate(-x1, -y1);
    }

    //Draw portals:
    if (vm.world.portals) {
      ctx.fillStyle = 'purple';
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.ellipse(780, vm.world.portals.y1, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(20, vm.world.portals.y2, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }

//this or the following conditional are allowing for double portals if the world *starts* with portals:
    if (vm.isNewPortal) {
      ctx.fillStyle = 'orange';
      ctx.strokeStyle = 'yellow';

      var p1 = vm.newPortal.y1;
      var p2 = vm.newPortal.y2;

      // ctx.beginPath();
      // ctx.ellipse(100, 100, 40, 80, 0, 0, 2*Math.PI);
      // ctx.stroke();
      // ctx.fill();

      ctx.beginPath();
      ctx.ellipse(780, p1, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(20, p2, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }

    if (vm.portalExists) {

          var por1 = vm.newPortal.y1;
          var por2 = vm.newPortal.y2;
          ctx.fillStyle = 'purple';
          ctx.strokeStyle = 'blue';
          ctx.beginPath();
          ctx.ellipse(780, por1, 10, 20, 0, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(20, por2, 10, 20, 0, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fill();
    }


  }



  //for a FRESH NEW WORLD:
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
      ctx.strokeStyle = 'yellow';

      var p1 = vm.newPortal.y1;
      var p2 = vm.newPortal.y2;

      // ctx.beginPath();
      // ctx.ellipse(100, 100, 40, 80, 0, 0, 2*Math.PI);
      // ctx.stroke();
      // ctx.fill();

      ctx.beginPath();
      ctx.ellipse(780, p1, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(20, p2, 10, 20, 0, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    }

    if (vm.portalExists) {

          var por1 = vm.newPortal.y1;
          var por2 = vm.newPortal.y2;
          ctx.fillStyle = 'purple';
          ctx.strokeStyle = 'blue';
          ctx.beginPath();
          ctx.ellipse(780, por1, 10, 20, 0, 0, 2*Math.PI);
          ctx.stroke();
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(20, por2, 10, 20, 0, 0, 2*Math.PI);
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
      console.log(vm.newWorld);
      EditService.postEdit(vm.newWorld);
    }, function() {
      // vm.status = 'You didn\'t name your dog.';
    });
  };

  vm.showWorld = function() {
    console.log('clickin new world');
    // doMatterStart();
  };

  vm.showConfirmSave = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
    .clickOutsideToClose(true)

    .title('Well woven! Your world is safe with us.')
    // .textContent('May weaving bring you peace.')
    .ariaLabel('Lucky day')
    .targetEvent(ev)
    .ok('Awesome');
    // .cancel('SAVED WORLD');

    $mdDialog.show(confirm);
  };

  vm.saveWorld = function(world) {
    EditService.saveWorld(world);
    vm.showConfirmSave();

  };

  vm.deleteObstacle = function(ob) {
    console.log(ob, vm.newWorld.obstacles);
    for (var i=0; i<vm.newWorld.obstacles.length; i++) {
      if (vm.newWorld.obstacles[i].id == ob.id) {
        vm.newWorld.obstacles.splice(i, 1);
      }
    }
    console.log(vm.newWorld.obstacles);
  };

  vm.addObstacle = function(obstacle) {
    console.log(obstacle);
    vm.currentlyEditing = false;
    vm.newWorld.obstacles.push(obstacle);
    // vm.world.obstacles.push(obstacle);
    vm.showObst = false;

    // var rect = canvas.getBoundingClientRect();
    // console.log(rect);

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
