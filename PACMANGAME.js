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
    
    if(g_game.canStartGame) entityManager.update(du);

    g_game.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;
var g_playSound = true;

var KEY_SPATIAL = keyCode('X');
var KEY_RESET = keyCode('R');
var KEY_SOUND = keyCode('M');

function processDiagnostics() {
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_SOUND)) g_playSound = !g_playSound;

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

    if(!g_game.canStartGame) g_game.renderReadyText(ctx);

    entityManager.render(ctx);

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

        tile01: "img/tile01.png",
        tile02: "img/tile02.png",
        tile03: "img/tile03.png",
        tile04: "img/tile04.png",
        tile05: "img/tile05.png",
        tile06: "img/tile06.png",
        tile07: "img/tile07.png",
        tile08: "img/tile08.png",
        tile09: "img/tile09.png",
        tile10: "img/tile10.png",
        tile11: "img/tile11.png",
        tile12: "img/tile12.png",
        tile13: "img/tile13.png",
        tile14: "img/tile14.png",
        tile15: "img/tile15.png",
        tile16: "img/tile16.png",
        tile17: "img/tile17.png",
        tile18: "img/tile18.png",
        tile19: "img/tile19.png",
        tile20: "img/tile20.png",
        tile21: "img/tile21.png",
        tile22: "img/tile22.png",
        tile23: "img/tile23.png",
        tile24: "img/tile24.png",
        tile25: "img/tile25.png",
        tile26: "img/tile26.png",
        tile27: "img/tile27.png",
        tile28: "img/tile28.png",
        tile29: "img/tile29.png",
        tile30: "img/tile30.png",
        tile31: "img/tile31.png",
        tile32: "img/tile32.png",
        tile33: "img/tile33.png",
        tile34: "img/tile34.png",
        tile35: "img/tile35.png",
        tile36: "img/tile36.png",
        tile37: "img/tile37.png"
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

    g_sprites.tile01 = new Sprite(g_images.tile01);
    g_sprites.tile02 = new Sprite(g_images.tile02);
    g_sprites.tile03 = new Sprite(g_images.tile03);
    g_sprites.tile04 = new Sprite(g_images.tile04);
    g_sprites.tile05 = new Sprite(g_images.tile05);
    g_sprites.tile06 = new Sprite(g_images.tile06);
    g_sprites.tile07 = new Sprite(g_images.tile07);
    g_sprites.tile08 = new Sprite(g_images.tile08);
    g_sprites.tile09 = new Sprite(g_images.tile09);
    g_sprites.tile10 = new Sprite(g_images.tile10);
    g_sprites.tile11 = new Sprite(g_images.tile11);
    g_sprites.tile12 = new Sprite(g_images.tile12);
    g_sprites.tile13 = new Sprite(g_images.tile13);
    g_sprites.tile14 = new Sprite(g_images.tile14);
    g_sprites.tile15 = new Sprite(g_images.tile15);
    g_sprites.tile16 = new Sprite(g_images.tile16);
    g_sprites.tile17 = new Sprite(g_images.tile17);
    g_sprites.tile18 = new Sprite(g_images.tile18);
    g_sprites.tile19 = new Sprite(g_images.tile19);
    g_sprites.tile20 = new Sprite(g_images.tile20);
    g_sprites.tile21 = new Sprite(g_images.tile21);
    g_sprites.tile22 = new Sprite(g_images.tile22);
    g_sprites.tile23 = new Sprite(g_images.tile23);
    g_sprites.tile24 = new Sprite(g_images.tile24);
    g_sprites.tile25 = new Sprite(g_images.tile25);
    g_sprites.tile26 = new Sprite(g_images.tile26);
    g_sprites.tile27 = new Sprite(g_images.tile27);
    g_sprites.tile28 = new Sprite(g_images.tile28);
    g_sprites.tile29 = new Sprite(g_images.tile29);
    g_sprites.tile30 = new Sprite(g_images.tile30);
    g_sprites.tile31 = new Sprite(g_images.tile31);
    g_sprites.tile32 = new Sprite(g_images.tile32);
    g_sprites.tile33 = new Sprite(g_images.tile33);
    g_sprites.tile34 = new Sprite(g_images.tile34);
    g_sprites.tile35 = new Sprite(g_images.tile35);
    g_sprites.tile36 = new Sprite(g_images.tile36);
    g_sprites.tile37 = new Sprite(g_images.tile37);

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
g_game.initGame();