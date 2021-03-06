// ===========
// GHOST STUFF
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Ghost(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    
    //setting the direction to either up or down
    this.direction = this._getRandomVerticalDirection();
    this._updateVelocityByDirection();

    //converting seconds into nominal time units
    this.boxSpan = this.boxSeconds*1000 / NOMINAL_UPDATE_INTERVAL;

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.blinky;
    
    // Set normal drawing scale, and warp state off
    var spriteWidth = this.sprite.width;
    var targetSpriteWidth = g_game.maze.cellWidth;
    this.scale = targetSpriteWidth/spriteWidth;

    this.ghostMode = g_game.ghostMode;
};

Ghost.prototype = new MovingObject();

// Initial, inheritable, default values
Ghost.prototype.speed = 80 / SECS_TO_NOMINALS;
Ghost.prototype.regularSpeed = 80 / SECS_TO_NOMINALS;
Ghost.prototype.slowSpeed = 50 / SECS_TO_NOMINALS;
Ghost.prototype.fastSpeed = 150 / SECS_TO_NOMINALS;

//ghost box stuff
Ghost.prototype.boxSeconds = 5;
Ghost.prototype.canLeaveBox = false;
Ghost.prototype.canGoToCenter = false;
Ghost.prototype.canGoUp = false;
Ghost.prototype.isWarping =false;
//ghost mode stuff
Ghost.prototype.ghostMode = 1;
//target tile coordinate
Ghost.prototype.targetDir = {posX: 0, posY: 0};
//target tile coordinate for when the ghost is in scatter mode
Ghost.prototype.scatterTarget = {posX: 0, posY: 0};
    
Ghost.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
    this.reset_direction = this.direction;
    this.reset_boxSpan = this.boxSpan;
};

Ghost.prototype.update = function (du) {
    spatialManager.unregister(this);

    //todo þetta á að vera háð pallettes (og í g_game)
    this.boxSpan -= du;
    if((this.boxSpan < 0) && !this.canLeaveBox) {
        this.canLeaveBox = true;

        this.canGoToCenter = true;
        if(this.cx >= g_gCanvas.width/2) this.direction = "LEFT";
        else this.direction = "RIGHT";
        this._updateVelocityByDirection();
    }

    if(this.canLeaveBox) {
        if(this.canGoToCenter) this._goToCenter(du);
        else if(this.canGoUp) this._goUp(du);
        else this._update(du);
    }
    else {
        //go up and down
        this._moveInsideBox(du);
    }

    if(this.ghostMode !== g_game.GOTOBOX) {
        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            var canTakeHit = hitEntity.takeGhostHit;
            if(canTakeHit) canTakeHit.call(hitEntity, this); 
        }
    }

    spatialManager.register(this);
};

//ghost box movement stuff
//========================

Ghost.prototype._moveInsideBox = function (du) {
    var nextMazeValue = this._getNextMazeValue(du, this.direction);
    if(this.isWall(nextMazeValue)) {
        this.direction = this._getOppisiteDirection();
        this._updateVelocityByDirection();
    }

    this._updatePositionByVelocity(du);
};

Ghost.prototype._goToCenter = function (du) {
    var nextPos = this._computeNextPos(du, this.xVel, this.yVel);

    if((nextPos.cx >= g_gCanvas.width/2) && (this.direction === "RIGHT") ||
        (nextPos.cx <= g_gCanvas.width/2) && (this.direction === "LEFT")) {
        this.cx = g_gCanvas.width/2;
        this.canGoToCenter = false; 

        this.canGoUp = true;
        this.direction = "UP";
        this._updateVelocityByDirection();
    }
    else {
        this._updatePositionByVelocity(du);
    }
};

Ghost.prototype._goUp = function (du) {
    var nextMazeValue = this._getNextMazeValue(du, this.direction);
    if(this.isWall(nextMazeValue)) {
        this.canGoUp = false;
        this.direction = "LEFT";
        this._updateVelocityByDirection();
    }
    else {
        this._updatePositionByVelocity(du);
    }
};

//regular update stuff
//====================

Ghost.prototype._update = function (du) {
    if(this.ghostMode === g_game.CHASE) {
        this.speed = this.regularSpeed;
        this._setTargetDirectionsToPacman(du);
    }
    else if(this.ghostMode === g_game.SCATTER) {
        this.speed = this.regularSpeed;
        this._setTargetDirectionToScatterTarget(du);
    }
    else if(this.ghostMode === g_game.FRIGHTENED) {
        this.speed = this.slowSpeed;
        this._setRandomTargetDirection();
    }

    else if(this.ghostMode === g_game.GOTOBOX) {
        this.speed = this.fastSpeed;
        this._setTargetDirectionsToGhostBox(du);
        return;
    }

    this._updateVel(du);
    this._updatePosition(du);
};

