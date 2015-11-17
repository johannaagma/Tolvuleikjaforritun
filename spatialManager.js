/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>

_collision : function(x1, y1, x2, y2) {
    var coord1 = util.getMazeCoord(x1, y1);
    var coord2 = util.getMazeCoord(x2, y2);

    return ((coord1.col === coord2.col) && (coord1.row === coord2.row));
},

// PUBLIC METHODS

getNewSpatialID : function() {
    return this._nextSpatialID++;
},

register : function(entity) {
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;
},

unregister : function(entity) {
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = undefined;
},

findEntityInRange : function(posX, posY, radius) {
    for(var ID in this._entities) {
        var entity = this._entities[ID];
        if(entity !== undefined) {
            var pos = entity.getPos();
            var collision = this._collision(posX, posY, pos.posX, pos.posY);
            if(collision) return entity;
        }
    }
},

render : function(ctx) {
    for (var i = 0; i < g_game.ghosts.length; i++) {
        var ghost =  g_game.ghosts[i];
        var target = ghost.targetDir;
        if(g_game.ghostMode !== g_game.FRIGHTENED && ghost.canLeaveBox)
            util.fillCircle(ctx, target.posX, target.posY, 7, ghost.debugColor);
    }
}

}