// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {


// RANGES
// ======

clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
	value += (highBound - lowBound);
    }
    while (value > highBound) {
	value -= (highBound - lowBound);
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},

getWrapPos: function(pos) {
    pos.cx = this.wrapRange(pos.cx, 0, g_canvas.width);
    pos.cy = this.wrapRange(pos.cy, 0, g_canvas.height);
    return pos;
},

isBetweenPoints: function(x,y, x1,y1, x2,y2) {
    var lowX = Math.min(x1,x2);
    var highX = Math.max(x1,x2);

    var lowY = Math.min(y1,y2);
    var highY = Math.max(y1,y2);

    return this.isBetween(x, lowX, highX) && this.isBetween(y, lowY, highY);
},


// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},

chooseRandomFromArray : function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
},

nMeanRandRange: function(min, max,n) {
    var random = 0;
    for(var i = 0; i < n; i++){
            var random = util.randRange(min,max)+random;
        }
    return random/n;
},


// MISC
// ====

square: function(x) {
    return x*x;
},


// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1);
    var dy = Math.abs(y2-y1);

    if (dx > xWrap/2) {
	   dx = xWrap - dx;
    }
    if (dy > yWrap/2) {
	   dy = yWrap - dy;
    }
    
    return this.square(dx) + this.square(dy);
},


// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = oldStyle;
},

fillBox: function (ctx, cx, cy, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;

    ctx.fillRect(cx-w/2, cy-h/2, w, h);
    
    ctx.fillStyle = oldStyle;
},


// MAZE CALCULATIONS
// =================

getCanvasCoord : function(col, row) {
    var cx = (col*g_game.maze.cellWidth+(col+1)*g_game.maze.cellWidth)/2;
    var cy = (row*g_game.maze.cellHeight+(row+1)*g_game.maze.cellHeight)/2;
    return {cx : cx, cy : cy};
},

getMazeCoord : function(cx, cy) {
    var col = Math.floor(cx/g_game.maze.cellWidth);
    var row = Math.floor(cy/g_game.maze.cellHeight);
    return {col : col, row : row};
},


// ARRAY STUFF
// ===========

getArrayCopy : function(arr) {
    var copy;

    if(Array.isArray(arr)) {
        copy = arr.slice(0);

        for(var i = 0; i < copy.length; i++) {
            copy[ i ] = this.getArrayCopy(copy[i]);
        }

        return copy;
    } else {
        return arr;
    }
},

// TIME STUFF
// ==========

getNominalTime : function(sec) {
    return sec*1000/NOMINAL_UPDATE_INTERVAL;
},

// PACMAN POSITION STUFF
// =====================

getNextPacmanPosition : function(pacmanPos, sign, nSteps) {
    var pacmanMazeCoord = this.getMazeCoord(pacmanPos.posX, pacmanPos.posY);
    
    var targetCol = pacmanMazeCoord.col + sign.xSign*nSteps;
    var targetRow = pacmanMazeCoord.row + sign.ySign*nSteps;

    var nextPos = util.getCanvasCoord(targetCol, targetRow); 

    return nextPos;
},

};