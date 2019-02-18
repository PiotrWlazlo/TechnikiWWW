const tetri = []

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const canvas = element.querySelector('canvas');
    const tetris = new Tetris(canvas);
    tetri.push(tetris);
});

//const canvas = document.getElementById('tetris');
//const tetris = new Tetris(canvas);


function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];
    } else if (type === 'J') {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [1, 1],
            [1, 1],
        ];
    } else if (type === 'Z') {
        return [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ];
    }
}






document.addEventListener('keydown', event => {
    [
        [37,39,81,87,40],
        [65,68,79,80,83], //a,d,o,p,s
    ].forEach((key,index) => {
        const player = tetri[index].player;
        if (event.keyCode ===key[0]) {
            player.move(-1);
        } else if (event.keyCode === key[1]) {
            player.move(1);
        } else if (event.keyCode ===key[4]) {
            player.drop();
        } else if (event.keyCode ===key[2]) {
            player.rotate(-1);
        } else if (event.keyCode ===key[3]) {
            player.rotate(1);
        }
    })
    
});


//player.reset();

//update();