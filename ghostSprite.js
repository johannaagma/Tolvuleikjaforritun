// ============
// GHOST SPRITE STUFF
// ============


// Construct a "sprite" from the given `image`,
//
function ghostSprite(image, sx , sy , width, height) {
    this.image = image;
    
    this.sx = sx; 
    this.sy = sy; 
    this.width = width; 
    this.height = height; 
}

ghostSprite.prototype.drawAt = function (ctx,x, y) {
    //var y = Math.round(Math.random());
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
                    x,y);
};

ghostSprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    if (g_isUpdatePaused === true || g_game.pacman.isWarping === true){
        var y = 0;
    }
    else {
     y = Math.round(Math.random());
    }
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);


   
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
   
    ctx.drawImage(this.image, this.sx, this.sy+(y*45) , this.width, this.height, 
                  -w/2, -h/2, this.width, this.height);
       


    ctx.restore();
}; 

ghostSprite.prototype.render = function (ctx, cx, cy, rotation){
     this.drawWrappedCentredAt(ctx,cx,cy,rotation);
}


ghostSprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

ghostSprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};