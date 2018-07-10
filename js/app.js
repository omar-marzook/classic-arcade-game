class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x += this.speed * dt;
        chechCanvas(this);
        gameScore(); 
        checkCollision(this);

        allEnemies.forEach(function (enemy) {
            if (enemy.x >= 505) {
                enemy.x = -101;
            }
        });     
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }
    
    update(dt) {
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        if (keyPress === 'left') {
            player.x -= player.speed + 50;
        }
        if (keyPress === 'right') {
            player.x += player.speed + 50;
        }
        if (keyPress === 'up') {
            player.y -= player.speed + 30;
        }
        if (keyPress === 'down') {
            player.y += player.speed + 30;
        }

    }

}


function chechCanvas() {
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x > 405) {
        player.x = 405;
    }
    if (player.y < -10) {
        player.y = -10;
    }
    if (player.y > 385) {
        player.y = 385;
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function randomSpeed(less, top) {
    return Math.random() * (top - less) + less;
}

const allEnemies = [
    new Enemy(-101, 145, getRandomArbitrary(0.5, 1.5) * randomSpeed(400, 500)),
    new Enemy(-101, 65, getRandomArbitrary(0.5, 1.5) * randomSpeed(200, 500)),
    new Enemy(-101, 230, getRandomArbitrary(0.5, 1.5) * randomSpeed(100, 400))
];

const player = new Player(202.5, 385, 50);

const enemy1 = allEnemies[0];
const enemy2 = allEnemies[1];
const enemy3 = allEnemies[2];
const anEnemy = [enemy1, enemy2, enemy3];
const scoreClass = document.querySelector('.scoreNum');
const collidedClass = document.querySelector('.collidedNum');
const gameOverClass = document.querySelector('.game-over');
const conditionClass = document.querySelector('.condition');

let score = 0;
let collided = 0;


function checkCollision(anEnemy) {
    if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {
        collided += 1;
        collidedClass.innerHTML = collided;
        player.x = 202.5;
        player.y = 383;
    }
}


function gameScore() {
    if (player.y <= -10) {
        player.y = 385;
        player.x = 202.5;
        score += 1;
        scoreClass.innerHTML = score;
    }
}

function gameOver() {
    if(score === 5) {
        gameOverClass.className = ' open';
        conditionClass.innerHTML = 'Well Done! You have Won.';
        console.log("it works");
        alert("it works");
    }
    
    if(collided === 5) {
        gameOverClass.className += ' open';
        conditionClass.innerHTML = 'Unfortunately! You have Lost.';
        console.log('it worksss');
        alert('it worksss');
    }
}

gameOver();

// function tryAgain() {
//     score = 0;
//     collided = 0;
// }


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
