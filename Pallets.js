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
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.cherry;
    
    // Set normal drawing scale, and warp state off
    var spriteWidth = this.sprite.width;
    var targetSpriteWidth = g_game.maze.colWidth;
    this._scale = targetSpriteWidth/spriteWidth;


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

    this.numberof0 = this.count0();

};

Pallets.prototype.rememberResets = function () {
    this.reset_pallets = util.getArrayCopy(this._pallets);
};
    
Pallets.prototype.update = function (du) {
    var paccol = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).col;
    var pacrow = util.getMazeCoord(g_game.pacman.cx,g_game.pacman.cy).row;
    
    this.fruit(0.001,3,50,paccol,pacrow);

    if(this._pallets[paccol][pacrow] === 0){
        g_game.increaseScore(10);
        this._pallets[paccol][pacrow] = 9;
        this.numberof0--;
    }
    if(this._pallets[paccol][pacrow] === 2){
        g_game.increaseScore(1);
        g_game.setToFrightenedMode();
        this._pallets[paccol][pacrow] = 9;
    }
    
    this.checkIfWon();
};

Pallets.prototype.fruit = function (probability,n,score,paccol,pacrow) {
    var random = Math.random();
    if(random<probability){
        var nr = 5;
        var randomcol = Math.floor(util.nMeanRandRange(0,this.ncol,nr))
        var randomrow = Math.floor(util.nMeanRandRange(0,this.nrow,nr))
        var mazestate = this._pallets[randomcol][randomrow];
        if(mazestate===0){
            this._pallets[randomcol][randomrow] = n;
            this.numberof0--;
        }
        if(mazestate===9){
            this._pallets[randomcol][randomrow] = n;
        }
    }

    if(this._pallets[paccol][pacrow] === n){
        g_game.increaseScore(score);
        g_game.increaseCherryCount(1);
        if(g_playSound) g_game.eatFruit.play();
        this._pallets[paccol][pacrow] = 9;
    }
}

Pallets.prototype.count0 = function () {
    var nzeros = 0;

    for(var col=0; col<this.ncol; col++) {
        for(var row=0; row<this.nrow; row++) {
            if(this._pallets[col][row] === 0) {
                nzeros++;
            }
        }
    }
    return nzeros;
}


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
                var origScale = this.sprite.scale;

                // pass my scale into the sprite, for drawing
                this.sprite.scale = this._scale;

                this.sprite.drawWrappedCentredAt(
                    ctx, coord.cx, coord.cy, 0
                    );
                this.sprite.scale = origScale;
            }
        }
    }
};

Pallets.prototype.reset = function () {
    this._pallets = util.getArrayCopy(this.reset_pallets);
};

Pallets.prototype.checkIfWon = function () {
    //TODO á eftir að forrita
    var won = this.numberof0 == 0;
    if(won) g_game.gameWon = true;

};