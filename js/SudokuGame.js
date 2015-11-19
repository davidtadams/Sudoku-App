/* Class to hold all GameData Object code */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


function SudokuGame() {
  this.userBoard = [],
  this.reqData = null,
  this.ctx = ctx,
  this.count = 0,
  this.errorCheck = false,
  this.displayAllErrors = false,
  this.showSolution = false;
  this.finished = false;
  this.difficulty = null,
  this.puzNumber = null,
  this.timer = {
    start: 0,
    seconds: 0,
    pause: false
  },
  this.selected = {
    x: 4,
    y: 4,
    box: 5,
    value: null,
    user: null
  }
}


SudokuGame.prototype.resetGame = function() {
  this.count = 0;
  this.displayAllErrors = false;
  this.showSolution = false;
  this.finished = false;
  this.selected.x = 4;
  this.selected.y = 4;
  this.selected.box = 5;
  this.selected.value = null;
  this.selected.user = null;
};


SudokuGame.prototype.loadDifficulty = function(difficulty) {
  this.setButtonDifficulty(difficulty);
  this.getBoard(difficulty);
  this.resetUserBoard();
  this.resetGame();

  //start timer
  Game.timer.start = Math.floor(Date.parse(new Date()) / 1000);
};

SudokuGame.prototype.setButtonDifficulty = function(difficulty) {
  var easy = $('.easy');
  var medium = $('.medium');
  var hard = $('.hard');

  easy.removeClass("disabled");
  medium.removeClass("disabled");
  hard.removeClass("disabled");

  if (difficulty === 'easy')
    easy.addClass("disabled");
  else if (difficulty === 'medium')
    medium.addClass("disabled");
  else if (difficulty === 'hard')
    hard.addClass("disabled");
};


SudokuGame.prototype.createUserBoard = function() {
  for (var i = 0; i < 9; i++) {
    var newArray = new Array();
    for (var j = 0; j < 9; j++) {
      newArray.push(null);
    }
    this.userBoard.push(newArray);
  }
};


SudokuGame.prototype.resetUserBoard = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      this.userBoard[j][i] = null;
    }
  }
};


SudokuGame.prototype.getBoard = function (difficulty) {
  var url = "https://vast-wildwood-2439.herokuapp.com/api/" + difficulty;
  $.getJSON(url, function (data) {
    this.reqData = data;
    this.puzNumber = data.number;
    this.difficulty = data.difficulty[0].toUpperCase() + data.difficulty.slice(1);
    //update heading for puzzle
    $('.puzzle-header').text('Puzzle: ' + this.difficulty + ' #' + this.puzNumber);
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
  this.checkFinished();
};


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
};


SudokuGame.prototype.enterNumber = function(number) {
  if (this.reqData.board[this.selected.y][this.selected.x] == null) {
    if (this.userBoard[this.selected.y][this.selected.x] == null) {
      this.userBoard[this.selected.y][this.selected.x] = number;
    }
  }
};


SudokuGame.prototype.deleteNumber = function() {
  if (this.reqData.board[this.selected.y][this.selected.x] == null) {
    if (this.userBoard[this.selected.y][this.selected.x] != null) {
      this.userBoard[this.selected.y][this.selected.x] = null;
    }
  }
};


SudokuGame.prototype.updateTimer = function() {
  if (!this.timer.pause) {
    var now = Math.floor(Date.parse(new Date()) / 1000);
    this.timer.seconds = now - this.timer.start;
    var seconds = Math.floor(this.timer.seconds % 60);
    var minutes = Math.floor((this.timer.seconds/60) % 60);

    if (seconds < 10) {
      seconds = String(seconds);
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = String(minutes);
      minutes = '0' + minutes;
    }

    $('.time').text('Timer:  ' + minutes + ':' + seconds);
  }
};


SudokuGame.prototype.toggleTimer = function() {
  if (this.timer.pause) {
    //timer was already paused, need to start again
    var now = Math.floor(Date.parse(new Date()) / 1000);
    this.timer.start = now - this.timer.seconds;
    this.timer.pause = false;
  }
  else {
    //timer is running and needs to be paused
    this.timer.pause = true;
  }
};


SudokuGame.prototype.resetBoard = function() {
  this.resetUserBoard();
  this.timer.start = Math.floor(Date.parse(new Date()) / 1000);
  this.timer.seconds = 0;
  this.showSolution = false;
  this.finished = false;
};


SudokuGame.prototype.viewSolution = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (this.reqData.board[i][j] == null) {
        this.userBoard[i][j] = this.reqData.solution[i][j];
      }
    }
  }
  this.showMessage('solution');
  this.showSolution = true;
};


SudokuGame.prototype.checkFinished = function() {
  if (this.count >= 81 && !this.showSolution && !this.finished) {
    this.checkSolution();
    if (this.checkSolution()) {
      this.showMessage('finished');
      this.finished = true;
      this.toggleTimer();
    }
    else {
      this.displayAllErrors = true;
      this.showMessage('error');
    }
  }

  this.count = 0;
};


SudokuGame.prototype.checkSolution = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 0; j++) {
      if (this.userBoard[i][j] != this.reqData.solution[i][j]) {
        return false;
      }
    }
  }
  return true;
};


SudokuGame.prototype.showMessage = function(status) {
  var message = "";
  var alertType = "";
  var html = "";

  if (status === "solution") {
    alertType = "warning";
    message = "Since you chose to view the solution, you can keep playing " +
          "the game, but it will not register as being successfully solved.";
  }
  else if (status === "finished") {
    alertType = "success";
    message = "Congratulations! You solved the puzzle! Now pick another " +
          "one and play again.";
  }
  else if (status === "error") {
    alertType = "alert";
    message = "Oops. There are errors in your answer. You can see what " +
      "cells are wrong below.";
  }

  if (message != "" && alertType != "") {
    html = '<div data-alert class="alert-box radius ' + alertType + '">';
    html += message;
    html += '<a href="#" class="close">&times;</a>';
    html += '</div>';

    $('.message').empty();
    $('.message').append(html);
    $(document).foundation('alert', 'reflow');
  }
};


SudokuGame.prototype.highlightErrors = function() {


};

/* DOM EVENT LISTENERS */
$('.easy').click(function() {
  Game.loadDifficulty('easy');
});

$('.medium').click(function() {
  Game.loadDifficulty('medium');
});

$('.hard').click(function() {
  Game.loadDifficulty('hard');
});

$('.time').click(function() {
  Game.toggleTimer();
});

$('.reset-game').click(function() {
  Game.resetBoard();
});

$('.view-solution').click(function() {
  Game.viewSolution();
});
