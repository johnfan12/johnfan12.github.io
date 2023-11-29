class Game {
    constructor() {
        this.chessPieces = [
            "車", "馬", "相", "仕", "帥", "仕", "相", "馬", "車",
            "", "", "", "", "", "", "", "", "",
            "", "炮", "", "", "", "", "", "炮", "",
            "兵", "", "兵", "", "兵", "", "兵", "", "兵",
            "", "", "", "", "", "", "", "", "",
            "", "", "", "", "", "", "", "", "",
            "卒", "", "卒", "", "卒", "", "卒", "", "卒",
            "", "炮", "", "", "", "", "", "炮", "",
            "", "", "", "", "", "", "", "", "",
            "車", "馬", "象", "士", "將", "士", "象", "馬", "車"];
        this.board = new Array(10);
        for (let i = 0; i < 10; i++) {
            this.board[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                if (i < 5) {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['red', this.chessPieces[i * 9 + j]];
                }
                else {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['black', this.chessPieces[i * 9 + j]];
                }
            }
        }
        this.isPlayerTurn = false;
        this.isGameOver = false;
        this.step = 0;
        this.choosing = null;
        this.player = 'black'
        this.recorder = [];
        this.red_start_moves = [[[2, 7], [2, 4]], [[2, 1], [2, 4]], [[0, 2],[2, 4]], [[0, 6], [2, 4]], [[3, 2],[4, 2]], [[3, 6],[4, 6]], [[3, 4],[4, 4]], [[0, 1],[2, 2]], [[0, 7], [2, 6]], [[0, 3],[1, 4]], [[0, 5], [1, 4]]];
        this.black_start_moves = [[[7, 1], [7, 4]], [[7, 7],[7, 4]], [[9, 6],[7, 4]], [[9, 2],[7, 4]], [[6, 6],[5, 7]], [[6, 2],[5, 2]], [[6, 4],[5, 4]], [[9, 7],[7, 6]], [[9, 1],[7, 2]], [[9, 5],[8, 4]], [[9, 3],[8, 4]]];
    }

    makeMove(fplace, nplace) {
        if (this.board[nplace[0]][nplace[1]][1] === '將' || this.board[nplace[0]][nplace[1]][1] === '帥') {
            this.isGameOver = true;
        }
        this.board[nplace[0]][nplace[1]][0] = this.board[fplace[0]][fplace[1]][0];
        this.board[nplace[0]][nplace[1]][1] = this.board[fplace[0]][fplace[1]][1];
        this.board[fplace[0]][fplace[1]][1] = '';
        this.isPlayerTurn = !this.isPlayerTurn;
        this.recorder[this.step] = [fplace, nplace];
        this.step++;
    }

    replay_move(fplace, nplace) {
        this.board[nplace[0]][nplace[1]][0] = this.board[fplace[0]][fplace[1]][0];
        this.board[nplace[0]][nplace[1]][1] = this.board[fplace[0]][fplace[1]][1];
        this.board[fplace[0]][fplace[1]][1] = '';
        this.isPlayerTurn = !this.isPlayerTurn;
    }

    undo() {
        if (this.step === 0) {
            return;
        }
        this.reset();
        for (let i = 0; i < this.step - 1; i++) {
            this.replay_move(this.recorder[i][0], this.recorder[i][1]);
        }
        this.step--;
    }



    reset() {
        this.board = new Array(10);
        for (let i = 0; i < 10; i++) {
            this.board[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                if (i < 5) {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['red', this.chessPieces[i * 9 + j]];
                }
                else {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['black', this.chessPieces[i * 9 + j]];
                }
            }
            this.isPlayerTurn = true;
            this.isGameOver = false;
            this.choosing = null;
        }
    }

    whole_reset() {
        this.board = new Array(10);
        for (let i = 0; i < 10; i++) {
            this.board[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                if (i < 5) {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['red', this.chessPieces[i * 9 + j]];
                }
                else {
                    this.board[i][j] = new Array(2);
                    this.board[i][j] = ['black', this.chessPieces[i * 9 + j]];
                }
            }
            this.isPlayerTurn = true;
            this.isGameOver = false;
            this.choosing = null;
            this.step = 0;
            this.player = 'black';
            this.recorder = [];
        }
    }


    check_empty(row, col) {
        if (this.board[row][col][1] === '') {
            return true;
        }
        return false;
    }

    check_bounary(row, col) {
        if (row < 0 || row > 9 || col < 0 || col > 8) {
            return true;
        }
        return false;
    }

    get_available_moves_for_bing(row, col) {
        var available_moves = [];
        if (row < 5) {
            if (!this.check_bounary(row + 1, col)) {
                available_moves.push([row + 1, col]);
            }
        }
        else {
            if (!this.check_bounary(row + 1, col)) {
                available_moves.push([row + 1, col]);
            }
            if (!this.check_bounary(row, col + 1)) {
                available_moves.push([row, col + 1]);
            }
            if (!this.check_bounary(row, col - 1)) {
                available_moves.push([row, col - 1]);
            }
        }

        return available_moves;
    }

    get_available_moves_for_zu(row, col) {
        var available_moves = [];
        if (row > 4) {
            if (!this.check_bounary(row - 1, col)) {
                available_moves.push([row - 1, col]);
            }
        }
        else {
            if (!this.check_bounary(row - 1, col)) {
                available_moves.push([row - 1, col]);
            }
            if (!this.check_bounary(row, col + 1)) {
                available_moves.push([row, col + 1]);
            }
            if (!this.check_bounary(row, col - 1)) {
                available_moves.push([row, col - 1]);
            }
        }

        return available_moves;
    }

    get_available_moves_for_pao(row, col, role) {
        var available_moves = [];
        var count = 1;
        while (!this.check_bounary(row + count, col)) {
            if (this.check_empty(row + count, col)) {
                available_moves.push([row + count, col]);
            }
            else {
                count++;
                break;
            }
            count++;
        }
        while (!this.check_bounary(row + count, col)) {
            if (!this.check_empty(row + count, col)) {
                if(this.board[row + count][col][0] !== role)
                available_moves.push([row + count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row - count, col)) {
            if (this.check_empty(row - count, col)) {
                available_moves.push([row - count, col]);
            }
            else {
                count++;
                break;
            }
            count++;
        }
        while (!this.check_bounary(row - count, col)) {
            if (!this.check_empty(row - count, col)) {
                if(this.board[row - count][col][0] !== role)
                available_moves.push([row - count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row, col + count)) {
            if (this.check_empty(row, col + count)) {
                available_moves.push([row, col + count]);
            }
            else {
                count++;
                break;
            }
            count++;
        }
        while (!this.check_bounary(row, col + count)) {
            if (!this.check_empty(row, col + count)) {
                if(this.board[row][col + count][0] !== role)
                available_moves.push([row, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row, col - count)) {
            if (this.check_empty(row, col - count)) {
                available_moves.push([row, col - count]);
            }
            else {
                count++;
                break;
            }
            count++;
        }
        while (!this.check_bounary(row, col - count)) {
            if (!this.check_empty(row, col - count)) {
                if(this.board[row][col - count][0] !== role)
                available_moves.push([row, col - count]);
                break;
            }
            count++;
        }
        return available_moves;
    }

    get_available_moves_for_che(row, col) {
        var available_moves = [];
        var count = 1;
        while (!this.check_bounary(row + count, col)) {
            if (this.check_empty(row + count, col)) {
                available_moves.push([row + count, col]);
            }
            else {
                available_moves.push([row + count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row - count, col)) {
            if (this.check_empty(row - count, col)) {
                available_moves.push([row - count, col]);
            }
            else {
                available_moves.push([row - count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row, col + count)) {
            if (this.check_empty(row, col + count)) {
                available_moves.push([row, col + count]);
            }
            else {
                available_moves.push([row, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row, col - count)) {
            if (this.check_empty(row, col - count)) {
                available_moves.push([row, col - count]);
            }
            else {
                available_moves.push([row, col - count]);
                break;
            }
            count++;
        }

        return available_moves;
    }


    get_available_moves_for_ma(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 2, col + 1) && this.check_empty(row + 1, col)) {
            available_moves.push([row + 2, col + 1]);
        }
        if (!this.check_bounary(row + 2, col - 1) && this.check_empty(row + 1, col)) {
            available_moves.push([row + 2, col - 1]);
        }
        if (!this.check_bounary(row - 2, col + 1) && this.check_empty(row - 1, col)) {
            available_moves.push([row - 2, col + 1]);
        }
        if (!this.check_bounary(row - 2, col - 1) && this.check_empty(row - 1, col)) {
            available_moves.push([row - 2, col - 1]);
        }
        if (!this.check_bounary(row + 1, col + 2) && this.check_empty(row, col + 1)) {
            available_moves.push([row + 1, col + 2]);
        }
        if (!this.check_bounary(row - 1, col + 2) && this.check_empty(row, col + 1)) {
            available_moves.push([row - 1, col + 2]);
        }
        if (!this.check_bounary(row + 1, col - 2) && this.check_empty(row, col - 1)) {
            available_moves.push([row + 1, col - 2]);
        }
        if (!this.check_bounary(row - 1, col - 2) && this.check_empty(row, col - 1)) {
            available_moves.push([row - 1, col - 2]);
        }
        return available_moves;
    }

    get_available_moves_for_xiangr(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 2, col + 2) && this.check_empty(row + 1, col + 1) && row + 2 <= 4) {
                available_moves.push([row + 2, col + 2]);
            }
        if (!this.check_bounary(row - 2, col - 2) && this.check_empty(row - 1, col - 1)) {
                available_moves.push([row - 2, col - 2]);
            }
        if (!this.check_bounary(row + 2, col - 2) && this.check_empty(row + 1, col - 1) && row + 2 <= 4) {
                available_moves.push([row + 2, col - 2]);
            }
        if (!this.check_bounary(row - 2, col + 2) && this.check_empty(row - 1, col + 1)) {

                available_moves.push([row - 2, col + 2]);
            }
        return available_moves;
    }

    get_available_moves_for_xiangb(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 2, col + 2) && this.check_empty(row + 1, col + 1)) {
                available_moves.push([row + 2, col + 2]);
            }
        if (!this.check_bounary(row - 2, col - 2) && this.check_empty(row - 1, col - 1) && row - 2 >= 5) {
                available_moves.push([row - 2, col - 2]);
            }
        if (!this.check_bounary(row + 2, col - 2) && this.check_empty(row + 1, col - 1)) {
                available_moves.push([row + 2, col - 2]);
            }
        if (!this.check_bounary(row - 2, col + 2) && this.check_empty(row - 1, col + 1) && row - 2 >= 5) {
                available_moves.push([row - 2, col + 2]);
            }
        return available_moves;
    }

    get_available_moves_for_shib(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 1, col + 1) && col + 1 > 2 && col + 1 < 6) {
            available_moves.push([row + 1, col + 1]);
        }
        if (!this.check_bounary(row + 1, col - 1) && col - 1 > 2 && col - 1 < 6) {
            available_moves.push([row + 1, col - 1]);
        }
        if (!this.check_bounary(row - 1, col + 1) && row - 1 > 6 && col + 1 > 2 && col + 1 < 6) {
            available_moves.push([row - 1, col + 1]);
        }
        if (!this.check_bounary(row - 1, col - 1) && row - 1 > 6 && col - 1 > 2 && col - 1 < 6) {
            available_moves.push([row - 1, col - 1]);
        }
        return available_moves;
    }

    get_available_moves_for_shir(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 1, col + 1) && row + 1 < 3 && col + 1 > 2 && col + 1 < 6) {
            available_moves.push([row + 1, col + 1]);
        }
        if (!this.check_bounary(row + 1, col - 1) && row + 1 < 3 && col - 1 > 2 && col - 1 < 6) {
            available_moves.push([row + 1, col - 1]);
        }
        if (!this.check_bounary(row - 1, col + 1) && col + 1 > 2 && col + 1 < 6) {
            available_moves.push([row - 1, col + 1]);
        }
        if (!this.check_bounary(row - 1, col - 1) && col - 1 > 2 && col - 1 < 6) {
            available_moves.push([row - 1, col - 1]);
        }
        return available_moves;
    }

    jiang_is_face_to_face(row, col) {
        for (let i = row - 1; !this.check_bounary(i, col); i--) {
            if (this.board[i][col][1] === '') {
                continue;
            }
            else if (this.board[i][col][1] !== '帥') {
                return false;
            }
            else if (this.board[i][col][1] === '帥') {
                return true;
            }
        }
        return false;
    }

    shuai_is_face_to_face(row, col) {
        for (let i = row + 1; !this.check_bounary(i, col); i++) {
            if (this.board[i][col][1] === '') {
                continue;
            }
            else if (this.board[i][col][1] !== '將') {
                return false;
            }
            else if (this.board[i][col][1] === '將') {
                return true;
            }
        }
        return false;
    }


    get_available_moves_for_jiang(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 1, col)) {
            available_moves.push([row + 1, col]);
        }
        if (!this.check_bounary(row - 1, col) && row - 1 > 6) {
            available_moves.push([row - 1, col]);
        }
        if (!this.check_bounary(row, col + 1) && col + 1 < 6 && !this.jiang_is_face_to_face(row, col + 1)) {
            available_moves.push([row, col + 1]);
        }
        if (!this.check_bounary(row, col - 1) && col - 1 > 2 && !this.jiang_is_face_to_face(row, col - 1)) {
            available_moves.push([row, col - 1]);
        }
        return available_moves;
    }

    get_available_moves_for_shuai(row, col) {
        var available_moves = [];
        if (!this.check_bounary(row + 1, col) && row + 1 < 3) {
            available_moves.push([row + 1, col]);
        }
        if (!this.check_bounary(row - 1, col)) {
            available_moves.push([row - 1, col]);
        }
        if (!this.check_bounary(row, col + 1) && col + 1 < 6 && !this.shuai_is_face_to_face(row, col + 1)) {
            available_moves.push([row, col + 1]);
        }
        if (!this.check_bounary(row, col - 1) && col - 1 > 2 && !this.shuai_is_face_to_face(row, col - 1)) {
            available_moves.push([row, col - 1]);
        }
        return available_moves;
    }

    moveable(row, col) {
        var count = 1;
        while (!this.check_bounary(row + count, col)) {
            if (this.check_empty(row + count, col)) {
                count++;
            }
            else {
                break;
            }
        }
        if (this.check_bounary(row + count, col) || this.board[row + count][col][1] !== '將') {
            return true;
        }
        count = 1;
        while (!this.check_bounary(row - count, col)) {
            if (this.check_empty(row - count, col)) {
                count++;
            }
            else {
                break;
            }
        }
        if (this.check_bounary(row - count, col) || this.board[row - count][col][1] !== '帥') {
            return true;
        }
        return false;
    }



    get_available_moves(row, col) {
        var available_moves = [];

        if (this.board[row][col][1] === '兵') {
            available_moves = this.get_available_moves_for_bing(row, col);
        }
        else if (this.board[row][col][1] === '卒') {
            available_moves = this.get_available_moves_for_zu(row, col);
        }
        else if (this.board[row][col][1] === '炮' && this.board[row][col][0] === 'red') {
            available_moves = this.get_available_moves_for_pao(row, col, 'red');
        }
        else if (this.board[row][col][1] === '炮' && this.board[row][col][0] === 'black') {
            available_moves = this.get_available_moves_for_pao(row, col, 'black');
        }
        else if (this.board[row][col][1] === '車') {
            available_moves = this.get_available_moves_for_che(row, col);
        }
        else if (this.board[row][col][1] === '馬') {
            available_moves = this.get_available_moves_for_ma(row, col);
        }
        else if (this.board[row][col][1] === '象') {
            available_moves = this.get_available_moves_for_xiangb(row, col);
        }
        else if (this.board[row][col][1] === '相') {
            available_moves = this.get_available_moves_for_xiangr(row, col);
        }
        else if (this.board[row][col][1] === '士') {
            available_moves = this.get_available_moves_for_shib(row, col);
        }
        else if (this.board[row][col][1] === '仕') {
            available_moves = this.get_available_moves_for_shir(row, col);
        }
        else if (this.board[row][col][1] === '將') {
            available_moves = this.get_available_moves_for_jiang(row, col);
        }
        else if (this.board[row][col][1] === '帥') {
            return this.get_available_moves_for_shuai(row, col);
        }
        if (this.moveable(row, col)) {
            return available_moves;
        }
        else {
            for (let i = 0; i < available_moves.length; i++) {
                if (available_moves[i][1] !== col) {
                    available_moves.splice(i, 1);
                    i--;
                }
            }
            return available_moves;
        }
    }

    copy() {
        var new_game = new Game();
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                new_game.board[i][j][0] = this.board[i][j][0];
                new_game.board[i][j][1] = this.board[i][j][1];
            }
        }
        return new_game;
    }

    get_red_piece_numbers() {
        var bing = 0;
        var pao = 0;
        var che = 0;
        var ma = 0;
        var xiang = 0;
        var shi = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'red') {
                    if (this.board[i][j][1] === '兵') {
                        bing++;
                    }
                    else if (this.board[i][j][1] === '炮') {
                        pao++;
                    }
                    else if (this.board[i][j][1] === '車') {
                        che++;
                    }
                    else if (this.board[i][j][1] === '馬') {
                        ma++;
                    }
                    else if (this.board[i][j][1] === '相') {
                        xiang++;
                    }
                    else if (this.board[i][j][1] === '仕') {
                        shi++;
                    }
                }
            }
        }
        return [bing, pao, che, ma, xiang, shi];
    }

    get_black_piece_numbers() {
        var zu = 0;
        var pao = 0;
        var che = 0;
        var ma = 0;
        var xiang = 0;
        var shi = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'black') {
                    if (this.board[i][j][1] === '卒') {
                        zu++;
                    }
                    else if (this.board[i][j][1] === '炮') {
                        pao++;
                    }
                    else if (this.board[i][j][1] === '車') {
                        che++;
                    }
                    else if (this.board[i][j][1] === '馬') {
                        ma++;
                    }
                    else if (this.board[i][j][1] === '象') {
                        xiang++;
                    }
                    else if (this.board[i][j][1] === '士') {
                        shi++;
                    }
                }
            }
        }
        return [zu, pao, che, ma, xiang, shi];
    }

    red_can_eat_which() {
        var available_moves = [];
        var zu = 0;
        var pao = 0;
        var che = 0;
        var ma = 0;
        var xiang = 0;
        var shi = 0;
        var jiang = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '') {
                    available_moves = this.get_available_moves(i, j);
                    for (let k = 0; k < available_moves.length; k++) {
                        if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'black') {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '卒') {
                                zu++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '炮') {
                                pao++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '車') {
                                che++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '馬') {
                                ma++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '象') {
                                xiang++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '士') {
                                shi++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '將') {
                                jiang++;
                            }
                        }
                    }
                }
            }
        }
        return [zu, pao, che, ma, xiang, shi, jiang];
    }

    black_can_eat_which() {
        var available_moves = [];
        var bing = 0;
        var pao = 0;
        var che = 0;
        var ma = 0;
        var xiang = 0;
        var shi = 0;
        var shuai = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '') {
                    available_moves = this.get_available_moves(i, j);
                    for (let k = 0; k < available_moves.length; k++) {
                        if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'red') {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '兵') {
                                bing++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '炮') {
                                pao++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '車') {
                                che++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '馬') {
                                ma++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '相') {
                                xiang++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '仕') {
                                shi++;
                            }
                            else if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '帥') {
                                shuai++;
                            }
                        }
                    }
                }
            }
        }
        return [bing, pao, che, ma, xiang, shi, shuai];
    }

    red_control_area() {
        var available_moves = [];
        var control_area = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '' && this.board[i][j][1] !== '炮') {
                    available_moves = this.get_available_moves(i, j);
                    for (let k = 0; k < available_moves.length; k++) {
                            if (!control_area.includes(available_moves[k])) {
                                if(this.board[available_moves[k][0]][available_moves[k][1]][1] !== '炮')
                                control_area.push(available_moves[k]);
                            }
                        }
                    }
                }
        }
        return control_area;
    }

    black_control_area() {
        var available_moves = [];
        var control_area = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '' && this.board[i][j][1] !== '炮') {
                    available_moves = this.get_available_moves(i, j);
                    for (let k = 0; k < available_moves.length; k++) {
                            if (!control_area.includes(available_moves[k])) {
                                control_area.push(available_moves[k]);
                            }
                        }
                    }
                }
        }
        return control_area;
    }

    red_area_score() {
        var red_control_area = this.red_control_area();
        var red_area_score = 0;
        for (let i = 0; i < red_control_area.length; i++) {
            if (red_control_area[i][0] < 4) {
                red_area_score += 20;
            }
            else if (red_control_area[i][0] < 6) {
                red_area_score += 50;
            }
            else {
                red_area_score += 45;
            }
        }
        return red_area_score;
    }

    black_area_score() {
        var black_control_area = this.black_control_area();
        var black_area_score = 0;
        for (let i = 0; i < black_control_area.length; i++) {
            if (black_control_area[i][0] > 5) {
                black_area_score += 20;
            }
            else if (black_control_area[i][0] > 3) {
                black_area_score += 50;
            }
            else {
                black_area_score += 45;
            }
        }
        return black_area_score;
    }

    win_rate() {
        var red = this.get_red_piece_numbers();
        var black = this.get_black_piece_numbers();
        var red_can_eat = this.red_can_eat_which();
        var black_can_eat = this.black_can_eat_which();
        if(this.fast_think()[0] > 0.95 || this.fast_think()[1] > 0.95){
            var red_army_score = red[0] * 12 + red[1] * 100 + red[2] * 380 + red[3] * 90 + red[4] * 12 + red[5] * 12 ;
            var black_army_score = black[0] * 12 + black[1] * 100 + black[2] * 380 + black[3] * 90 + black[4] * 12 + black[5] * 12;
            var red_action_score = red_can_eat[0] * 10 + red_can_eat[1] * 80 + red_can_eat[2] * 200 + red_can_eat[3] * 80 + red_can_eat[4] * 60 + red_can_eat[5] * 40 + red_can_eat[6] * 600;
            var black_action_score = black_can_eat[0] * 10 + black_can_eat[1] * 80 + black_can_eat[2] * 200 + black_can_eat[3] * 80 + black_can_eat[4] * 60 + black_can_eat[5] * 40 + black_can_eat[6] * 600;
            var red_area_score = this.red_area_score();
            var black_area_score = this.black_area_score();
            var red_score = red_army_score + red_action_score + red_area_score;
            var black_score = black_army_score + black_action_score + black_area_score;
            var red_win_rate = red_score / (red_score + black_score);
            var black_win_rate = black_score / (red_score + black_score);
        }
        else{
        var red_army_score = red[0] * 12 + red[1] * 100 + red[2] * 380 + red[3] * 90 + red[4] * 12 + red[5] * 12 ;
        var black_army_score = black[0] * 12 + black[1] * 100 + black[2] * 380 + black[3] * 90 + black[4] * 12 + black[5] * 12;
        var red_action_score = red_can_eat[0] * 10 + red_can_eat[1] * 80 + red_can_eat[2] * 200 + red_can_eat[3] * 80 + red_can_eat[4] * 60 + red_can_eat[5] * 40 + red_can_eat[6] * 100;
        var black_action_score = black_can_eat[0] * 10 + black_can_eat[1] * 80 + black_can_eat[2] * 200 + black_can_eat[3] * 80 + black_can_eat[4] * 60 + black_can_eat[5] * 40 + black_can_eat[6] * 100;
        var red_area_score = this.red_area_score();
        var black_area_score = this.black_area_score();
        var red_score = red_army_score + red_action_score + red_area_score;
        var black_score = black_army_score + black_action_score + black_area_score;
        var red_win_rate = red_score / (red_score + black_score);
        var black_win_rate = black_score / (red_score + black_score);
        }
        return [red_win_rate, black_win_rate];
    }

    fast_think(){
        var red = this.get_red_piece_numbers();
        var black = this.get_black_piece_numbers();
        var red_army_score = red[0] * 1 + red[1] * 5 + red[2] * 20 + red[3] * 5 + red[4] * 3 + red[5] * 2;
        var black_army_score = black[0] * 1 + black[1] * 5 + black[2] * 20 + black[3] * 5 + black[4] * 3 + black[5] * 2;
        let scoreDiff = red_army_score - black_army_score
        let winRate = 1 / (1 + Math.exp(-scoreDiff / 10));

        return [winRate, 1 - winRate];
    }

    red_king_in_danger() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '') {
                    const moves = this.get_available_moves(i, j);
                    for (let i = 0; i < moves.length; i++) {
                        if (this.board[moves[i][0]][moves[i][1]][1] === '帥') {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    black_king_in_danger() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '') {
                    const moves = this.get_available_moves(i, j);
                    for (let i = 0; i < moves.length; i++) {
                        if (this.board[moves[i][0]][moves[i][1]][1] === '將') {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    bot_self_attack() {
        if (this.player === 'red')
            this.player = 'black';
        else
            this.player = 'red';
        var next_move = this.normal_bot_move();
        if (next_move.length === 0) {
            console.log('may be someting wrong')
            return [0, 0];
        }
        this.makeMove(next_move[0], next_move[1]);
        let win = this.fast_think();
        return win;
    }

/*     normal_bot_move(){
        if (this.player === 'black') {
            var available_moves = [];
            var next_move = [];
            var highest_win_rate = Number.MIN_SAFE_INTEGER;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'red' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '將') {
                                return [[i, j], available_moves[k]];
                            }
                            this.makeMove([i, j], available_moves[k]);
                            if (this.red_king_in_danger()) {
                                continue;
                            }
                            var win_rate = this.fast_think();
                            if (win_rate[0] > highest_win_rate) {
                                highest_win_rate = win_rate[0];
                                next_move = [[i, j], available_moves[k]];
                            }
                        }
                    }
                }
            }
            return next_move;
        }
        else {
            var available_moves = [];
            var next_move = [];
            var highest_win_rate;
            highest_win_rate =  Number.MIN_SAFE_INTEGER;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'black' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '帥') {
                                return [[i, j], available_moves[k]];
                            }
                            this.makeMove([i, j], available_moves[k]);
                            if (this.black_king_in_danger()) {
                                continue;
                            }
                            var win_rate = this.fast_think();
                            if (win_rate[1] > highest_win_rate) {
                                highest_win_rate = win_rate[1];
                                next_move = [[i, j], available_moves[k]];
                            }
                        }
                    }
                }
            }
            return next_move;
        }
    } */
    
    normal_bot_move(){
        if (this.player === 'black') {
            var available_moves = [];
            var next_move = [];
            var highest_win_rate = -1;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'red' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '將') {
                                return [[i, j], available_moves[k]];
                            }
                            var new_game = this.copy();
                            new_game.makeMove([i, j], available_moves[k]);
                            if (new_game.red_king_in_danger()) {
                                new_game = null;
                                continue;
                            }
                            var win_rate = new_game.fast_think();
                            if (win_rate[0] > highest_win_rate) {
                                highest_win_rate = win_rate[0];
                                next_move = [[i, j], available_moves[k]];
                            }
                            new_game = null;
                        }
                    }
                }
            }
            return next_move;
        }
        else {
            var available_moves = [];
            var next_move = [];
            var highest_win_rate;
            highest_win_rate = -1;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'black' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '帥') {
                                return [[i, j], available_moves[k]];
                            }
                            var new_game = this.copy();
                            new_game.makeMove([i, j], available_moves[k]);
                            if (new_game.black_king_in_danger()) {
                                new_game = null;
                                continue;
                            }
                            var win_rate = new_game.fast_think();
                            if (win_rate[1] > highest_win_rate) {
                                highest_win_rate = win_rate[1];
                                next_move = [[i, j], available_moves[k]];
                            }
                            new_game = null;
                        }
                    }
                }
            }
            return next_move;
        }
    }

    bot_move() {
        if (this.player === 'black') {
            if(this.step === 0 || this.step === 2){
                var randomindex = Math.floor(Math.random() * 7);
                var next_move = this.red_start_moves[randomindex];
                return next_move;
            }
            else{
            var available_moves = [];
            var next_move = [];
            var highest_win_rate = Number.MIN_SAFE_INTEGER;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'red' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'red' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '將') {
                                return [[i, j], available_moves[k]];
                            }
                            var new_game = this.copy();
                            new_game.makeMove([i, j], available_moves[k]);
                            if (new_game.red_king_in_danger()) {
                                new_game = null;
                                continue;
                            }
                            var win_rate = new_game.win_rate();
                            var win_rate2 = new_game.bot_self_attack();
                            if (win_rate[0] + win_rate2[0] * 4 > highest_win_rate) {
                                highest_win_rate = win_rate[0] + win_rate2[0] * 4;
                                next_move = [[i, j], available_moves[k]];
                            }
                            new_game = null;
                        }
                    }
                }
            }
            return next_move;
        }
        }
        else {
            if(this.step === 1){
                var randomindex = Math.floor(Math.random() * 7);
                var next_move = this.black_start_moves[randomindex];
                return next_move;
            }
            else if(this.step === 3){
                var new_game;
                do{
                new_game = this.copy();
                var randomindex = Math.floor(Math.random() * 4) + 7;
                var next_move = this.black_start_moves[randomindex];
                new_game.makeMove(next_move[0], next_move[1]);
                }while(new_game.black_king_in_danger());
                new_game = null;
                return next_move;
            }
            else{
            var available_moves = [];
            var next_move = [];
            var highest_win_rate;
            highest_win_rate = Number.MIN_SAFE_INTEGER;
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 9; j++) {
                    if (this.board[i][j][0] === 'black' && this.board[i][j][1] !== '') {
                        available_moves = this.get_available_moves(i, j);
                        for (let k = 0; k < available_moves.length; k++) {
                            if (this.board[available_moves[k][0]][available_moves[k][1]][0] === 'black' && this.board[available_moves[k][0]][available_moves[k][1]][1] !== '') {
                                continue;
                            }
                            if (this.board[available_moves[k][0]][available_moves[k][1]][1] === '帥') {
                                return [[i, j], available_moves[k]];
                            }
                            var new_game = this.copy();
                            new_game.makeMove([i, j], available_moves[k]);
                            if (new_game.black_king_in_danger()) {
                                new_game = null;
                                continue;
                            }
                            var win_rate = new_game.win_rate();
                            var win_rate2 = new_game.bot_self_attack();
                            if (win_rate[1] + win_rate2[1] * 4 > highest_win_rate) {
                                highest_win_rate = win_rate[1] + win_rate2[1] * 4;
                                next_move = [[i, j], available_moves[k]];
                            }
                            new_game = null;
                        }
                    }
                }
            }
            return next_move;
        }
        }
    }
}



