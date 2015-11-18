/* Class to hold all GameData Object code */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


function SudokuGame() {
  this.userBoard = [],
  this.reqData = null,
  this.ctx = ctx,
  this.count = 0,
  this.selected = {
    x: 4,
    y: 4,
    box: 1,
    value: null,
    user: null
  }
}


SudokuGame.prototype.createUserBoard = function() {
  for (var i = 0; i < 9; i++) {
    var newArray = new Array();
    for (var j = 0; j < 9; j++) {
      newArray.push(null);
    }
    this.userBoard.push(newArray);
  }
};


SudokuGame.prototype.getBoard = function (difficulty) {
  var url = "https://vast-wildwood-2439.herokuapp.com/api/" + difficulty;
  $.getJSON(url, function (data) {
    this.reqData = data;
  }.bind(this));
};


SudokuGame.prototype.drawSelectionBox = function() {
  this.ctx.fillStyle = "rgb(180,255,177)";
  var xCord = this.selected.x * 60;
  var yCord = this.selected.y * 60;
  this.ctx.fillRect(xCord, yCord, 60, 60);
};


SudokuGame.prototype.drawInnerLines = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = 2;
  this.ctx.strokeStyle = "rgb(90,90,90)";
  for (var i = 0; i < 10; i++) {
    if (i != 0 && i != 3 && i != 6 && i != 9) {
      this.ctx.moveTo(0, i * 60);
      this.ctx.lineTo(540, i * 60);
      this.ctx.moveTo(i * 60, 0);
      this.ctx.lineTo(i * 60, 540);
    }
  }
  this.ctx.stroke();
  this.ctx.closePath();
};


SudokuGame.prototype.drawOuterLines = function() {
  for (var i = 0; i < 10; i++) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgb(0,0,0)";
    if (i === 0 || i === 9) {
      this.ctx.lineWidth = 8;
      this.ctx.moveTo(0, i * 60);
      this.ctx.lineTo(540, i * 60);
      this.ctx.moveTo(i * 60, 0);
      this.ctx.lineTo(i * 60, 540);
      this.ctx.stroke();
    }
    else if (i === 3 || i === 6) {
      this.ctx.lineWidth = 4;
      this.ctx.moveTo(0, i * 60);
      this.ctx.lineTo(540, i * 60);
      this.ctx.moveTo(i * 60, 0);
      this.ctx.lineTo(i * 60, 540);
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }
};


SudokuGame.prototype.drawUserNumbers = function() {
  if (this.userBoard.length > 0) {
    this.ctx.fillStyle = "rgb(18,54,161)";
    this.ctx.font = "45px lighter normal monospace";
    this.ctx.textBaseline = "hanging";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.userBoard[i][j] != null) {
          this.ctx.fillText(this.userBoard[i][j], (j * 60) + 19, (i * 60) + 12);
          this.count += 1;
        }
      }
    }
  }
};


SudokuGame.prototype.drawGameNumbers = function() {
  if (this.reqData) {
    this.ctx.fillStyle = "rgb(35,35,35)";
    this.ctx.font = "45px lighter normal monospace";
    this.ctx.textBaseline = "hanging";
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.reqData.board[i][j] != null) {
          this.ctx.fillText(this.reqData.board[i][j], (j * 60) + 19, (i * 60) + 12);
          this.count += 1;
        }
      }
    }
  }
};

SudokuGame.prototype.renderBoard = function() {
  this.ctx.fillStyle = "rgb(255,255,255)";
  this.ctx.fillRect(0, 0, 540, 540);

  this.drawSelectionBox();
  this.drawInnerLines();
  this.drawOuterLines();
  this.drawGameNumbers();
  this.drawUserNumbers();
}

SudokuGame.prototype.updateSelected = function() {
  var userBoardValue = this.userBoard[this.selected.y][this.selected.x];
  var gameBoardValue = this.reqData.board[this.selected.y][this.selected.x];

  if (userBoardValue != null) {
    this.selected.value = userBoardValue;
    this.selected.user = true;
  }
  else {
    this.selected.value = gameBoardValue;
    this.selected.user = false;
  }

  var row;
  var column;

  if (this.selected.x < 3)
    column = 0;
  else if (this.selected.x < 6)
    column = 1;
  else
    column = 2;

  if (this.selected.y < 3)
    row = 1;
  else if (this.selected.y < 6)
    row = 4;
  else
    row = 7;

  this.selected.box = row + column;
}

SudokuGame.prototype.enterNumber = function(number) {
  if (this.reqData.board[this.selected.y][this.selected.x] == null) {
    if (this.userBoard[this.selected.y][this.selected.x] == null) {
      this.userBoard[this.selected.y][this.selected.x] = number;
    }
  }
}
