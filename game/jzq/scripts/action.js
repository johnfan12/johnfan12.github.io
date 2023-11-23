class Game {
    constructor() {
        this.board = new Array(3);
        for (let i = 0; i < 3; i++) {
            this.board[i] = new Array(3).fill(0);
        }
        this.isPlayerTurn = true;
        this.isGameOver = false;
        this.step = 0;
    }

    checkWin() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] !== 0 && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
                this.isGameOver = true;
                return true;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.board[0][i] !== 0 && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
                this.isGameOver = true;
                return true;
            }
        }
        if (this.board[0][0] !== 0 && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
            this.isGameOver = true;
            return true;
        }
        if (this.board[0][2] !== 0 && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
            this.isGameOver = true;
            return true;
        }
        return false;
    }

    makeMove(row, col) {
        if (this.board[row][col] === 0 && !this.isGameOver) {
            if (this.isPlayerTurn) {
                this.board[row][col] = 1; // 玩家下棋，用1表示
            } else {
                this.board[row][col] = 2; // 电脑下棋，用2表示
            }
            this.isPlayerTurn = !this.isPlayerTurn;
            this.step++;
        }
    }

    reset() {
        this.board = new Array(3);
        for (let i = 0; i < 3; i++) {
            this.board[i] = new Array(3).fill(0);
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

var game = new Game();
function handleCellClick(event) {
    if (event.target.classList.contains('piece')) {
        const cellId = event.target.id;
        const row = parseInt(cellId[0]) - 1;
        const col = parseInt(cellId[2]) - 1;
        game.makeMove(row, col);

        const cellElement = document.getElementById(cellId);
        if (!cellElement.textContent && !game.isGameOver) {
            cellElement.textContent = game.isPlayerTurn ? 'X' : 'O';
        }

        if (game.checkWin()) { 
            var textContainer = document.getElementById('winner_show');
            textContainer.textContent = (game.isPlayerTurn ? 'X' : 'O') + ' 赢了!';
            return;
        }
        else if (game.step === 9) {
            var textContainer = document.getElementById('winner_show');
            textContainer.textContent = '平局!';
            return;
        }

        if (!game.isPlayerTurn)
        {
        var random = game.get_available_moves()[Math.floor(Math.random() * game.get_available_moves().length)];
        game.makeMove(random[0], random[1]);
        const botmove = document.getElementById((random[0] + 1).toString() + '-' + (random[1] + 1).toString());
        botmove.textContent = game.isPlayerTurn ? 'X' : 'O';
        }
        // 检查电脑是否获胜
        if (game.checkWin()) { 
            var textContainer = document.getElementById('winner_show');
            textContainer.textContent = (game.isPlayerTurn ? 'X' : 'O') + ' 赢了!';
            return;
        }
        else if (game.step === 9) {
            var textContainer = document.getElementById('winner_show');
            textContainer.textContent = '平局!';
            return;
        }
    }
    }


function reset() {
    game.reset();
    var textContainer = document.getElementById('winner_show');
    textContainer.textContent = '';
    var cells = document.getElementsByClassName('piece');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}

function change() {
    reset();
    game.isPlayerTurn = false;
    game.makeMove(1, 1);
    const botmove = document.getElementById((2).toString() + '-' + (2).toString());
    botmove.textContent ='X';
}