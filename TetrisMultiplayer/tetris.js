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
    //debugger;
    //console.log(m.length)
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

function arenaSweep(){
    outer: for(let y = arena.length -1; y>0; --y){
        for(let x=0; x<arena[y].length; x++){
            if(arena[y][x] === 0){
                continue outer;
            }
            //arena.forEach(row, x => arena.fill(0))
        }
        const row = arena.splice(y,1)[0].fill(0)
        arena.unshift(row);
        ++y;
    }
}

function createPiece(type){
    if(type === 'T'){
        return [
            [0,0,0],
            [1,1,1],
            [0,1,0],
        ];
    }else if(type === 'O'){
        return [
            [1,1],
            [1,1],
        ];
    } else if(type === 'L'){
        return [
            [0,1,0],
            [0,1,0],
            [0,1,1],
        ];
    }else if(type === 'J'){
        return [
            [0,1,0],
            [0,1,0],
            [1,1,0],
        ];
    }else if(type === 'I'){
        return [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
        ];
    }
}

function playerReset(){
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length*Math.random()|0]);
    player.pos.y = 0;
    //debugger;
    //console.log(player.matrix[0].length/2|0);
    player.pos.x = 5;
    
    console.log(player.pos.x);
    if(collide(arena,player)){
        arena.forEach(row =>row.fill(0));
    }
}

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
            playerReset();
            //player.pos.y = 0;
            console.log("zupa");
            
            arenaSweep();
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

function playerRotate(dir){
    rotate(player.matrix,dir);
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
        matrix.reverse();
    }
}

const player = {
    pos: {x:5, y:5},
    matrix: createPiece('T'), //tu może zrobić tablicę obiektów i robić losowanie
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
    }else if(event.keyCode === 81){
        playerRotate(-1);
    }else if(event.keyCode === 87){
        playerRotate(1);
    }
});

update();
