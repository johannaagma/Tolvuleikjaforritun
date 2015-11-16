"use strict";

var entityManager = {

// "PRIVATE" DATA

_maze : [],
_ghosts : [],
_pacman : [],

_bUpdateGhosts : true,

// "PRIVATE" METHODS

_forEachOf : function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

_generateMaze : function(descr) {
    g_game.maze = new Maze(descr);
    this._maze.push(g_game.maze);
},

_generatePacman : function(descr) {
    g_game.pacman = new Pacman(descr);
    this._pacman.push(g_game.pacman);
},

_generateGhost : function(descr, i) {
    g_game.ghosts[i] = new Ghost(descr);
    this._ghosts.push(g_game.ghosts[i]);
},

_generateGhosts : function() {
    var sprites = [g_sprites.blinky, g_sprites.pinky, g_sprites.inky, g_sprites.clyde];
    var colStart = [14, 14, 12, 16];
    var rowstart = [11.5, 14.5, 14.5, 14.5];
    var boxSeconds = [0, 4, 6, 8];
    var canLeaveBox = [true, false, false, false];
    var scatterTarget = [   {posX: 0,               posY: 0},
                            {posX: 0,               posY: g_gCanvas.height},
                            {posX: g_gCanvas.width, posY: 0},
                            {posX: g_gCanvas.width, posY: g_gCanvas.height}];
    var debugColors = ["#FF0000", "#F5A9E1", "#2EFEC8", "#F3F781"];
    var names = ["blinky", "pinky", "inky", "clyde"];

    for(var i = 0; i < sprites.length; i++) {
        this._generateGhost({
            cx : colStart[i] * g_game.maze.cellWidth,
            cy : rowstart[i] * g_game.maze.cellHeight,

            sprite : sprites[i],

            boxSeconds : boxSeconds[i],

            scatterTarget : scatterTarget[i],

            canLeaveBox : canLeaveBox[i],

            name : names[i],

            debugColor : debugColors[i]
        }, i);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._maze, this._ghosts, this._pacman];
},

init : function() {
    this._generateMaze({});

    this._generateGhosts();

    this._generatePacman({
        cx : 14*g_game.maze.cellWidth,
        cy : 23.5*g_game.maze.cellHeight
    });
},

resetAll : function() {
    this._forEachOf(this._pacman, Pacman.prototype.reset);
    this._forEachOf(this._ghosts, Ghost.prototype.reset);
},

//is used to stop the ghosts temporarly while pacman warps
toggleUpdateGhosts : function() {
    this._bUpdateGhosts = !this._bUpdateGhosts;
},

update : function(du) {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        if (!this._bUpdateGhosts && aCategory == this._ghosts)
            continue;

        while (i < aCategory.length) {
            var status = aCategory[i].update(du);
            if (status === this.KILL_ME_NOW) {
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
},

render: function(ctx) {
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
