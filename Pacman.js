// ==========
// SHIP STUFF
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
    this._scale = 1;
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
Pacman.prototype.cx = 200;
Pacman.prototype.cy = 200;
    
Pacman.prototype.update = function (du) {
    var d = 5*du;
    if (keys[this.KEY_RIGHT]) {
        this.cx += d;
    } 
    else if (keys[this.KEY_LEFT]) {
        this.cx -= d;
    }
    else if (keys[this.KEY_UP]) {
        this.cy -= d;
    }
    else if (keys[this.KEY_DOWN]) {
        this.cy += d;
    }

    this.wrapPosition();

};

Pacman.prototype.getRadius = function () {
    return this.sprite.width / 2;
};

Pacman.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
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