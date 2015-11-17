var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var gameData = {};

$.getJSON("https://vast-wildwood-2439.herokuapp.com/api/easy", function (data) {
  gameData['reqData'] = data;
});

function boardSetup() {
  gameData['selected'] = {
    x: 0,
    y: 0,
    value: 0
  };

  gameData['userBoard'] = [];
  for (var i = 0; i < 9; i++) {
    var newArray = new Array();
    for (var j = 0; j < 9; j++) {
      newArray.push(null);
    }
    gameData.userBoard.push(newArray);
  }
}

function drawGameLines(ctx) {
  /* Drawing the grid system for Sudoku game board */
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(90,90,90)";
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

function drawGameNumbers(ctx) {
  if (gameData.reqData) {
    ctx.fillStyle = "rgb(35,35,35)";
    ctx.font = "45px lighter normal monospace";
    ctx.textBaseline = "hanging";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (gameData.reqData.board[i][j] != null) {
          ctx.fillText(gameData.reqData.board[i][j], (j * 60) + 19, (i * 60) + 12);
        }
      }
    }
  }
}

function drawUserNumbers(ctx) {
  if (gameData.userBoard) {
    ctx.fillStyle = "rgb(18,54,161)";
    ctx.font = "45px lighter normal monospace";
    ctx.textBaseline = "hanging";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (gameData.userBoard[i][j] != null) {
          ctx.fillText(gameData.userBoard[i][j], (j * 60) + 19, (i * 60) + 12);
        }
      }
    }
  }
}

function renderBoard(ctx) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(0, 0, 540, 540);

  drawGameLines(ctx);
  drawGameNumbers(ctx);
  drawUserNumbers(ctx);
}

// main game loop
var main = function() {
  boardSetup();
  renderBoard(ctx);

  //request animation frame repeatedly
  // requestAnimationFrame(main);
}

// play game now
main();

// For debugging
window.setTimeout(main, 1000);
