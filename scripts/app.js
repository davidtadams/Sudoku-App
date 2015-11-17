$(document).ready(function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  /* Drawing the grid system for Sudoku game board */
  ctx.beginPath();
  for (var i = 0; i < 10; i++) {
    if (i != 0 && i != 3 && i != 6 && i != 9) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(150,150,150)";
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.stroke();
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
      ctx.stroke();
    }
  }
  ctx.closePath();

  for (var i = 0; i < 10; i++) {
    ctx.beginPath();
    if (i === 0 || i === 9) {
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.stroke();
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
      ctx.stroke();
    }
    else if (i === 3 || i === 6) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgb(0,0,0)";
      ctx.moveTo(0, i * 60);
      ctx.lineTo(540, i * 60);
      ctx.stroke();
      ctx.moveTo(i * 60, 0);
      ctx.lineTo(i * 60, 540);
      ctx.stroke();
    }
    ctx.closePath();
  }

  ctx.font = "50px monospace";
  ctx.textBaseline = "hanging";
  ctx.fillText('1', 15, 10);
  ctx.fillText('2', 75, 10);
  ctx.fillText('3', 135, 10);
  ctx.fillText('4', 15, 70);
  ctx.fillText('5', 75, 70);
  ctx.fillText('6', 135, 70);
  ctx.fillText('7', 15, 130);
  ctx.fillText('8', 75, 130);
  ctx.fillText('9', 135, 130);



});
