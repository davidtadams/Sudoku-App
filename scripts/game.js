var Game = new SudokuGame();

//Event Handlers
$(document).bind("keydown", "up down left right space", function(event) {
  event.preventDefault();
});

$(document).bind("keydown", "left", function() {
  if (Game.selected.x > 0) {
    Game.selected.x -= 1;
    Game.updateSelected();
  }
});

$(document).bind("keydown", "right", function() {
  if (Game.selected.x < 8) {
    Game.selected.x += 1;
    Game.updateSelected();
  }
});

$(document).bind("keydown", "up", function() {
  if (Game.selected.y > 0) {
    Game.selected.y -= 1;
    Game.updateSelected();
  }
});

$(document).bind("keydown", "down", function() {
  if (Game.selected.y < 8) {
    Game.selected.y += 1;
    Game.updateSelected();
  }
});

$(document).bind("keydown", "1 2 3 4 5 6 7 8 9", function(event) {
  Game.enterNumber(String.fromCharCode(event.which || event.keycode));
});

$(document).bind("keydown", "backspace esc del 0 space", function(event) {
  event.preventDefault();
  Game.deleteNumber();
});

$('#canvas').click(function(e) {
  Game.selected.x = Math.floor(e.offsetX / 60);
  Game.selected.y = Math.floor(e.offsetY / 60);
  Game.updateSelected();
})

// main game loop
var main = function() {
  Game.createUserBoard();
  Game.renderBoard();
  Game.getBoard('easy');
}

// play game now
main();

// For debugging
// window.setTimeout(main, 500);

var FPS = 30;
setInterval(function() {
  Game.renderBoard();
}, 1000/FPS);
