var g_sounds = {

// HACKED-IN AUDIO (no preloading)
chomp : new Audio("sounds/pacman_chomp.wav"),
death : new Audio("sounds/pacman_death.wav"),
eatGhost : new Audio("sounds/pacman_eatghost.wav"),
beginning : new Audio("sounds/pacman_beginning.wav"),
siren : new Audio("sounds/pacman_siren.mp3"),
intermission : new Audio("sounds/pacman_intermission.wav"),

stopAllSounds : function () {
    sounds = [this.chomp, this.death, this.eatGhost, this.beginning, 
        this.siren, this.intermission];
    for(var i = 0; i < sounds.length; i++) {
        sounds[i].pause();
        sounds[i].currentTime = 0;
    }
},

pauseAllSounds : function () {
    sounds = [this.chomp, this.death, this.eatGhost, this.beginning, 
        this.siren, this.intermission];
    for(var i = 0; i < sounds.length; i++) {
        sounds[i].pause();
    }
},

}


