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
    // this._maze = this.addOtherHalf(this._maze);
    // this._maze = this.transpose(this._maze);

    this.nrow = this._maze[0].length;
    this.ncol = this._maze.length;
    this.cellWidth = g_gCanvas.width / this.ncol;
    this.cellHeight = g_gCanvas.height / this.nrow;

    this.sprite1 = this.sprite1 || g_sprites.tile01;
    this.sprite2 = this.sprite2 || g_sprites.tile02;
    this.sprite3 = this.sprite3 || g_sprites.tile03;
    this.sprite4 = this.sprite4 || g_sprites.tile04;
    this.sprite5 = this.sprite5 || g_sprites.tile05;
    this.sprite6 = this.sprite6 || g_sprites.tile06;
    this.sprite7 = this.sprite7 || g_sprites.tile07;
    this.sprite8 = this.sprite8 || g_sprites.tile08;
    this.sprite9 = this.sprite9 || g_sprites.tile09;
    this.sprite10 = this.sprite10 || g_sprites.tile10;
    this.sprite11 = this.sprite11 || g_sprites.tile11;
    this.sprite12 = this.sprite12 || g_sprites.tile12;
    this.sprite13 = this.sprite13 || g_sprites.tile13;
    this.sprite14 = this.sprite14 || g_sprites.tile14;
    this.sprite15 = this.sprite15 || g_sprites.tile15;
    this.sprite16 = this.sprite16 || g_sprites.tile16;
    this.sprite17 = this.sprite17 || g_sprites.tile17;
    this.sprite18 = this.sprite18 || g_sprites.tile18;
    this.sprite19 = this.sprite19 || g_sprites.tile19;
    this.sprite20 = this.sprite20 || g_sprites.tile20;
    this.sprite21 = this.sprite21 || g_sprites.tile21;
    this.sprite22 = this.sprite22 || g_sprites.tile22;
    this.sprite23 = this.sprite23 || g_sprites.tile23;
    this.sprite24 = this.sprite24 || g_sprites.tile24;
    this.sprite25 = this.sprite25 || g_sprites.tile25;
    this.sprite26 = this.sprite26 || g_sprites.tile26;
    this.sprite27 = this.sprite27 || g_sprites.tile27;
    this.sprite28 = this.sprite28 || g_sprites.tile28;
    this.sprite29 = this.sprite29 || g_sprites.tile29;
    this.sprite30 = this.sprite30 || g_sprites.tile30;
    this.sprite31 = this.sprite31 || g_sprites.tile31;
    this.sprite32 = this.sprite32 || g_sprites.tile32;
    this.sprite33 = this.sprite33 || g_sprites.tile33;
    this.sprite34 = this.sprite34 || g_sprites.tile34;
    this.sprite35 = this.sprite35 || g_sprites.tile35;
    this.sprite36 = this.sprite36 || g_sprites.tile36;
    this.sprite37 = this.sprite37 || g_sprites.tile37;
};

Maze.prototype._maze = [
    [1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
    ["t",0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
    ["t",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,"o","b","b",1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    ["t",0,1,1,1,0,"p","n",1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    ["t",0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1],
    ["k","b","b","b","a",0,1,1,1,1,1,0,-1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    ["l","n","n","n","s",0,1,1,1,1,1,0,-1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    ["t",0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    ["t",0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1],
    ["t",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,1],
    ["t",0,1,1,1,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],
    ["t",0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1],
];

// explains values in the maze
Maze.prototype.WALL = 1;
Maze.prototype.PATH = 0;
Maze.prototype.DOOR = -1;

    
Maze.prototype.update = function (du) {

};

Maze.prototype.getValue = function (col, row) {
    return this._maze[col][row];
};

Maze.prototype.render = function (ctx) {
    for(var col=0; col<this.ncol; col++) {
        for(var row=0; row<this.nrow; row++) {
            if(this._maze[col][row] !== 0) {
                var coord = util.getCanvasCoord(col, row);
                util.fillBox(ctx, 
                    coord.cx,
                    coord.cy,
                    this.cellWidth/2,
                    this.cellHeight/2,
                    "blue");
            }
            if((this._maze[col][row] != 1) && (this._maze[col][row] != 0)){
                var character = this._maze[col][row];
                var coord = util.getCanvasCoord(col, row);
                // if(character.localeCompare("q") === 0) this.spriteq.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "q") this.sprite1.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "w") this.sprite2.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "e") this.sprite3.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "r") this.sprite4.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "t") this.sprite5.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "y") this.sprite6.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "u") this.sprite7.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "i") this.sprite8.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "o") this.sprite9.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "p") this.sprite10.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "a") this.sprite11.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "s") this.sprite12.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "d") this.sprite13.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "f") this.sprite14.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "g") this.sprite15.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "h") this.sprite16.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "j") this.sprite17.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "k") this.sprite18.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "l") this.sprite19.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "z") this.sprite20.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "x") this.sprite21.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "c") this.sprite22.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "v") this.sprite23.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "b") this.sprite24.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "n") this.sprite25.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "m") this.sprite26.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "1") this.sprite27.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "2") this.sprite28.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "3") this.sprite29.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "4") this.sprite30.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "5") this.sprite31.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "6") this.sprite32.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "7") this.sprite33.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "8") this.sprite34.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "9") this.sprite35.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "10") this.sprite36.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
                if(character === "11") this.sprite37.drawWrappedCentredAt(ctx, coord.cx, coord.cy, 0);
            }
        }
    }
};

// Maze.prototype.addOtherHalf = function (array) {
//     for(var i = 0; i < array.length; i++) {
//         var reverse = array[i].slice().reverse();
//         array[i] = array[i].concat(reverse);
//     }
//     return array;
// }

// Maze.prototype.transpose = function (array) {
//     var array = array[0].map(function(col, i) { 
//       return array.map(function(row) { 
//         return row[i] 
//       })
//     });

//     return array;
// }