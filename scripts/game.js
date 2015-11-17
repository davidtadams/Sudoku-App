var Game = new SudokuGame();

//Event Handlers
// $(document).bind("keydown", "left", function() { ... });




// main game loop
var main = function() {
  Game.createUserBoard();
  Game.renderBoard();
  Game.getBoard('easy');
  console.log("Does this run?");

}

// play game now
main();

// For debugging
// window.setTimeout(main, 1000);

var FPS = 5;
setInterval(function() {
  // Game.renderBoard();
}, 1000/FPS);