function piece_move(fpiece, npiece) {
    if (npiece.style.color === fpiece.style.color && npiece.textContent !== '' || fpiece.textContent === '' || fpiece === npiece)
        return;
    npiece.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
    npiece.style.borderRadius = '50%';
    npiece.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
    npiece.style.color = fpiece.style.color;
    npiece.textContent = fpiece.textContent;
    fpiece.textContent = '';
    fpiece.style.color = 'gray';
    fpiece.style.outline = 'none';
    fpiece.style.borderRadius = 'none';
    fpiece.style.backgroundColor = 'transparent';
}

function is_same_color(piece1, piece2) {
    if (piece1.style.color === piece2.style.color)
        return true;
    return false;
}

var game = new Game();
set_board_by_game(game);
bot(game);

function bot(game) {
    const next_move = game.bot_move();
    if (next_move.length === 0){
        alert('你贏了！');
        return;
    }
    if (game.player === 'black') {
        const fpiece = document.getElementById((next_move[0][0]).toString() + '-' + (next_move[0][1]).toString());
        const npiece = document.getElementById((next_move[1][0]).toString() + '-' + (next_move[1][1]).toString());
        piece_move(fpiece, npiece);
        game.makeMove(next_move[0], next_move[1]);
    }
    else {
        const fpiece = document.getElementById((9 - next_move[0][0]).toString() + '-' + (8 - next_move[0][1]).toString());
        const npiece = document.getElementById((9 - next_move[1][0]).toString() + '-' + (8 - next_move[1][1]).toString());
        piece_move(fpiece, npiece);
        game.makeMove(next_move[0], next_move[1]);
    }
}


