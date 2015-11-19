// ============
// PACMAN SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image, sx , sy , width, height) {
    this.image = image;
    
    this.sx = sx; 
    this.sy = sy; 
    this.width = width; 
    this.height = height; 
}

Sprite.prototype.drawAt = function (ctx,x, y) {
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
                    x,y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);


   
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
   
    ctx.drawImage(this.image, this.sx , this.sy , this.width, this.height, 
                  -w/2, -h/2, this.width, this.height);
       


    ctx.restore();
}; 

var g_spriteimages;

Sprite.prototype.cycleImages = function(ctx, cx, cy){
 
    
    
    var numCols = 18;
    var numRows = 1; 
    var numCels = 18; 
    g_spriteimages = []; 
    var sprite ; 

 
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            sprite = new Sprite(this.image, col * this.width, row * this.height,
                                this.width, this.height)

           
            g_spriteimages.push(sprite);
        }
    }
    
  
    
    this.main();
   
   
};

var g_cel = 0;

Sprite.prototype.main = function (cx,cy, rotation)
{
    var cel;
    cel = g_spriteimages[g_cel];

    if (g_game.pacman.isMoving === false || g_isUpdatePaused === true){
        //var oldScale = this.scale;
        //this.scale = cel.scale;
        this.drawWrappedCentredAt(ctx, g_game.pacman.cx, g_game.pacman.cy, g_game.pacman.rotation);
        //this.scale = oldScale;
       } 
    else{
        cel.drawWrappedCentredAt(ctx,g_game.pacman.cx,g_game.pacman.cy, g_game.pacman.rotation);
    }
    ++g_cel;
    if(g_cel === g_spriteimages.length) g_cel=0;



};

Sprite.prototype.render = function(ctx,cx,cy, rotation){
     
   
    this.cycleImages(ctx, cx,cy, rotation);
  
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};