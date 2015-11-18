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

// ==========
// GAME STUFF
// ==========

var g_game = new Game();


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
    if(g_game.gameOver || g_game.gameWon) return;
    
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
        g_game.stopAllSounds();
        g_playSound = !g_playSound;
    }

    if (eatKey(KEY_RESET)) g_game.resetGame();
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
    if(g_game.gameOver || g_game.gameWon) {
        if(g_game.gameOver) g_game.renderGameOver(ctx);
        if(g_game.gameWon) g_game.renderGameWon(ctx);
        return;
    }

    entityManager.render(ctx);

    g_game.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        pacman : "https://notendur.hi.is/~elr13/images/sprite_pac.png",
        blinky : "https://notendur.hi.is/~elr13/images/SpriteSheet.png",
        inky : "https://notendur.hi.is/~elr13/images/SpriteSheet.png",
        pinky : "https://notendur.hi.is/~elr13/images/SpriteSheet.png",
        clyde : "https://notendur.hi.is/~elr13/images/SpriteSheet.png",
        frightened : "https://notendur.hi.is/~elr13/images/frightened.png",
        eyes : "https://notendur.hi.is/~elr13/images/eyes.png",
        map: "img/map.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    
    g_sprites.pacman = new Sprite(g_images.pacman,0,0,32,32);
    g_sprites.blinky = new ghostSprite(g_images.blinky,0,0,45,45);
    g_sprites.inky = new ghostSprite(g_images.inky,45,0,45,45);
    g_sprites.pinky = new ghostSprite(g_images.pinky,90,0,45,45);
    g_sprites.clyde = new ghostSprite(g_images.clyde,135,0,45,45);
    g_sprites.frightened = new ghostSprite(g_images.frightened,0,0,45,45);
    g_sprites.eyes = new Sprite(g_images.eyes,0,0,40,40);
    g_sprites.map = new Sprite(g_images.map,0,0,506,559);

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
g_game.init();