function handleCellClick(event) {
    if (event.target.classList.contains('piece')) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        const row = parseInt(cellId[0]);
        const col = parseInt(cellId[2]);
        if (game.choosing === null) {
            if (game.player === 'red') {
                if (game.isPlayerTurn && cell.style.color === 'red') {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black') {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else {
                if (game.isPlayerTurn && cell.style.color === 'black') {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red') {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
            }
        }
        else {
            if (game.player === 'red') {
                choose = transform(game.choosing[0], game.choosing[1]);
                const id = choose[0] + '-' + choose[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) {
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                    return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col)) {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                    bot(game);
                }
                else {
                    alert('似乎不可以下在這裏喔');
                }

            }
            else {
                const id = game.choosing[0] + '-' + game.choosing[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) {
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                    return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col)) {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                    bot(game);
                }
                else {
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger()) {
                setTimeout(function () { confirm('红方正在被將軍！'); }, 100);
            }
            else if (black_king_in_danger()) {
                setTimeout(function () { confirm('黑方正在被將軍！'); }, 100);
            }
            if (game.isGameOver) {
                setTimeout(function () { confirm('游戲結束！'); }, 100);
            }
        }
    }
    if (event.target.classList.contains('x_piece')) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        const row = parseInt(cellId[0]);
        const col = parseInt(cellId[2]);
        if (game.choosing === null) {
            if (game.player === 'red') {
                if (game.isPlayerTurn && cell.style.color === 'red') {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black') {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else {
                if (game.isPlayerTurn && cell.style.color === 'black') {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red') {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
            }
        }
        else {
            if (game.player === 'red') {
                choose = transform(game.choosing[0], game.choosing[1]);
                const id = choose[0] + '-' + choose[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) {
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                    return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col)) {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                    bot(game);
                }
                else {
                    alert('似乎不可以下在這裏喔');
                }
            }
            else {
                const id = game.choosing[0] + '-' + game.choosing[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) {
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                    return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col)) {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                    bot(game);
                }
                else {
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger()) {
                setTimeout(function () { confirm('红方正在被將軍！'); }, 100);
            }
            else if (black_king_in_danger()) {
                setTimeout(function () { confirm('黑方正在被將軍！'); }, 100);
            }
            if (game.isGameOver) {
                setTimeout(function () { confirm('游戲結束'); }, 100);
            }
        }
    }
}


