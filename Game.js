// ================
// GAME LOGIC STUFF
// ================

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Game(descr) {
    this.ghostModeTimer = util.getNominalTime(7);

    this.startGame();
    console.log("here");
};

Game.prototype.maze = [];
Game.prototype.pacman = [];
Game.prototype.ghosts = [];

//ghosts' mode
Game.prototype.ghostModeTimer = 0;
Game.prototype.CHASE = 0;
Game.prototype.SCATTER = 1;
Game.prototype.FRIGHTENED = 2;
Game.prototype.ghostMode = Game.prototype.SCATTER;

Game.prototype.beginningSound = new Audio("sounds/pacman_beginning.wav");

Game.prototype.canStartGame = false;
Game.prototype.startGameTimer = 0;

Game.prototype.update = function (du) {
    this.startGameTimer -= du;
    if(this.startGameTimer < 0) this.canStartGame = true;

    this.ghostModeTimer -= du;

    if(this.ghostModeTimer < 0) {
        if(this.ghostMode === this.SCATTER) {
            this.ghostMode = this.CHASE;
            this.ghostModeTimer = util.getNominalTime(20);
        }
        else if(this.ghostMode === this.CHASE) {
            this.ghostMode = this.FRIGHTENED;
            this.ghostModeTimer = util.getNominalTime(5);
        }
        else if(this.ghostMode === this.FRIGHTENED) {
            this.ghostMode = this.SCATTER;
            this.ghostModeTimer = util.getNominalTime(7);
        }

        this.flipGhostDirections();
    }
};

Game.prototype.flipGhostDirections = function (du) {
    for(var i = 0; i < this.ghosts.length; i++) {
        var ghost = this.ghosts[i];
        if(ghost.canLeaveBox && !ghost.canGoToCenter && !ghost.canGoUp) {
            ghost.goToOppositeDirections();
        }
    }
};

Game.prototype.resetLevel = function () {
    for(var i = 0; i < this.ghosts.length; i++) {
        var ghost = this.ghosts[i];
        if(ghost.canLeaveBox && !ghost.canGoToCenter && !ghost.canGoUp) {
            ghost.goToOppositeDirections();
        }
    }
};

Game.prototype.startGame = function () {
    this.canStartGame = false;
    this.startGameTimer = util.getNominalTime(3);
    console.log("HALLLLLO------------------");
    if(g_playSound) this.beginningSound.play();
};

