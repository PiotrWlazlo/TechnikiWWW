const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20)

function createMatrix(w,h){
    const matrix = []
    while (h--){
        matrix.push(new Array(w).fill(0));
    }
    return matrix
}

const arena = createMatrix(12,20);

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function draw(){
    context.fillStyle = "#000000";
    context.fillRect(0,0,canvas.width,canvas.height);

    drawMatrix(arena, {x: 0, y:0})
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

function mergePlayer(arena,player){
    player.matrix.forEach((row,y) =>{
        row.forEach((value,x) => {
            if(value !== 0)
                arena[y+player.pos.y][x+player.pos.x] = value
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            mergePlayer(arena, player);
            player.pos.y = 0;
            console.log("zupa");
            //playerReset();
            //arenaSweep();
            //updateScore();
        }
    dropCounter = 0;
}

    lastTime = time;

    draw();
    requestAnimationFrame(update);
}

function PlayerMove(dir){
    player.pos.x += dir;
    if(collide(arena,player)){
        player.pos.x -= dir;
    }
}

function rotate(matrix, dir){
    for(let i =0; i<matrix.length; ++i){    //transpozycja macierzy
        for(let j=0; j<i; ++j){
            [
                matrix[j][i],
                matrix[i][j],
            ] = [
                matrix[i][j],
                matrix[j][i],
            ];
        }
    }
    if(dir>0){
        matrix.forEach(row => row.reverse());
    }else{
        
    }
}

const player = {
    pos: {x:5, y:5},
    matrix: matrix, //tu może zrobić tablicę obiektów i robić losowanie
}

document.addEventListener('keydown',event => {
    if(event.keyCode === 37){
        PlayerMove(-1);
    }
    else if(event.keyCode === 39){
        PlayerMove(1);
    }
    else if(event.keyCode === 40){
        player.pos.y++;
    }
});

update();
