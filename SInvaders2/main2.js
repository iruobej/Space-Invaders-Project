//declaring controls along with their keycodes
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;

const GAME_WIDTH = 800; // Making the game width 800px
const GAME_HEIGHT = 600; //Making the game height 600px 


//Creating a dictionary called STATE that holds all the properties and their inital values when the game starts
const STATE = {
    score: 0,  
    x_pos : 0,
    y_pos : 0,
    move_right: false,
    move_left: false,
    shoot: false,
    lasers: [], //an array for all the newly created lasers to be stored
    enemies: [], //an array for all the enemies to be stored
    enemyLasers: [], //an array for all the newly created enemy lasers to be stored
    enemy_width: 50,
    spaceship_width: 50,
    number_of_enemies: 16,
    gameOver: false 
}


// Creating the player's spaceship 
function createPlayer() {
    x_pos = GAME_WIDTH / 2;
    y_pos = GAME_HEIGHT - 50;
    const $player = document.createElement("img");
    appendChild($player);
}

// For movement of the player's spaceship
function updatePlayer(){
    if(move_left){
        x_pos -= 5;
    } 
    elif(move_right){
        x_pos += 5;
    } 
    endif
    if(shoot){
        createLaser();
    }
    endif
    const $player = document.querySelector(".player");
}

// Player Laser and its movements
function createLaser(lasers,laser){
    lasers[] += laser
}


//This will be used to check if a player's laser has touched an enemy or if an enemy laser touches the player
function collideRect(rect1, rect2){
    if (rect1 crosses rect2){
        return true; 
    }
    else{
        return false;
    }
    endif
}

// Deletes lasers that touch an enemy as well as deleting lasers that go off the game window 
function deleteLaser(lasers, laser){
    lasers[] -= laser;
}

//To make the laser move
function updateLaser(){
    const ADD_TO_SCORE = 20;  
    for(let i = 0; i < lasers.length; i++){
          const laser = lasers[i];
          laser.y -= 2;
        setPosition(laser.$laser, laser.x, laser.y)
        const laser_rectangle = laser.getBoundingClientRect();
        for(let j = 0; j < enemies.length; j++){
          const enemy = enemies[j];
          const enemy_rectangle = enemy.getBoundingClientRect();
          if(collideRect(enemy_rectangle, laser_rectangle)){ //checks to see if player's laser has hit an enemy
            score += ADD_TO_SCORE        
            document.getElementsByTagName("id") = score;
            removeChild(enemy); // Removing the enemy that got hit 
        }
        next j;
      }     
    }
    next i;
}

// To display the image for the enemy on the screen
function createEnemy(enemies, enemy){
    enemies[] += enemy.img;
}

// For creating muitliple rows of enemies
function createEnemies($container) {
    for(i = 0; i <= number_of_enemies/2; i++){
      createEnemy($container, i*80, 100);
    }
    next i; 
    for(i = 0; i <= number_of_enemies/2; i++){
      createEnemy($container, i*80, 180);
    }
    next i;
}

//For movement of the enemies 
function updateEnemies(){
    const dx = Math.sin(Date.now()/1000)*40;
    const dy = Math.cos(Date.now()/1000)*30;
    for (let i = 0; i < enemies.length; i++){
        const enemy = enemies[i];
        var a = enemy.x + dx;
        var b = enemy.y + dy;
        setPosition(enemy, a, b);
    }
    next i;
}
 
// Displaying the image for the enemy on the screen 
function createEnemyLaser(){
    const $enemyLaser = document.createElement("img");
    enemyLasers[] += enemyLaser;
}

// For the movement of the enemy laser 
function updateEnemyLaser(){
    for(let i = 0; i < enemyLasers.length; i++){
        const enemyLaser = enemyLasers[i];
        enemyLaser.y += 2;
        const enemyLaser_rectangle = enemyLaser.$enemyLaser.getBoundingClientRect();
        const spaceship_rectangle = document.querySelector(".player").getBoundingClientRect();
        if(collideRect(spaceship_rectangle, enemyLaser_rectangle)){
            gameOver = true;
        }
        endif
        setPosition(enemyLaser.$enemyLaser, enemyLaser.x + enemy_width/2, enemyLaser.y+15);
    }
    next i;
}



// Enabling player's spaceship to move in the corresponding direction to the key pressed
function KeyPress(keyCode) {
    if(keyCode === KEY_RIGHT){
        move_right = true;
    } else if (keyCode === KEY_LEFT) {
        move_left = true;
    } else if (keyCode === KEY_SPACE) {
        shoot = true;
    }
}

// Halts these movements when the keys are released
function KeyRelease(keyCode) {
    if (keyCode === KEY_RIGHT) {
        move_right = false;
    } else if (keyCode === KEY_LEFT) {
        move_left = false;
    } else if (keyCode === KEY_SPACE) {
        shoot = false;
    } 
}

// Main Update Function
function update(){
    updatePlayer();
    updateLaser();
    updateEnemies();
    updateEnemyLaser();

    // Displays a win/lose screen depending on whether the player has won/lost their game 
    if (enemies.length == 0) {
        document.win.display = "block"; 
    }   if (gameOver) {
        document.lose.display = "block";
    }    
} 

// calls the update function to enable movements of all the characters and their lasers 
update();
