var g_game = {

maze : [],
pallets : [],
pacman : [],
ghosts : [],
score : 0,

shouldUpdateGhosts : true,

//ghosts' mode
_ghostModeTimer : 0,
CHASE : 0,
SCATTER : 1,
FRIGHTENED : 2,
GOTOBOX : 3,
ghostMode : 0,

_scatterTime : 7,
_chaseTime: 20,

canStartGame : false,
startGameTimer : 0,

_flipGhostDirections : function (du) {
    for(var i = 0; i < this.ghosts.length; i++) {
        var ghost = this.ghosts[i];
        if(ghost.canLeaveBox && !ghost.canGoToCenter && !ghost.canGoUp) {
            ghost.goToOppositeDirections();
        }
    }
},

_updateGhostModes : function () {
    for(var i = 0; i < this.ghosts.length; i++) {
        this.ghosts[i].ghostMode = this.ghostMode;
    }
},

_playSound: function () {
    if(g_playSound && this.shouldUpdateGhosts) {
        if(this.ghostMode === this.FRIGHTENED) g_sounds.intermission.play();
        else if(this.canStartGame) g_sounds.siren.play();
    }
},

update : function (du) {
    this._playSound();

    if(this.startGameTimer < 0) this.canStartGame = true;
    else this.startGameTimer -= du;

    if(this._ghostModeTimer < 0) {
        if(this.ghostMode === this.SCATTER) {
            this.ghostMode = this.CHASE;
            this._ghostModeTimer = util.getNominalTime(this._chaseTime);
        }
        else if(this.ghostMode === this.CHASE) {
            this.ghostMode = this.FRIGHTENED;
            this._ghostModeTimer = util.getNominalTime(10);
        }
        else if(this.ghostMode === this.FRIGHTENED) {
            this.ghostMode = this.SCATTER;
            this._ghostModeTimer = util.getNominalTime(this._scatterTime);
        }

        this._updateGhostModes();
        this._flipGhostDirections();
    }
    else if(this.shouldUpdateGhosts) this._ghostModeTimer -= du;
},

renderReadyText : function (ctx) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = "yellow";
    ctx.font = "18px Calibri";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.fillText("READY!", g_gCanvas.width/2, g_gCanvas.height/2+35);

    ctx.fillStyle = oldStyle;
},

resetLevel : function (ctx) {
    entityManager.resetAll();
    this.initGame();
},

//is used to stop the ghosts temporarly while pacman warps
toggleUpdateGhosts : function() {
    this.shouldUpdateGhosts = !this.shouldUpdateGhosts;
},

initGame : function () {
    g_sounds.stopAllSounds();

    this.ghostMode = this.SCATTER;
    var introTime = 4;

    this.canStartGame = false;
    this.startGameTimer = util.getNominalTime(introTime);
    if(g_playSound) g_sounds.beginning.play();

    this._ghostModeTimer = util.getNominalTime(this._scatterTime+introTime);
},

}


