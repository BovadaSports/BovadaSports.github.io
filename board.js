//Creates a Board object representing the state of Game Of Life board at a single moment in time
//@param: sidelength int representing how many rows/columns Board should have
//@param: preset int in the set from 0 to 3 representing whether user has chosen to start board at a certain configuration
//@return: Board object

function Board(sidelength, preset) {
    sidelength = sidelength || 16;
    preset = preset || 0;
    var cellSide = 50; //Sidelength of each cell in pixels
    var that = Object.create(Board.prototype);

    //Returns a new blank 2D array with dimensions sidelength by sidelength
    that.getBlankArray = function () {
        return range(sidelength).map(function (i) {
            return range(sidelength).map(function (j) {
                return false;
            });
        });
    }

    var grid = that.getBlankArray(); //2D array representing current state of every cell in game

    //Sets grid to be first hardcoded preset configuration
    if (preset == 1) {
        grid = range(sidelength).map(function (i) {
            return range(sidelength).map(function (j) {
                return i == j || (sidelength - 1 - i) == j;
            });
        });
    }

    //Sets grid to be second hardcoded preset configuration
    if (preset == 2) {
        grid = range(sidelength).map(function (i) {
            return range(sidelength).map(function (j) {
                return (i >= sidelength / 2 - 2 && i <= sidelength / 2) && (j >= sidelength / 2 - 2 && j <= sidelength / 2);
            });
        });
    }

    //Sets grid to be third hardcoded preset configuration
    if (preset == 3) {
        grid = range(sidelength).map(function (i) {
            return range(sidelength).map(function (j) {
                return i == sidelength / 2 - 1;
            });
        });
    }

    //Flips the alive-dead state of a single cell located at row, col
    that.changeSquare = function (row, col) {
        grid[row][col] = !(grid[row][col]);
    }

    //Flips the alive-dead state of a single cell located at pixels x, y in reference to canvas area
    that.changeSquarePixels = function (x, y) {
        var row = ~~(y / cellSide);
        var col = ~~(x / cellSide);
        that.changeSquare(row, col);
    }

    //Counts and returns the neighboring alive squares of a cell located at row, col
    that.countNeighborSquaresAlive = function (row, col) {
        var alive = 0;
        range(3, -1).map(function (i) {
            return range(3, -1).map(function (j) {
                var neighborRow = (16 + row + i) % 16;
                var neighborCol = (16 + col + j) % 16;
                if (i != 0 || j != 0) {
                    if (grid[neighborRow][neighborCol]) {
                        alive++;
                    }
                }
                return;
            });
        });
        return alive;
    }

    //Updates all cells of the current grid to their next states based on their alive/dead neighbors
    //One iteration of the Game of Life
    //Stores new state of game board into grid variable
    that.updateGrid = function () {
        grid = range(sidelength).map(function (i) {
            return range(sidelength).map(function (j) {
                var aliveNeighbors = that.countNeighborSquaresAlive(i, j);
                return (grid[i][j] && (aliveNeighbors == 3 || aliveNeighbors == 2)) || (!grid[i][j] && aliveNeighbors == 3);
            });
        });
    }

    //Returns a deep copy of the current grid
    that.getGrid = function () {
        return grid.map(function(row) {return row.slice();});
    }

    Object.freeze(that);
    return that;
}