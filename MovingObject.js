function MovingObject() {

};

MovingObject.prototype = new Entity();

// Initial, inheritable, default values
MovingObject.prototype.cx = g_gCanvas.width / 2;
MovingObject.prototype.cy = g_gCanvas.height / 2;

MovingObject.prototype.speed = 150 / SECS_TO_NOMINALS;
MovingObject.prototype.xVel = 0;
MovingObject.prototype.yVel = 0;

MovingObject.prototype.rotation = 0;
MovingObject.prototype.direction = "NONE"; //the current direction your moving in
MovingObject.prototype.targetDirection = "NONE"; //the direction you want to move in but can't, at least yet

MovingObject.prototype._canGoTargetDirection = function (du) {
    var vel = this._computeVel(this.targetDirection);

    //checking whether the next cell is a wall
    var nextMazeCoordWithRadius = this._getNextMazeCoord(du, this.targetDirection);
    var nextCol = nextMazeCoordWithRadius.col;
    var nextRow = nextMazeCoordWithRadius.row;
    if(g_game.maze.getValue(nextCol, nextRow) !== g_game.maze.PATH) {
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

MovingObject.prototype._computeVel = function (direction) {
    var sign = this._computeVelSign(direction);
    return {xVel : sign.xSign*this.speed, yVel : sign.ySign*this.speed};
};

MovingObject.prototype._computeVelSign = function (direction) {
    var xSign = 0;
    var ySign = 0;

    if (direction === "RIGHT") xSign = 1;
    else if (direction === "LEFT") xSign = -1;
    else if (direction === "UP") ySign = -1;
    else if (direction === "DOWN") ySign = 1;

    return {xSign : xSign, ySign : ySign};
};

MovingObject.prototype._getNextMazeCoord = function (du, direction) {
    //computes the next position given direction and accounting for the
    //radius in the "front"
    var vel = this._computeVel(direction);

    var nextPos = this._computeNextPos(du, vel.xVel, vel.yVel);
    nextPos = this._addRadiusToFront(nextPos, direction);
    nextPos = util.getWrapPos(nextPos);

    return util.getMazeCoord(nextPos.cx, nextPos.cy);
};

MovingObject.prototype._getNextMazeValue = function (du, direction) {
    var nextMazeCoordWithRadius = this._getNextMazeCoord(du, direction);
    var nextCol = nextMazeCoordWithRadius.col;
    var nextRow = nextMazeCoordWithRadius.row;
    return g_game.maze.getValue(nextCol, nextRow);
};

MovingObject.prototype._computeNextPos = function (du, xVel, yVel) {
    // s = s + v * t
    var cx = this.cx + xVel*du;
    var cy = this.cy + yVel*du;
    return {cx : cx, cy : cy};
};

MovingObject.prototype._computeNextPosByDir = function (du, direction) {
    var vel = this._computeVel(direction)

    // s = s + v * t
    var cx = this.cx + vel.xVel*du;
    var cy = this.cy + vel.yVel*du;
    return {cx : cx, cy : cy};
};

MovingObject.prototype._addRadiusToFront = function (pos, direction) {
    //this adds the radius of the object to the "front" of him 
    //(the "front" depends on what direction he is going in)
    var vel = this._computeVel(direction);
    pos.cx = pos.cx + Math.sign(vel.xVel)*this.getRadius();
    pos.cy = pos.cy + Math.sign(vel.yVel)*this.getRadius();
    return pos;
};

MovingObject.prototype._getMazeCenterCoord = function (cx, cy) {
    var mazeCoord = util.getMazeCoord(cx, cy);
    var canvasCoord = util.getCanvasCoord(mazeCoord.col, mazeCoord.row);
    return canvasCoord;
};

MovingObject.prototype._getNextPosition = function (du) {
    var nextPos = this._computeNextPos(du, this.xVel, this.yVel);

    //making sure the position is precisely on the maze
    var center = this._getMazeCenterCoord(nextPos.cx, nextPos.cy);
    if(Math.abs(nextPos.cx - center.cx) > Math.abs(nextPos.cy - center.cy)) {
        nextPos.cy = center.cy;
    }
    else {
        nextPos.cx = center.cx;
    }

    return nextPos;
};

MovingObject.prototype._updatePositionByVelocity = function (du) {
    var nextPos = this._computeNextPos(du, this.xVel, this.yVel);
    this.cx = nextPos.cx; 
    this.cy = nextPos.cy

    this.wrapPosition();
};

MovingObject.prototype._updateVelocityByDirection = function () {
    var vel = this._computeVel(this.direction);
    this.xVel = vel.xVel;
    this.yVel = vel.yVel;
};

MovingObject.prototype.getDirection = function () {
    return this.direction;
};