console.log('js');

$(document).ready(f1);

function f1() {
  console.log('jq');

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  var phi = 1.61803398875;


//   //drawing axes:
//   ctx.moveTo(500,0);
//   ctx.lineTo(500,1000);
//   ctx.stroke();
//
//   ctx.moveTo(0,500);
//   ctx.lineTo(1000, 500);
//   ctx.stroke();
//
// //drawing a circle!
//   ctx.beginPath();
  // ctx.arc(500, 500, 200, 0, 2*Math.PI);
//   ctx.stroke();

  // ctx.moveTo(0,250);
  // ctx.lineTo(1000, 250);
  // ctx.stroke();
  //
  // ctx.moveTo(0,750);
  // ctx.lineTo(1000, 750);
  // ctx.stroke();
  //
  // ctx.moveTo(250, 0);
  // ctx.lineTo(250, 1000);
  // ctx.stroke();
  //
  // ctx.moveTo(750, 0);
  // ctx.lineTo(750, 1000);
  // ctx.stroke();

//this looks fucking dope, though not what i intended:
function drawGrid() {
  for (var i = 1; i < 50; i ++) {
    ctx.moveTo(1000/i, 0);
    ctx.lineTo(1000/i, 1000);
    ctx.stroke();
  }

  for (var k = 1; k < 50; k ++) {
    ctx.moveTo(1000 - 1000/k, 0);
    ctx.lineTo(1000 - 1000/k, 1000);
    ctx.stroke();
  }

  for (var j = 1; j < 41; j ++) {
    ctx.moveTo(0, 25*j);
    ctx.lineTo(1000, 25*j);
    ctx.stroke();
  }
}

// drawGrid();

function goldenRectangle(x) {


  //rectangle's border:
    ctx.moveTo(0,0);
    ctx.lineTo(x, 0);
    ctx.stroke();

    ctx.moveTo(0,0);
    ctx.lineTo(0, x/phi);
    ctx.stroke();

    ctx.moveTo(x,0);
    ctx.lineTo(x, x/phi);
    ctx.stroke();

    ctx.moveTo(0,x/phi);
    ctx.lineTo(x, x/phi);
    ctx.stroke();

//first cuts:
    ctx.moveTo(x/phi,0);
    ctx.lineTo(x/phi, x/phi);
    ctx.stroke();

    ctx.moveTo(x/phi,x/Math.pow(phi, 2));
    ctx.lineTo(x, x/Math.pow(phi, 2));
    ctx.stroke();


//cycle of 4:
    ctx.moveTo(x - x/Math.pow(phi, 3), x/Math.pow(phi, 2));
    ctx.lineTo(x - x/Math.pow(phi, 3), x/phi);
    ctx.stroke();

    ctx.moveTo(x - x/Math.pow(phi, 3), x/phi - x/Math.pow(phi, 4));
    ctx.lineTo(x/phi,x/phi - x/Math.pow(phi,4));
    ctx.stroke();

    ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/phi - x/Math.pow(phi, 4));
    ctx.lineTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2));
    ctx.stroke();

    ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
    ctx.lineTo(x - x/Math.pow(3), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
    ctx.stroke();

    //repeating by hand lol:

    // ctx.moveTo(x - x/Math.pow(phi, 3) - x/Math.pow(phi, 7), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
    // ctx.lineTo(x - x/Math.pow(phi, 3) - x/Math.pow(phi, 7), x/phi - x/Math.pow(phi, 4));
    // ctx.stroke();

    // ctx.moveTo(x - x/Math.pow(phi, 3) - x/Math.pow(phi, 7), x/phi - x/Math.pow(phi, 4) - x/Math.pow(phi, 8));
    // ctx.lineTo(x/phi + x/Math.pow(phi, 5), x/phi - x/Math.pow(phi,4) - x/Math.pow(phi, 8));
    // ctx.stroke();
    //
    // ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/phi - x/Math.pow(phi, 4));
    // ctx.lineTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2));
    // ctx.stroke();
    //
    // ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
    // ctx.lineTo(x - x/Math.pow(3), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
    // ctx.stroke();
    //





//holy shit this is a fair amount harder than i thought. maybe we need to find a "better" pattern??
    for (var i = 0; i < 5; i++) {
      if (i % 4 == 0) {
        var xco = x;
        var yco = 0;
        for (var j = 0; j < i/4 + 1; j++) {
          xco -= x/Math.pow(phi, i+3);
          yco += x/Math.pow(phi, i+2);
        }
        ctx.moveTo(xco, yco);
        // ctx.lineTo(xco, ????);

      } else if (i % 4 == 1) {
        xco1 = x;
        yco1 = x/phi;
        for (var k = 0; k < i/4 + 1; k++) {
          xco1 += x/Math.pow(phi, i+3);

        }

      } else if (i % 4 == 2) {

      } else if (i % 4 == 3) {

      }
    }


  }



  goldenRectangle(850);


      // oh here's a better way to do it: just call the whole function again at the right point!!!

      ctx.translate(850/phi, 850/Math.pow(phi,2));
      // ctx.translate(200,200);
      //drawing a circle!
        // ctx.beginPath();
        // ctx.arc(0, 0, 200, 0, 2*Math.PI);
        // ctx.stroke();

      goldenRectangle(850 - 850/phi - 850/Math.pow(phi,3));




  function colorBox(x, y) {
    // ctx.fillRect(400, 450, 200, 100);
    ctx.fillRect(150*(x-1), 150*(y-1), 150, 150);
  }
//this is amazing:
// colorBox(1, 1);
// colorBox(3, 2);

function randomize() {
  var random1 = Math.floor(Math.random()*4) + 1;
  var random2 = Math.floor(Math.random()*4) + 1;

  colorBox(random1, random2);
}

// setInterval(randomize, 100);





//couldn't get this to work:
  // var grd = ctx.createLinearGradient(0,0,200,0);
  // grd.addColorStop(0, "red");
  // grd.addColorStop(1, "lightBlue");
  ctx.fillStyle = "lightBlue";

  // what? weird!
  // ctx.beginPath();
  // ctx.arc(500, 500, 200, 0, Math.PI/2);
  // ctx.fill();
  //
  // ctx.beginPath();
  // ctx.arc(500, 500, 200, Math.PI/2, 3*Math.PI/2);
  // ctx.fill();


  function colorCircle() {

    //embarrassing how long it took me to figure out we need these inside the function:
    var now = new Date();
    var second = now.getSeconds();

    if (second % 4 == 1) {
      ctx.beginPath();
      ctx.arc(500, 500, 200, Math.PI/2, 3*Math.PI/2);
      ctx.fillStyle = "lightBlue";
      ctx.fill();
    } else if (second % 4 == 3 ){
      ctx.beginPath();
      ctx.arc(500, 500, 200, 3*Math.PI/2, Math.PI/2);
      ctx.fillStyle = "brown";

      ctx.fill();
    } else if (second % 4 == 0) {
      ctx.beginPath();
      ctx.arc(500, 500, 200, Math.PI, 2*Math.PI);
      ctx.fillStyle = "lightGreen";

      ctx.fill();
    } else if (second % 4 == 2){
      ctx.beginPath();
      ctx.arc(500, 500, 200, 0, Math.PI);
      ctx.fillStyle = "lightYellow";

      ctx.fill();
    }
  }

//the magical function:
  // setInterval(colorCircle, 1000);


}
