class Game {
    constructor(document) {
        this.board = new Array(11);
        for (let i = 0; i < 10; i++) {
                this.board[i] = new Array(9);
            }
        this.isPlayerTurn = true;
        this.isGameOver = false;
        this.step = 0;
        this.choosing = null;
    }


    makeMove(fplace, nplace) {
        var temp = this.board[fplace[0]][fplace[1]];
        this.board[fplace[0]][fplace[1]] = 0;
        this.board[nplace[0]][nplace[1]] = temp;
        this.step++;
    }

        

    reset() {
        this.board = new Array(8);
        for (let i = 0; i < 8; i++) {
            this.board[i] = new Array(9).fill(0);
        }
        this.isPlayerTurn = true;
        this.isGameOver = false;
        this.step = 0;
    }

    get_available_moves() {
        var available_moves = [];
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.board[i][j] === 0){
                    available_moves.push([i, j]);
                }
            }
        }
        return available_moves;
    }

    change_player() {
        this.isPlayerTurn = !this.isPlayerTurn;
    }

}

function piece_move(fpiece, npiece){
    if (npiece.style.color === fpiece.style.color && npiece.textContent !== '' || fpiece.textContent === '' || fpiece === npiece) 
        return;
    npiece.style.color = fpiece.style.color;
    npiece.textContent = fpiece.textContent;
    fpiece.textContent = '';
    fpiece.style.color = 'gray';
}

function is_same_color(piece1, piece2){
    if(piece1.style.color === piece2.style.color)
        return true;
    return false;
}

var game = new Game(document);
set_board(game);
function handleCellClick(event) {
    if (event.target.classList.contains('piece')) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        const row = parseInt(cellId[0]);
        const col = parseInt(cellId[2]);
        if(game.choosing === null){
            cell.style.fontSize = '45px';
            game.choosing = [row, col];
        }
        else{
            const id = game.choosing[0] + '-' + game.choosing[1];
            const fpiece = document.getElementById(id);
            if (fpiece.style.color === cell.style.color) 
            {
                game.choosing = null;
                fpiece.style.fontSize = '35px';
                cell.style.fontSize = '45px';
                game.choosing = [row, col];
                return;
            }
            game.makeMove(game.choosing, [row, col]);
            piece_move(fpiece, cell);
            fpiece.style.fontSize = '35px';
            game.change_player();
            game.choosing = null;
        }
    }
    }


function set_board(game){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            piece = document.getElementById(i.toString() + '-' + j.toString());
            game.board[i][j] = piece;
        }
}
}

function red_player(){
    for (let i=0; i<9; i++){
        for (let j=0; j<5; j++){
            var fromhere = document.getElementById(j.toString() + '-' + i.toString());
            var tohere = document.getElementById((9-j).toString() + '-' + (8-i).toString());
            temp_role = tohere.textContent;
            temp_color = tohere.style.color;
            if (!(fromhere.textContent == '' && tohere.textContent == '')) {
                tohere.style.color = fromhere.style.color;
                tohere.textContent = fromhere.textContent;
                fromhere.textContent = temp_role;
                fromhere.style.color = temp_color;
            }
        }
    }
}