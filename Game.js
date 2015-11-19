// ============
// GAME STUFF
// ============

//holds on to all entities (pacman, ghosts, maze, pallettes) and 
//takes care of score stuff, sounds and ghost modes

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Game(descr) {
    //this.init();
};

Game.prototype.maze = [];
Game.prototype.pallets = [];
Game.prototype.pacman = [];
Game.prototype.ghosts = [];

Game.prototype.score = 0;
Game.prototype.ncherry = 0;
Game.prototype.lives = 3;
Game.prototype.gameOver = false;
Game.prototype.gameWon = false;

//used to pause the ghosts when pacman is warping
Game.prototype.shouldUpdateGhosts = true;

//ghosts' mode
Game.prototype.ghostModeTimer = 0;
Game.prototype.ghostMode = 0;
Game.prototype.scatterTime = 7;
Game.prototype.chaseTime = 20;

//defining each ghost mode
Game.prototype.CHASE = 0;
Game.prototype.SCATTER = 1;
Game.prototype.FRIGHTENED = 2;
Game.prototype.GOTOBOX = 3;

//holding on to a timer that starts the game (finishes playing the intro song)
Game.prototype.canStartGame = false;
Game.prototype.startGameTimer = 0;

//sounds: HACKED-IN AUDIO (no preloading)
Game.prototype.chomp = new Audio("sounds/pacman_chomp.wav");
Game.prototype.death = new Audio("sounds/pacman_death.wav");
Game.prototype.eatGhost = new Audio("sounds/pacman_eatghost.wav");
Game.prototype.beginning = new Audio("sounds/pacman_beginning.wav");
Game.prototype.siren = new Audio("sounds/pacman_siren.mp3");
Game.prototype.intermission = new Audio("sounds/pacman_intermission.wav");
Game.prototype.eatFruit = new Audio("sounds/pacman_eatfruit.wav");

Game.prototype.update = function (du) {
    if(this.lives <= 0) {
        this.gameOver = true;
        return;
    }

    this._playGameSound();

    if(this.startGameTimer < 0) this.canStartGame = true;
    else this.startGameTimer -= du;

    if(this.ghostModeTimer < 0) {
        if(this.ghostMode === this.SCATTER) {
            this.ghostMode = this.CHASE;
            this.ghostModeTimer = util.getNominalTime(this.chaseTime);
        }
        else if(this.ghostMode === this.CHASE) {
            this.ghostMode = this.SCATTER;
            this.ghostModeTimer = util.getNominalTime(this.scatterTime);
        }
        else if(this.ghostMode === this.FRIGHTENED) {
            this.ghostMode = this.SCATTER;
            this.ghostModeTimer = util.getNominalTime(this.scatterTime);
        }

        this._updateGhostModes();
        this._flipGhostDirections();
    }
    else if(this.shouldUpdateGhosts) this.ghostModeTimer -= du;
};

Game.prototype.toggleUpdateGhosts = function() {
    //is used to stop the ghosts temporarly while pacman warps
    this.shouldUpdateGhosts = !this.shouldUpdateGhosts;
};

//ghost related
//=============

Game.prototype._flipGhostDirections = function (du) {
    for(var i = 0; i < this.ghosts.length; i++) {
        var ghost = this.ghosts[i];
        if(ghost.canLeaveBox && !ghost.canGoToCenter && !ghost.canGoUp) {
            ghost.goToOppositeDirections();
        }
    }
};

Game.prototype._updateGhostModes = function () {
    for(var i = 0; i < this.ghosts.length; i++) {
        this.ghosts[i].ghostMode = this.ghostMode;
    }
};

Game.prototype.setToFrightenedMode = function () {
    this.ghostMode = this.FRIGHTENED;
    this.ghostModeTimer = util.getNominalTime(10);
    this._updateGhostModes();
    this._flipGhostDirections();
};

//sound related
//=============

