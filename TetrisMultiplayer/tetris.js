const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20)


function draw(){
    context.fillStyle = "#000000";
    context.fillRect(0,0,canvas.width,canvas.height);
    drawMatrix(player.matrix,player.pos);
}

const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

/* => explanation
(anonyomus function)    
function(arg){          (arg) => {
                ===     
}                       }

*/
function drawMatrix(matrix,offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = 'red';
                context.fillRect(x+offset.x,
                                y+offset.y,
                                1,1);
            }
        })
    });
}

setInterval(function(){
    draw()
    player.pos.y++;
    //requestAnimationFrame(update);
},500);

const player = {
    pos: {x:5, y:5},
    matrix: matrix, //tu może zrobić tablicę obiektów i robić losowanie
}

document.addEventListener('keydown',event => {
    if(event.keyCode === 37){
        player.pos.x--;
    }
    else if(event.keyCode === 39){
        player.pos.x++;
    }
    else if(event.keyCode === 40){
        player.pos.y++;
    }
});

update();
