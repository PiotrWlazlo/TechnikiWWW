/********************
 * theLongWayOut.js *
 ********************
 *
 * Well, it looks like they're on to us. The path isn't as
 * clear as I thought it'd be. But no matter - four clever
 * characters should be enough to erase all their tricks.
 */

function startLevel(map) {
    map.placePlayer(7, 5);

    var maze = new ROT.Map.DividedMaze(map.getWidth(), map.getHeight());
/*
    maze.create( function (x, y, mapValue) {

        // don't write maze over player
        if (map.getPlayer().atLocation(x,y)) {
            return 0;
        }

        else if (mapValue === 1) { //0 is empty space 1 is wall
            map.placeObject(x,y, 'block');
        }
        else {
            map.placeObject(x,y,'empty');
        }
    });

    map.placeObject(map.getWidth()-4, map.getHeight()-4, 'block');
    map.placeObject(map.getWidth()-6, map.getHeight()-4, 'block');
    map.placeObject(map.getWidth()-5, map.getHeight()-5, 'block');
    map.placeObject(map.getWidth()-5, map.getHeight()-3, 'block');
*/
    map.placeObject(map.getWidth()-5, map.getHeight()-4, 'exit');
}
 