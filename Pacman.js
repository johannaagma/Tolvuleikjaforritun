// ==========
// PACMAN STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Pacman(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    
    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.pacman;
    
    // Set normal drawing scale, and warp state off
    var spriteWidth = this.sprite.width;
    var targetSpriteWidth = g_maze.colWidth;
    this._scale = targetSpriteWidth/spriteWidth;
};

Pacman.prototype = new Entity();

Pacman.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Pacman.prototype.KEY_UP = keyCode('W');
Pacman.prototype.KEY_DOWN  = keyCode('S');
Pacman.prototype.KEY_LEFT   = keyCode('A');
Pacman.prototype.KEY_RIGHT  = keyCode('D');

// Initial, inheritable, default values
Pacman.prototype.cx = g_gCanvas.width / 2;
Pacman.prototype.cy = g_gCanvas.height / 2;

Pacman.prototype.speed = 150 / SECS_TO_NOMINALS; //2.5
Pacman.prototype.xVel = 0;
Pacman.prototype.yVel = 0;

Pacman.prototype.rotation = 0;
Pacman.prototype.direction = "NONE"; //the current direction your moving in
Pacman.prototype.targetDirection = "NONE"; //the direction you want to move in 
                                           //but can't, at least yet
    
Pacman.prototype.update = function (du) {
    this._updateDirection();
    this._updateVel(du);
    g_pacmancx = this.cx;
    g_pacmancy = this.cy;

    var nextMazeCoord = this._getNextMazeCoord(du, this.xVel, this.yVel, 
        this.direction);
    var nextCol = nextMazeCoord.col;
    var nextRow = nextMazeCoord.row;

    if(g_maze.getValue(nextCol, nextRow) === 0) {
        this._updatePosition(du);
    }
    else {
        //centering the coordinates to the maze's cell's center
        var center = this._getMazeCenterCoord(this.cx, this.cy);
        this.cy = center.cy;
        this.cx = center.cx;
    }

    this.wrapPosition();
};

Pacman.prototype._updateDirection = function () {
    if (keys[this.KEY_RIGHT]) {
        this.targetDirection = "RIGHT";
    } 
    else if (keys[this.KEY_LEFT]) {
        this.targetDirection = "LEFT";
    }
    else if (keys[this.KEY_UP]) {
       this.targetDirection = "UP";
    }
    else if (keys[this.KEY_DOWN]) {
        this.targetDirection = "DOWN";
    }
};

Pacman.prototype._updateVel = function (du) {
    if(this._canGoTargetDirection(du)) {
        this.direction = this.targetDirection;

        var vel = this._computeVel(this.direction);
        this.xVel = vel.xVel;
        this.yVel = vel.yVel;
    }
};

Pacman.prototype._canGoTargetDirection = function (du) {
    var vel = this._computeVel(this.targetDirection);

    //checking whether the next cell is a wall
    var nextMazeCoordWithRadius = this._getNextMazeCoord(du, vel.xVel, vel.yVel, 
        this.targetDirection);
    var nextCol = nextMazeCoordWithRadius.col;
    var nextRow = nextMazeCoordWithRadius.row;
    if(g_maze.getValue(nextCol, nextRow) === 1) {
        return false;
    }

    //checking whether the next move with targetDirection will be 
    //completely outside of the maze (the distance from the maze 
    //will be more than maxError)
    var maxError = this.speed*du*0.5;
    var nextPos = this._computeNextPos(du, vel.xVel, vel.yVel);
    var center = this._getMazeCenterCoord(nextPos.cx, nextPos.cy);
    if((Math.abs(nextPos.cx - center.cx) >= maxError) && 
        (Math.abs(nextPos.cy - center.cy) >= maxError)){
        return false;
    }

    return true;
};

Pacman.prototype._computeVel = function (direction) {
    var xVel = 0;
    var yVel = 0;

    if (direction === "RIGHT") {
        xVel = this.speed;
        yVel = 0;
    } 
    else if (direction === "LEFT") {
        xVel = -this.speed;
        yVel = 0;
    }
    else if (direction === "UP") {
        yVel = -this.speed;
        xVel = 0;
    }
    else if (direction === "DOWN") {
        yVel = this.speed;
        xVel = 0;
    }

    return {xVel : xVel, yVel : yVel};
};

Pacman.prototype._getNextMazeCoord = function (du, xVel, yVel, direction) {
    //computes the next position given xVel, yVel and direction, account for the
    //radius in the "front"
    var nextPos = this._computeNextPos(du, xVel, yVel);
    nextPos = this._addRadiusToFront(nextPos, direction);
    nextPos = util.getWrapPos(nextPos);

    return util.getMazeCoord(nextPos.cx, nextPos.cy);
};

Pacman.prototype._computeNextPos = function (du, xVel, yVel) {
    // s = s + v * t
    var cx = this.cx + xVel*du;
    var cy = this.cy + yVel*du;
    return {cx : cx, cy : cy};
};

Pacman.prototype._addRadiusToFront = function (pos, direction) {
    //this adds the radius of pacman to the "front" of him 
    //(the "front" depends on what direction he is going in)
    var vel = this._computeVel(direction);
    pos.cx = pos.cx + Math.sign(vel.xVel)*this.getRadius();
    pos.cy = pos.cy + Math.sign(vel.yVel)*this.getRadius();
    return pos;
};

Pacman.prototype._getMazeCenterCoord = function (cx, cy) {
    var mazeCoord = util.getMazeCoord(cx, cy);
    var canvasCoord = util.getCanvasCoord(mazeCoord.col, mazeCoord.row);
    return canvasCoord;
};

Pacman.prototype._updatePosition = function (du) {
    var nextPos = this._computeNextPos(du, this.xVel, this.yVel);
    this.cx = nextPos.cx;
    this.cy = nextPos.cy;

    //making sure Pacman is precisely on the maze
    var center = this._getMazeCenterCoord(this.cx, this.cy);
    if(Math.abs(this.cx - center.cx) > Math.abs(this.cy - center.cy)) {
        this.cy = center.cy;
    }
    else {
        this.cx = center.cx;
    }
};

Pacman.prototype.getRadius = function () {
    return this.sprite.width * this._scale / 2;
};

Pacman.prototype.reset = function () {
    this.setPos(this.reset_cx, coord.reset_cy);
};

Pacman.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;

    this.sprite.drawWrappedCentredAt(
	   ctx, this.cx, this.cy, this.rotation
    );

    this.sprite.scale = origScale;
};