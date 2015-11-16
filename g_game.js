var g_game = {

maze : [],
pacman : [],
ghosts : [],

//ghosts' mode
_ghostModeTimer : 0,
CHASE : 0,
SCATTER : 1,
FRIGHTENED : 2,
ghostMode : 0,

_scatterTime : 2,//7,
_chaseTime: 2,//20,

_beginningSound : new Audio("sounds/pacman_beginning.wav"),
_sirenSound : new Audio("sounds/pacman_siren.mp3"),
_intermissionSound : new Audio("sounds/pacman_intermission.wav"),

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
    if(g_playSound) {
        if(this.ghostMode === this.FRIGHTENED)
            this._intermissionSound.play();
        else if(this.canStartGame)
            this._sirenSound.play();
    }
},

update : function (du) {
    this._playSound();

    this.startGameTimer -= du;
    if(this.startGameTimer < 0) this.canStartGame = true;

    this._ghostModeTimer -= du;

    if(this._ghostModeTimer < 0) {
        if(this.ghostMode === this.SCATTER) {
            this.ghostMode = this.CHASE;
            this._ghostModeTimer = util.getNominalTime(this._chaseTime);
        }
        else if(this.ghostMode === this.CHASE) {
            this.ghostMode = this.FRIGHTENED;
            this._ghostModeTimer = util.getNominalTime(20);
        }
        else if(this.ghostMode === this.FRIGHTENED) {
            this.ghostMode = this.SCATTER;
            this._ghostModeTimer = util.getNominalTime(this._scatterTime);
        }

        this._updateGhostModes();
        this._flipGhostDirections();
    }
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
    //entityManager.toggleUpdateGhosts();
    entityManager.resetAll();
    this.initGame();
},

initGame : function () {
    this.ghostMode = this.SCATTER;
    var introTime = 4;

    this.canStartGame = false;
    this.startGameTimer = util.getNominalTime(introTime);
    if(g_playSound) this._beginningSound.play();

    this._ghostModeTimer = util.getNominalTime(this._scatterTime+introTime);
},

}


