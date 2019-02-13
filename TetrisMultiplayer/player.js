class Player{
    constructor()
    {
        this.pos = {x: 0, y:0};
        this.matrix = createPiece('T');
    }

    Move(dir)
    {
        this.pos.x += dir;
        if(collide(arena,this)){
            this.pos.x -= dir;
        }
    }

    Rotate(dir){
        rotate(this.matrix,dir);
    }

    
}

