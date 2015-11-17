// consts.js
//
// A module of generic constants

"use strict";


var consts = {

    FULL_CIRCLE: Math.PI * 2,
    RADIANS_PER_DEGREE: Math.PI / 180.0,
    
    allDirections : [["UP", "DOWN"], ["LEFT", "RIGHT"]],
    rotations : {"UP" : 3*Math.PI/2, "DOWN": Math.PI/2, "LEFT" : Math.PI, "RIGHT" : 0}
};