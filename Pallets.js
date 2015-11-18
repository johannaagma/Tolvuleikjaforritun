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
    this._pallets = [
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

    this.nrow = this._pallets[0].length;
    this.ncol = this._pallets.length;
    this.colWidth = g_gCanvas.width / this.ncol;
    this.colHeight = g_gCanvas.height / this.nrow;

    this.rememberResets();

};

Pallets.prototype.rememberResets = function () {
    this.reset_pallets = this._pallets;
};
    
Pallets.prototype.update = function (du) {
    var paccol = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).col;
    var pacrow = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).row;
    var random = Math.random();
    if(random<0.01){
        var n = 5;

        var randomcol = Math.floor(util.nMeanRandRange(0,this.ncol,n))
        var randomrow = Math.floor(util.nMeanRandRange(0,this.nrow,n))
        var mazestate = this._pallets[randomcol][randomrow];
        if(mazestate===0 || mazestate===9){
            this._pallets[randomcol][randomrow] = 3;
        }
    }
    if(this._pallets[paccol][pacrow] === 0){
        g_game.increaseScore(10);
        this._pallets[paccol][pacrow] = 9;
    }
    if(this._pallets[paccol][pacrow] === 2){
        g_game.increaseScore(1);
        g_game.setToFrightenedMode();
        this._pallets[paccol][pacrow] = 9;
    }
    if(this._pallets[paccol][pacrow] === 3){
        g_game.increaseScore(50);
        if(g_playSound) g_game.eatFruit.play();
        this._pallets[paccol][pacrow] = 9;
    }

    this.checkIfWon();
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

Pallets.prototype.reset = function () {
    this._pallets = this.reset_pallets;

    //TODO ÞETTA VIRKAR EKKI :(
};

Pallets.prototype.checkIfWon = function () {
    //TODO á eftir að forrita
};