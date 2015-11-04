// ==========
// MAZE STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Maze(descr) {

};

Maze.prototype._maze = [
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1]
];

Maze.prototype.nrow = Maze.prototype._maze.length;
Maze.prototype.ncol = Maze.prototype._maze[0].length;
Maze.prototype.colWidth = g_gCanvas.width / Maze.prototype.ncol;
Maze.prototype.colHeight = g_gCanvas.height / Maze.prototype.nrow;
    
Maze.prototype.update = function (du) {

};

Maze.prototype.getValue = function (col, row) {
    return this._maze[col][row];
};

Maze.prototype.render = function (ctx) {
    for(var col=0; col<this.ncol; col++) {
        for(var row=0; row<this.nrow; row++) {
            if(this._maze[col][row] === 1) {
                var coord = util.getCanvasCoord(col, row);
                util.fillBox(ctx, 
                    coord.cx,
                    coord.cy,
                    this.colWidth,
                    this.colHeight,
                    "blue");
            }
        }
    }
};