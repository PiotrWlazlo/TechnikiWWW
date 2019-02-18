const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const canvas = element.querySelector('canvas');
    const tetris = new Tetris(canvas);
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
    const player = tetris.player;
    if (event.keyCode === 37) {
        player.move(-1);
    } else if (event.keyCode === 39) {
        player.move(1);
    } else if (event.keyCode === 40) {
        player.drop();
    } else if (event.keyCode === 81) {
        player.rotate(-1);
    } else if (event.keyCode === 87) {
        player.rotate(1);
    }
});


//player.reset();

//update();