// ==========
// Pallet STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Pallets(descr) {

};

Pallets.prototype._pallets = [
    [1,1,1,1,1,1,1,1,1,1,8,8,8,1,0,1,8,8,8,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,2,0,0,0,0,0,1,9,9,8,1,0,1,8,8,8,1,0,0,0,2,1,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,0,0,0,0,1,1,9,9,9,9,9,9,9,9,9,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,9,1,8,8,8,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,1,1,0,9,9,9,1,8,8,8,1,9,1,1,0,0,0,0,1,1,0,0,0,0,1],
    [1,1,1,1,1,0,1,1,1,1,1,9,1,8,8,8,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,1,1,1,1,0,1,1,1,1,1,9,1,8,8,8,1,9,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,1,0,9,9,9,1,8,8,8,1,9,1,1,0,0,0,0,1,1,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,9,1,8,8,8,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,9,1,1,1,1,1,9,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,0,0,0,1,1,9,9,9,9,9,9,9,9,9,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,1,1,9,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,1,0,1,8,8,8,1,0,1,8,8,8,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,2,0,0,0,0,0,1,8,8,8,1,0,1,8,8,8,1,0,0,0,2,1,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,8,8,8,1,0,1,8,8,8,1,1,1,1,1,1,1,1,1,1,1,1],
];

Pallets.prototype.nrow = Pallets.prototype._pallets[0].length;
Pallets.prototype.ncol = Pallets.prototype._pallets.length;
Pallets.prototype.colWidth = g_gCanvas.width / Pallets.prototype.ncol;
Pallets.prototype.colHeight = g_gCanvas.height / Pallets.prototype.nrow;
    
Pallets.prototype.update = function (du) {
    var paccol = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).col;
    var pacrow = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).row;
    var random = Math.random();
    if(random<0.01){
        var n = 5;

        var randomcol = Math.floor(util.nMeanRandRange(0,this.ncol,n))
        var randomrow = Math.floor(util.nMeanRandRange(0,this.nrow,n))
        console.log(randomcol)
        var mazestate = this._pallets[randomcol][randomrow];
        if(mazestate===0 || mazestate===9){
            this._pallets[randomcol][randomrow] = 3;
        }
    }
    if(this._pallets[paccol][pacrow] === 0){
        g_game.score = g_game.score+10;
        this._pallets[paccol][pacrow] = 9;
    }
    if(this._pallets[paccol][pacrow] === 2){
        g_game.score = g_game.score+1;
        this._pallets[paccol][pacrow] = 9;
    }
    if(this._pallets[paccol][pacrow] === 3){
        g_game.score = g_game.score+50;
        this._pallets[paccol][pacrow] = 9;
    }
};

Pallets.prototype.render = function (ctx) {
      for(var col=0; col<this.ncol; col++) {
        for(var row=0; row<this.nrow; row++) {
            if(this._pallets[col][row] === 0) {
                var coord = util.getCanvasCoord(col, row);
                util.fillCircle(ctx, 
                    coord.cx,
                    coord.cy,
                    2);
            }
            if(this._pallets[col][row] === 2) {
                var coord = util.getCanvasCoord(col, row);
                util.fillCircle(ctx, 
                    coord.cx,
                    coord.cy,
                    5);
            }
            if(this._pallets[col][row] === 3) {
                var coord = util.getCanvasCoord(col, row);
                util.fillBox(ctx, 
                    coord.cx,
                    coord.cy,
                    this.colWidth,
                    this.colHeight,
                    "red");
            }
        }
    }
};
