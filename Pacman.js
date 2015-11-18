// ============
// PACMAN STUFF
// ============

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
    var targetSpriteWidth = g_game.maze.cellWidth;
    this._scale = targetSpriteWidth/spriteWidth;
    this._spriteScale = this._scale;
};

Pacman.prototype = new MovingObject();

// Initial, inheritable, default values
Pacman.prototype.speed = 90 / SECS_TO_NOMINALS;
Pacman.prototype.isMoving = false;


Pacman.prototype.KEY_UP = keyCode('W');
Pacman.prototype.KEY_DOWN  = keyCode('S');
Pacman.prototype.KEY_LEFT   = keyCode('A');
Pacman.prototype.KEY_RIGHT  = keyCode('D');
    
Pacman.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Pacman.prototype.update = function (du) {
    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }

    spatialManager.unregister(this);

    this._updateVel(du);

    this._updatePosition(du);

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takePacmanHit;
        if(canTakeHit) canTakeHit.call(hitEntity, this); 
    }

    spatialManager.register(this);
};

//warp stuff
//==========

Pacman.prototype.warp = function () {
    g_game.loseLife();
    g_game.stopAllSounds();
    if(g_playSound) g_game.death.play();
    this._isWarping = true;
    this._scaleDirn = -1;
    spatialManager.unregister(this);
    g_game.toggleUpdateGhosts();
};

Pacman.prototype._updateWarp = function (du) {
    this.isWarping = true;
    this.isMoving =false;
    var SHRINK_RATE = 0.8 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this._scale/this._spriteScale < 0.2) {
        this._moveToASafePlace();
        this._scaleDirn = 1;
        
    } 
    else if (this._scale/this._spriteScale > 1) {
        this._scale = this._spriteScale;
        this._isWarping = false;
        spatialManager.register(this);

        g_game.toggleUpdateGhosts();
        g_game.resetLevel();
    }
};

Pacman.prototype._moveToASafePlace = function () {
    this.reset();
};

//regular update stuff
//====================

Pacman.prototype._updateVel = function (du) {
    this._updateTargetDirection();

    if(this._canGoTargetDirection(du)) {
        this.direction = this.targetDirection;

        this._updateVelocityByDirection();
    }
};

Pacman.prototype._updatePosition = function (du) {
    var nextMazeValue = this._getNextMazeValue(du, this.direction);
    if(!this.isWall(nextMazeValue)) {
        var nextPos = this._getNextPosition(du);

        this.cx = nextPos.cx;
        this.cy = nextPos.cy;

        this.isMoving = true;
        this.isWarping = false;
    }
    else {
        //centering the coordinates to the maze's cell's center
        var center = this._getMazeCenterCoord(this.cx, this.cy);
        this.cy = center.cy;
        this.cx = center.cx;

        this.isMoving = false;
    }

    this.wrapPosition();
};

Pacman.prototype._updateTargetDirection = function () {
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

Pacman.prototype._getNonWallCellTypes = function () {    
    var nonWallCellTypes = [g_game.maze.PATH];
    return nonWallCellTypes;
};

//collision stuff
//===============

Pacman.prototype.takePacmanHit = function (pacman) {};

Pacman.prototype.takeGhostHit = function (ghost) {
    if(ghost.ghostMode === g_game.FRIGHTENED) ghost.goToBox();
    else if(ghost.ghostMode !== g_game.GOTOBOX) this.warp();
};

//other stuff
//===========

Pacman.prototype.getRadius = function () {
    return this.sprite.width * this._scale / 2;
};

Pacman.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.direction = "NONE";
    this.targetDirection = "NONE";
    this._updateVelocityByDirection();
};

Pacman.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;

    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale*2;

    this.rotation = consts.rotations[this.direction];
    
    this.sprite.render(
	   ctx, this.cx, this.cy, this.rotation
    );

    this.sprite.scale = origScale;
};