
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


function drawGameBoard(ctx) {
  ctx.fillStyle = "rgb(220,249,255)";
  ctx.fillRect(0, 0, 540, 540);

  drawGameLines(ctx);

  ctx.fillStyle = "rgb(35,35,35)";
  ctx.font = "45px lighter normal monospace";
  ctx.textBaseline = "hanging";
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      ctx.fillText(j + 1, (j * 60) + 19, (i * 60) + 12);
    }
  }
}

function drawGameLines(ctx) {
  /* Drawing the grid system for Sudoku game board */
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(120,120,120)";
  for (var i = 0; i < 10; i++) {
    if (i != 0 && i != 3 && i != 6 && i != 9) {
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
    }
  }
  ctx.stroke();
  ctx.closePath();

  for (var i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,0)";
    if (i === 0 || i === 9) {
      ctx.lineWidth = 8;
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
      ctx.stroke();
    }
    else if (i === 3 || i === 6) {
      ctx.lineWidth = 4;
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
      ctx.stroke();
    }
    ctx.closePath();
  }
}


// main game loop
var main = function() {
  drawGameBoard(ctx);

  //request agai
  requestAnimationFrame(main);
}

// play game now
main();
