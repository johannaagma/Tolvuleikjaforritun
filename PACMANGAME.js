// ======
// PACMAN
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_gCanvas = {width : g_canvas.width, height : g_canvas.height-50}; //is also in globals.js

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();

    g_game.update(du);
    
    if(g_game.canStartGame) entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var g_playSound = true;

var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');
var KEY_SOUND = keyCode('M');

function processDiagnostics() {
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_SOUND)) {
        g_sounds.stopAllSounds();
        g_playSound = !g_playSound;
    }

    if (eatKey(KEY_RESET)) g_game.resetLevel();
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    entityManager.render(ctx);

    if(!g_game.canStartGame) g_game.renderReadyText(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        pacman : "https://notendur.hi.is/~jam9/pics/pacman.png",
        blinky : "https://notendur.hi.is/~jam9/pics/blinky.png",
        inky : "https://notendur.hi.is/~jam9/pics/inky.png",
        pinky : "https://notendur.hi.is/~jam9/pics/pinky.png",
        clyde : "https://notendur.hi.is/~jam9/pics/clyde.png",
        frightened : "https://notendur.hi.is/~jam9/pics/inky.png",
        eyes : "https://notendur.hi.is/~jam9/pics/eyes.png",
        map: "img/map.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    
    g_sprites.pacman = new Sprite(g_images.pacman);
    g_sprites.blinky = new Sprite(g_images.blinky);
    g_sprites.inky = new Sprite(g_images.inky);
    g_sprites.pinky = new Sprite(g_images.pinky);
    g_sprites.clyde = new Sprite(g_images.clyde);
    g_sprites.frightened = new Sprite(g_images.frightened);
    g_sprites.eyes = new Sprite(g_images.eyes);
    g_sprites.map = new Sprite(g_images.map);

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
g_game.initGame();