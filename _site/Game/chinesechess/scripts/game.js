export class Game {
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