Ghost.prototype._updateVel = function (du) {
    if(this._canGoTargetDirection(du)) {
        this.direction = this.targetDirection;

        this._updateVelocityByDirection();
    }
};

Ghost.prototype._updatePosition = function (du) {
    var nextMazeCoord = this._getNextMazeCoord(du, this.direction);
    var nextCol = nextMazeCoord.col;
    var nextRow = nextMazeCoord.row;

    var nextValue = g_game.maze.getValue(nextCol, nextRow);
    if(!this.isWall(nextValue) && this.directions !== "NONE") {
        var nextPos = this._getNextPosition(du);
        this.cx = nextPos.cx;
        this.cy = nextPos.cy;
    }
    else {
        //centering the coordinates to the maze's cell's center
        var center = this._getMazeCenterCoord(this.cx, this.cy);
        this.cy = center.cy;
        this.cx = center.cx;

        //changing the direction so the ghost won't be stuck
        var directions = this._getPerpendicularDirections();
        this.targetDirection = util.chooseRandomFromArray(directions);
    }

    this.wrapPosition();
};

//sets the target direction to any random direction EXCEPT the opposite one
Ghost.prototype._setRandomTargetDirection = function () {
    var directions = this._getPossibleDirections();
    this.targetDirection = util.chooseRandomFromArray(directions);
};

Ghost.prototype._setTargetDirectionToScatterTarget = function (du) {
    var target = this.scatterTarget;
    this.targetDir = {posX: target.posX, posY: target.posY};
    this._setTargetDirectionsToTarget(this.targetDir, du);
};

Ghost.prototype._setTargetDirectionsToPacman = function (du) {    
    this._updateTargetDir();
    this._setTargetDirectionsToTarget(this.targetDir, du);
};

Ghost.prototype._setTargetDirectionsToGhostBox = function (du) {    
    var target = {posX: this.reset_cx, posY: this.reset_cy};
    this._setTargetDirectionsToTarget(target, du);

    this._updateVel(du);
    this._updatePosition(du);

    //approximating the position (so it will be exacly on the targetPos)
    var dir = this.direction;
    var opDir = this._getOppisiteDirection();

    var nextPos = this._computeNextPosByDir(du, dir);
    var prevPos = this._computeNextPosByDir(du, opDir);

    if(util.isBetweenPoints(target.posX, target.posY, 
        nextPos.cx, nextPos.cy, 
        prevPos.cx, prevPos.cy)) {
        this.reset();
    }
};

Ghost.prototype._setTargetDirectionsToTarget = function (target, du) {
    var directions = this._getAvailableDirections(du);

    var bestDirection = "NONE";
    var minDistSq = Number.MAX_VALUE;

    for(var i = 0; i < directions.length; i++) {
        var nextPos = this._computeNextPosByDir(du, directions[i]);
        var distSq = util.distSq(target.posX, target.posY, 
            nextPos.cx, nextPos.cy,
            g_gCanvas.width, g_gCanvas.height);
        if(distSq < minDistSq) {
            minDistSq = distSq;
            bestDirection = directions[i];
        }
    }

    this.targetDirection = bestDirection;
};

//AI ghost stuff
//==============

Ghost.prototype._updateTargetDir = function() {
    switch (this.name) {
        case "blinky": this._selectTargetDirByBlinky.call(this); break;
        case "pinky": this._selectTargetDirByPinky.call(this); break;
        case "inky": this._selectTargetDirByInky.call(this); break;
        case "clyde": this._selectTargetDirByClyde.call(this); break;
    }
};

Ghost.prototype._selectTargetDirByBlinky = function() {
    var target = g_game.pacman.getPos();
    this.targetDir = {posX: target.posX, posY: target.posY};
};

Ghost.prototype._selectTargetDirByPinky = function() {
    var pacman = g_game.pacman;
    var pacmanPos = pacman.getPos();
    var sign = this._computeVelSign(pacman.getDirection()); 

    var target = util.getNextPacmanPosition(pacmanPos, sign, 4);
    this.targetDir = {posX: target.cx, posY: target.cy};
};

Ghost.prototype._selectTargetDirByInky = function() {
    var pacman = g_game.pacman;
    var pacmanPos = pacman.getPos();
    var sign = this._computeVelSign(pacman.getDirection()); 
    var pacmanNextPos = util.getNextPacmanPosition(pacmanPos, sign, 2);

    var blinkyPos = g_game.ghosts[0].getPos();

    var deltaX = pacmanNextPos.cx-blinkyPos.posX;
    var deltaY = pacmanNextPos.cy-blinkyPos.posY;

    var targetX = blinkyPos.posX + 2*deltaX;
    var targetY = blinkyPos.posY + 2*deltaY;

    this.targetDir = {posX: targetX, posY: targetY};
};

