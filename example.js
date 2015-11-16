$(document).ready(function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  for (var i=0;i<6;i++){
    for (var j=0;j<6;j++){
      ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' +
                       Math.floor(255-42.5*j) + ',0)';
      ctx.fillRect(j*25,i*25,25,25);
    }
  }

  for (var i=0;i<6;i++){
    for (var j=0;j<6;j++){
      ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                       Math.floor(255-42.5*j) + ')';
      ctx.beginPath();
      ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect (10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect (30, 30, 55, 50);

  ctx.fillRect(25,25,100,100);
  ctx.clearRect(45,45,60,60);
  ctx.strokeRect(50,50,50,50);
});
