//Script for drawing current grid state onto the canvas and for handling user click events
//Also maintains whether game is running or paused

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var sidelength = 16; //Dimension of grid board
var cellside = 50; //Dimension of single cell in grid in pixels

var board = Board(sidelength); //Creates a new Board object at the blank configuration
var game = false; //Sets initial game state to paused

document.getElementById("start-button").addEventListener("click", function () { game = true; }); //Click handler to set game state to running when user clicks Start
document.getElementById("stop-button").addEventListener("click", function () { game = false; }); //Click handler to set game state to paused when user clicks Stop
document.getElementById("reset-button").addEventListener("click", function () { board = Board(); }); //Click handler to reset game board when user clicks Reset
document.getElementById("preset1-button").addEventListener("click", function () { board = Board(16, 1) }); //Click handler to set board to first preset configuration
document.getElementById("preset2-button").addEventListener("click", function () { board = Board(16, 2) }); //Click handler to set board to second preset configuration
document.getElementById("preset3-button").addEventListener("click", function () { board = Board(16, 3) }); //Click handler to set board to third preset configuration
canvas.addEventListener("click", getUserClickOnBoard); //CLick handler for when user clicks on canvas object

//Allows user to modify game board when game is in paused state by clicking on which cell in canvas to change from alive/dead to dead/alive
function getUserClickOnBoard(e) {
    if (!game) {
        var boundary = canvas.getBoundingClientRect();
        board.changeSquarePixels(e.clientX - boundary.left, e.clientY - boundary.top);
    }
}

//Draws grid with dimensions sidelength by sidelength onto canvas
function drawBoard() {
    var height = cellside * sidelength;
    var width = cellside * sidelength;
    from_to(0, height, cellside, function (i) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, width);
        ctx.moveTo(0, i);
        ctx.lineTo(height, i);
    });
    ctx.strokeStyle = "black";
    ctx.stroke();
}

//Draws current game state onto canvas
//Fills alive squares with black fill
//Dead squares are unfilled
function drawCells() {
    currentGrid = board.getGrid();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    ctx.beginPath();
    from_to(0, sidelength, 1, function (row) {
        from_to(0, sidelength, 1, function (col) {
            if (currentGrid[row][col]) {
                ctx.rect(cellside * col, cellside * row, cellside, cellside);
            }
        });
    });
    ctx.fillStyle = 'black';
    ctx.fill();
}

//Starts the game and calls board.updateGrid() to update game state
function playGame() {
    if (game) {
        board.updateGrid();
    }
}

var drawIntervalID = setInterval("drawCells()", 100); //Draws game state every 100ms
var gameIntervalID = setInterval("playGame()", 1000); //Updates game state to next iteration in Game of Life every 1000ms