function set_board(game) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            if (game.board[i][j][1] !== '') {
                a = document.getElementById(i.toString() + '-' + j.toString());
                a.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
                a.style.borderRadius = '90%';
                a.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
            }
        }
    }
}

function red_player() {
    if (game.step !== 0) {
        alert('请先重置棋盘');
        return;
    }
    if (game.player === 'black')
        game.player = 'red';
    else
        game.player = 'black';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 5; j++) {
            var fromhere = document.getElementById(j.toString() + '-' + i.toString());
            var tohere = document.getElementById((9 - j).toString() + '-' + (8 - i).toString());
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

function transform(row, col) {
    return [9 - row, 8 - col];
}

function reset() {
    game.whole_reset();
    set_board_by_game(game);

}

function red_king_in_danger() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            if (game.board[i][j][0] === 'black' && game.board[i][j][1] !== '') {
                const moves = game.get_available_moves(i, j);
                for (let i = 0; i < moves.length; i++) {
                    if (game.board[moves[i][0]][moves[i][1]][1] === '帥') {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function black_king_in_danger() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 9; j++) {
            if (game.board[i][j][0] === 'red' && game.board[i][j][1] !== '') {
                const moves = game.get_available_moves(i, j);
                for (let i = 0; i < moves.length; i++) {
                    if (game.board[moves[i][0]][moves[i][1]][1] === '將') {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function set_board_by_game(game) {
    if (game.player === 'red') {
        var reds = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.board[i][j][1] !== '') {
                    reds = transform(i, j);
                    var piece = document.getElementById(reds[0].toString() + '-' + reds[1].toString());
                    piece.textContent = game.board[i][j][1];
                    piece.style.color = game.board[i][j][0];
                    piece.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
                    piece.style.borderRadius = '50%';
                    piece.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
                }
                else {
                    reds = transform(i, j);
                    var piece = document.getElementById(reds[0].toString() + '-' + reds[1].toString());
                    piece.textContent = '';
                    piece.style.color = 'transparent';
                    piece.style.outline = 'none';
                    piece.style.borderRadius = 'none';
                    piece.style.backgroundColor = 'transparent';
                }
            }
        }
    }
    else {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                if (game.board[i][j][1] !== '') {
                    var piece = document.getElementById(i.toString() + '-' + j.toString());
                    piece.textContent = game.board[i][j][1];
                    piece.style.color = game.board[i][j][0];
                    piece.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
                    piece.style.borderRadius = '50%';
                    piece.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
                }
                else {
                    var piece = document.getElementById(i.toString() + '-' + j.toString());
                    piece.textContent = '';
                    piece.style.color = 'transparent';
                    piece.style.outline = 'none';
                    piece.style.borderRadius = 'none';
                    piece.style.backgroundColor = 'transparent';
                }
            }
        }
    }
}

function undo() {
    if (game.step === 0) {
        return;
    }
    game.undo();
    set_board_by_game(game);
}