Game.prototype._playGameSound = function () {
    if(g_playSound && this.shouldUpdateGhosts) {
        if(this.ghostMode === this.FRIGHTENED) this.intermission.play();
        else if(this.canStartGame) this.siren.play();
    }
};

Game.prototype.stopAllSounds = function () {
    var sounds = [this.chomp, this.death, this.eatGhost, this.beginning, 
        this.siren, this.intermission, this.eatFruit];
    for(var i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
};

Game.prototype.pauseAllSounds = function () {
    var sounds = [this.chomp, this.death, this.eatGhost, this.beginning, 
        this.siren, this.intermission, this.eatFruit];
    for(var i = 0; i < sounds.length; i++) {
        sounds[i].pause();
    }
};

//game related
//============

Game.prototype.resetLevel = function (ctx) {
    entityManager.resetAll();
    this.init();
};

Game.prototype.resetGame = function (ctx) {
    this.resetLevel();
    this.score = 0;
    this.lives = 3;
    this.ncherry = 0;
    this.pallets.reset();
};

Game.prototype.init = function () {
    this.stopAllSounds();

    this.ghostMode = this.SCATTER;
    var introTime = 4;

    this.canStartGame = false;
    this.startGameTimer = util.getNominalTime(introTime);
    if(g_playSound) this.beginning.play();

    this.ghostModeTimer = util.getNominalTime(this.scatterTime+introTime);
};

Game.prototype.loseLife = function () {
    this.lives--;
};

//score related
//=============

Game.prototype.increaseScore = function (inc) {
    this.score += inc;
    if(g_playSound) g_game.chomp.play();
};

Game.prototype.increaseCherryCount = function (inc) {
    this.ncherry += inc;
    if(g_playSound) g_game.eatFruit.play();
};

//render related
//==============

Game.prototype.render = function (ctx) {
    if(!this.canStartGame) this._renderReadyText(ctx);
    this._renderScore(ctx);
    this._renderCherryCount(ctx);
    this._renderLevel(ctx);
    this._renderLives(ctx);
};

Game.prototype._renderReadyText = function (ctx) {
    var text = "READY!";
    var style = "yellow";
    var font = "18px Calibri";
    var cx = g_gCanvas.width/2;
    var cy = g_gCanvas.height/2+35;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype._renderScore = function (ctx) {
    var text = "Score:   "+this.score;
    var style = "white";
    var font = "18px Calibri";
    var cx = 80;
    var cy = g_gCanvas.height + (g_canvas.height-g_gCanvas.height)/2;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype._renderCherryCount = function (ctx) {
    var text = "Fruits:   "+this.ncherry;
    var style = "white";
    var font = "18px Calibri";
    var cx = g_canvas.width/2-60;;
    var cy = g_gCanvas.height + (g_canvas.height-g_gCanvas.height)/2;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype._renderLevel = function (ctx) {
    var text = "Level:   "+1;
    var style = "white";
    var font = "18px Calibri";
    var cx = g_canvas.width/2+60;
    var cy = g_gCanvas.height + (g_canvas.height-g_gCanvas.height)/2;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype._renderLives = function (ctx) {
    var text = "Lives:   "+this.lives;
    var style = "white";
    var font = "18px Calibri";
    var cx = g_canvas.width-80;
    var cy = g_gCanvas.height + (g_canvas.height-g_gCanvas.height)/2;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype.renderGameOver = function (ctx) {
    var text = "GAME OVER";
    var style = "red";
    var font = "30px Calibri";
    var cx = g_canvas.width/2
    var cy = g_canvas.height/2;

    util.renderText(ctx, text, style, font, cx, cy);
};

Game.prototype.renderGameWon = function (ctx) {
    var text = "YOU WIN! Score: "+this.score;
    var style = "yellow";
    var font = "30px Calibri";
    var cx = g_canvas.width/2
    var cy = g_canvas.height/2;
    util.renderText(ctx, text, style, font, cx, cy);
};