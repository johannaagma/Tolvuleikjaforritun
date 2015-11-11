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
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,2,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,2,1,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,2,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1]
];

Pallets.prototype.nrow = Pallets.prototype._pallets.length;
Pallets.prototype.ncol = Pallets.prototype._pallets[0].length;
Pallets.prototype.colWidth = g_gCanvas.width / Pallets.prototype.ncol;
Pallets.prototype.colHeight = g_gCanvas.height / Pallets.prototype.nrow;
    
Pallets.prototype.update = function (du) {
    var pacrow = util.getMazeCoord(g_pacmancx,g_pacmancy).row;
    var paccol = util.getMazeCoord(g_pacmancx,g_pacmancy).col;
    if(this._pallets[paccol][pacrow] === 0){
        this._pallets[paccol][pacrow] = 1;
    }
    if(this._pallets[paccol][pacrow] === 2){
        this._pallets[paccol][pacrow] = 1;
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
                    5);
            }
            if(this._pallets[col][row] === 2) {
                var coord = util.getCanvasCoord(col, row);
                util.fillCircle(ctx, 
                    coord.cx,
                    coord.cy,
                    10);
            }
        }
    }
};
