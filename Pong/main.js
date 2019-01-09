const $pong = $('#pong');
const $player = $('#player-paddle');
const $player2 = $('#player2-paddle');
const $ball = $('#ball');

const UP_LEFT = -3*Math.PI/4;
const UP_RIGHT = - Math.PI/4;
const DOWN_RIGHT = Math.PI/4;
const DOWN_LEFT = 3*Math.PI/4;
const RIGHT = 2*Math.PI;


const ball = {
    top: 150,
    left: 300,
    angle: RIGHT,
    speed: 5
}

setInterval(movePadel, 20);
var keys = {}

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});

function movePadel() {
    if(!interval)
        return;
    for (var direction in keys) {
        if (!keys.hasOwnProperty(direction)) continue;
        $('#player-paddle').css({
            top: `${top}px`
        })
        if (direction == 38 && $("#player-paddle").offset().top >67) {
            $("#player-paddle").animate({top: "-=5"}, 0)
            //console.log($("#player-paddle").offset().top);
        }
        if (direction == 87 && $("#player2-paddle").offset().top >67){
            $('#player2-paddle').animate({top: "-=5"},0);
            //sconsole.log($("#player2-paddle").offset().top);
        }
        if (direction == 40 && $("#player-paddle").offset().top <265){
            $("#player-paddle").animate({top: "+=5"}, 0);console.log($("#player-paddle").offset().top);  
        }
        if (direction == 83 && $("#player2-paddle").offset().top <265) {
            $('#player2-paddle').animate({top: "+=5"},0);
        }
    }
}

let interval = setInterval(function update(){
    updateBall();
},20);

setInterval(function(){
    ball.speed +=0.5;   
},250);

function updateBall(){
        
        ball.top += Math.sin(ball.angle);
        ball.left += ball.speed*Math.cos(ball.angle);

    $('#ball').css({
        top: `${ball.top}px`,
        left: `${ball.left}px`
    });
    
    if (isBallOverlapping()){
        if(ball.angle === UP_LEFT){
            ball.angle = UP_RIGHT;
        }
        else{
            ball.angle = DOWN_RIGHT;
        }
    }
    if (isBallOverlapping2()){
        if(ball.angle === UP_RIGHT){
            ball.angle = UP_LEFT;
        }
        else{
            ball.angle = DOWN_LEFT;
        }
    }
    if(isBallOverlappingWithTop()){
        if(ball.angle === UP_RIGHT)
            ball.angle = DOWN_RIGHT;
        else
            ball.angle = DOWN_LEFT;    
    }
    if(isBallOverlappingWithBottom()){
        if(ball.angle === DOWN_RIGHT)
            ball.angle = UP_RIGHT;
        else
            ball.angle = UP_LEFT;
    }

    const winner = getWinner();
    if(winner){
        clearInterval(interval);
        interval = null;
        alert(`${winner} has won`);
    }
}

function isBallOverlapping(){
    return $('#ball').overlaps('#player-paddle').length>0;
}
function isBallOverlapping2(){
    return $('#ball').overlaps('#player2-paddle').length>0;
}
function isBallOverlappingWithTop () {
    return ball.top <= 0;
  }
  
  function isBallOverlappingWithBottom () {
    return ball.top >= $('#pong').height() - $('#ball').height();
  }

  function getWinner(){
    if(ball.left <0){
        return 'red';
    } else if(ball.left > $('#pong').width() - $('#ball').width()){
        return  'green';
    }   else{
        false;
    }
  }