Ghost.prototype._selectTargetDirByClyde = function() {
    var pacman = g_game.pacman;
    var distFromPacman = Math.sqrt(util.distSq(this.cx, this.cy, pacman.cx, pacman.cy));
    var distInTiles = distFromPacman/g_game.maze.cellWidth;

    var target = g_game.pacman.getPos();
    if(distInTiles < 8) target = this.scatterTarget;

    this.targetDir = {posX: target.posX, posY: target.posY};
};

//direction stuff
//===============

Ghost.prototype._getPerpendicularDirections = function () {
    var directions = util.getArrayCopy(consts.allDirections);

    //finding possible direction that are perpendicular to the current one
    var possibleDir = [];
    for(var i = 0; i < directions.length; i++) {
        if(directions[i].indexOf(this.direction) === -1) {
            possibleDir = directions[i];
            break;
        }
    }

    return possibleDir;
};

Ghost.prototype._getOppisiteDirection = function () {
    var directions = util.getArrayCopy(consts.allDirections);
    
    var oppositeDirection = "NONE";
    for(var i = 0; i < directions.length; i++) {
        if(directions[i].indexOf(this.direction) !== -1) {
            if(directions[i][0] !== this.direction) oppositeDirection = directions[i][0];
            else oppositeDirection = directions[i][1];
        }
    }

    return oppositeDirection;
};

Ghost.prototype._getPossibleDirections = function () {
    var directions = this._getPerpendicularDirections();

    //adding the possibility of continuing your direction
    if(this.direction !== "NONE")
        directions.push(this.direction);

    return directions;
};

Ghost.prototype._getAvailableDirections = function (du) {
    var directions = this._getPossibleDirections();

    for(var i = 0; i < directions.length; i++) {
        var nextValue = this._getNextMazeValue(du, directions[i]);
        if(this.isWall(nextValue)) {
            directions.splice(i, 1);
            i--;
        }
    }

    return directions;
};

Ghost.prototype._getRandomDirection = function () {
    var directions = util.getArrayCopy(consts.allDirections);
    var randomDirection = util.chooseRandomFromArray(directions[0].concat(directions[1]));
    return randomDirection;
};

Ghost.prototype.goToOppositeDirections = function () {
    this.targetDirection = this._getOppisiteDirection();
    this.direction = this.targetDirection;
};

Ghost.prototype._getRandomVerticalDirection = function () {
    var directions = util.getArrayCopy(consts.allDirections[0]);
    var randomDirection = util.chooseRandomFromArray(directions);
    return randomDirection;
};


//collision stuff
//===============

Ghost.prototype.takePacmanHit = function (pacman) {
    Ghost.prototype.isWarping = true;
    if(this.ghostMode === g_game.FRIGHTENED) {
        this.goToBox();
        g_game.increaseScore(200);
    }
    else if(this.ghostMode !== g_game.GOTOBOX) pacman.warp();
};

Ghost.prototype.takeGhostHit = function (ghost) {};

//other stuff
//===========

Ghost.prototype.goToBox = function () {
    if(g_playSound) g_game.eatGhost.play();
    this.ghostMode = g_game.GOTOBOX;
};

Ghost.prototype._getNonWallCellTypes = function () {    
    var nonWallCellTypes = [g_game.maze.PATH];
    if(this.ghostMode === g_game.GOTOBOX || this.canGoUp) nonWallCellTypes.push(g_game.maze.DOOR);
    return nonWallCellTypes;
};

Ghost.prototype.getRadius = function () {
    return this.sprite.width * this.scale / 2;
};

Ghost.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.direction = this.reset_direction;
    this._updateVelocityByDirection();
    this.boxSpan = this.reset_boxSpan;

    this.canLeaveBox = false;
    this.canGoToCenter = false;
    this.canGoUp = false;

    this.ghostMode = g_game.SCATTER;
    this.speed = this.regularSpeed;
};

Ghost.prototype.render = function(ctx) {
    var sprite = this.sprite;

    if(this.ghostMode === g_game.GOTOBOX) sprite = g_sprites.eyes;
    else if(this.ghostMode === g_game.FRIGHTENED) sprite = g_sprites.frightened;

    var origScale = sprite.scale;

    // pass my scale into the sprite, for drawing
     this.sprite.scale = this._scale*2;

    sprite.drawWrappedCentredAt(
	   ctx, this.cx, this.cy, this.rotation
    );

    sprite.scale = origScale;
};