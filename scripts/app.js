var Game = new SudokuGame();

// main game loop
var main = function() {
  Game.createUserBoard();
  Game.renderBoard();
  Game.getBoard('easy');


}

// play game now
main();

// For debugging
// window.setTimeout(main, 1000);
