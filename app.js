$(document).ready(function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

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





});
