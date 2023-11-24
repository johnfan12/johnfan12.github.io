class Game {
    constructor(document) {
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
        this.isPlayerTurn = true;
        this.isGameOver = false;
        this.step = 0;
        this.choosing = null;
        this.player = 'black'
        this.recorder = [];
    }

    makeMove(fplace, nplace) {
        if (this.board[nplace[0]][nplace[1]][1] === '將' || this.board[nplace[0]][nplace[1]][1] === '帥') {
            this.isGameOver = true;
        }
        var temp = this.board[fplace[0]][fplace[1]][1];
        this.board[fplace[0]][fplace[1]][1] = '';
        this.board[nplace[0]][nplace[1]][1] = temp;
        this.isPlayerTurn = !this.isPlayerTurn;
        this.recorder[this.step] = [fplace, nplace];
        this.step++;
    }

    replay_move(fplace, nplace) {
        var temp = this.board[fplace[0]][fplace[1]][1];
        this.board[fplace[0]][fplace[1]][1] = '';
        this.board[nplace[0]][nplace[1]][1] = temp;
        this.isPlayerTurn = !this.isPlayerTurn;
    }

    undo() {
        if (this.step === 0) {
            return;
        }
        this.reset();
        for (let i=0; i<this.step-1;i++)
        {
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
        if(row < 5){
            if (!this.check_bounary(row + 1, col)) {
                available_moves.push([row + 1, col]);
            }
        }
        else{
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
        if(row > 4){
            if (!this.check_bounary(row - 1, col)) {
                available_moves.push([row - 1, col]);
            }
        }
        else{
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

    get_available_moves_for_pao(row, col) {
        var available_moves = [];
        var count = 1;
        while(!this.check_bounary(row + count, col)){
            if(this.check_empty(row + count, col)){
                available_moves.push([row + count, col]);
            }
            else{
                count++;
                break;
            }
            count++;
        }
        while(!this.check_bounary(row + count, col)){
            if(!this.check_empty(row + count, col)){
                available_moves.push([row + count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col)){
            if(this.check_empty(row - count, col)){
                available_moves.push([row - count, col]);
            }
            else{
                count++;
                break;
            }
            count++;
        }
        while(!this.check_bounary(row - count, col)){
            if(!this.check_empty(row - count, col)){
                available_moves.push([row - count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row, col + count)){
            if(this.check_empty(row, col + count)){
                available_moves.push([row, col + count]);
            }
            else{
                count++;
                break;
            }
            count++;
        }
        while(!this.check_bounary(row, col + count)){
            if(!this.check_empty(row, col + count)){
                available_moves.push([row, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row, col - count)){
            if(this.check_empty(row, col - count)){
                available_moves.push([row, col - count]);
            }
            else{
                count++;
                break;
            }
            count++;
        }
        while(!this.check_bounary(row, col - count)){
            if(!this.check_empty(row, col - count)){
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
        while(!this.check_bounary(row + count, col)){
            if(this.check_empty(row + count, col)){
                available_moves.push([row + count, col]);
            }
            else{
                available_moves.push([row + count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col)){
            if(this.check_empty(row - count, col)){
                available_moves.push([row - count, col]);
            }
            else{
                available_moves.push([row - count, col]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row, col + count)){
            if(this.check_empty(row, col + count)){
                available_moves.push([row, col + count]);
            }
            else{
                available_moves.push([row, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row, col - count)){
            if(this.check_empty(row, col - count)){
                available_moves.push([row, col - count]);
            }
            else{
                available_moves.push([row, col - count]);
                break;
            }
            count++;
        }
        
        return available_moves;
    }

    get_available_moves_for_ma(row, col) {
        var available_moves = [];
        if(!this.check_bounary(row + 2, col + 1) && this.check_empty(row + 1, col)){
            available_moves.push([row + 2, col + 1]);
        }
        if(!this.check_bounary(row + 2, col - 1) && this.check_empty(row + 1, col)){
            available_moves.push([row + 2, col - 1]);
        }
        if(!this.check_bounary(row - 2, col + 1) && this.check_empty(row - 1, col)){
            available_moves.push([row - 2, col + 1]);
        }
        if(!this.check_bounary(row - 2, col - 1) && this.check_empty(row - 1, col)){
            available_moves.push([row - 2, col - 1]);
        }
        if(!this.check_bounary(row + 1, col + 2) && this.check_empty(row, col + 1)){
            available_moves.push([row + 1, col + 2]);
        }
        if(!this.check_bounary(row - 1, col + 2) && this.check_empty(row, col + 1)){
            available_moves.push([row - 1, col + 2]);
        }
        if(!this.check_bounary(row + 1, col - 2) && this.check_empty(row, col - 1)){
            available_moves.push([row + 1, col - 2]);
        }
        if(!this.check_bounary(row - 1, col - 2) && this.check_empty(row, col - 1)){
            available_moves.push([row - 1, col - 2]);
        }
        return available_moves;
    }

    get_available_moves_for_xiangr(row, col) {
        var available_moves=[];
        var count = 1;
        while(!this.check_bounary(row + count, col + count)){
            if(this.check_empty(row + count, col + count) && row + count < 4){
                available_moves.push([row + count, col + count]);
            }
            else if (row + count <= 4) {
                available_moves.push([row + count, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col - count)){
            if(this.check_empty(row - count, col - count)){
                available_moves.push([row - count, col - count]);
            }
            else{
                available_moves.push([row - count, col - count]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row + count, col - count)) {
            if (this.check_empty(row + count, col - count) && row + count < 4) {
                available_moves.push([row + count, col - count]);
            }
            else if (row + count <= 4) {
                available_moves.push([row + count, col - count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col + count)){
            if(this.check_empty(row - count, col + count)){
                available_moves.push([row - count, col + count]);
            }
            else{
                available_moves.push([row - count, col + count]);
                break;
            }
            count++;
        }
        return available_moves;
    }

    get_available_moves_for_xiangb(row, col) {
        var available_moves=[];
        var count = 1;
        while(!this.check_bounary(row + count, col + count)){
            if(this.check_empty(row + count, col + count)){
                available_moves.push([row + count, col + count]);
            }
            else{
                available_moves.push([row + count, col + count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col - count)){
            if(this.check_empty(row - count, col - count) && row - count > 5){
                available_moves.push([row - count, col - count]);
            }
            else if (row - count > 4) {
                available_moves.push([row - count, col - count]);
                break;
            }
            count++;
        }
        count = 1;
        while (!this.check_bounary(row + count, col - count)) {
            if (this.check_empty(row + count, col - count)) {
                available_moves.push([row + count, col - count]);
            }
            else {
                available_moves.push([row + count, col - count]);
                break;
            }
            count++;
        }
        count = 1;
        while(!this.check_bounary(row - count, col + count)){
            if(this.check_empty(row - count, col + count) && row - count > 5){
                available_moves.push([row - count, col + count]);
            }
            else if (row - count > 4) {
                available_moves.push([row - count, col + count]);
                break;
            }
            count++;
        }
        return available_moves;
    }

    get_available_moves_for_shib(row, col) {
        var available_moves = [];
        if(!this.check_bounary(row + 1, col + 1) &&  col + 1 > 2 && col + 1 < 6){
            available_moves.push([row + 1, col + 1]);
        }
        if(!this.check_bounary(row + 1, col - 1) &&  col - 1 > 2 && col - 1 < 6){
            available_moves.push([row + 1, col - 1]);
        }
        if(!this.check_bounary(row - 1, col + 1) && row - 1 > 6 && col + 1 > 2 && col + 1 < 6){
            available_moves.push([row - 1, col + 1]);
        }
        if(!this.check_bounary(row - 1, col - 1) && row - 1 > 6 && col - 1 > 2 && col - 1 < 6){
            available_moves.push([row - 1, col - 1]);
        }
        return available_moves;
    }

    get_available_moves_for_shir(row, col) {
        var available_moves = [];
        if(!this.check_bounary(row + 1, col + 1) &&  row + 1 < 3 && col + 1 > 2 && col + 1 < 6){
            available_moves.push([row + 1, col + 1]);
        }
        if(!this.check_bounary(row + 1, col - 1) &&  row + 1 < 3 && col - 1 > 2 && col - 1 < 6){
            available_moves.push([row + 1, col - 1]);
        }
        if(!this.check_bounary(row - 1, col + 1) && col + 1 > 2 && col + 1 < 6){
            available_moves.push([row - 1, col + 1]);
        }
        if(!this.check_bounary(row - 1, col - 1) && col - 1 > 2 && col - 1 < 6){
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
        if(!this.check_bounary(row + 1, col)){
            available_moves.push([row + 1, col]);
        }
        if(!this.check_bounary(row - 1, col) && row - 1 > 6){
            available_moves.push([row - 1, col]);
        }
        if(!this.check_bounary(row, col + 1) && col + 1 < 6 && !this.jiang_is_face_to_face(row, col + 1)){
            available_moves.push([row, col + 1]);
        }
        if(!this.check_bounary(row, col - 1) && col - 1 > 2 && !this.jiang_is_face_to_face(row, col - 1)){
            available_moves.push([row, col - 1]);
        }
        return available_moves;
    }

    get_available_moves_for_shuai(row, col) {
        var available_moves = [];
        if(!this.check_bounary(row + 1, col) && row + 1 < 3){
            available_moves.push([row + 1, col]);
        }
        if(!this.check_bounary(row - 1, col)){
            available_moves.push([row - 1, col]);
        }
        if(!this.check_bounary(row, col + 1)  && col + 1 < 6 && !this.shuai_is_face_to_face(row, col + 1)){
            available_moves.push([row, col + 1]);
        }
        if(!this.check_bounary(row, col - 1) && col - 1 > 2 && !this.shuai_is_face_to_face(row, col - 1)){
            available_moves.push([row, col - 1]);
        }
        return available_moves;
    }

    moveable(row, col) {
        var count = 1;
        while(!this.check_bounary(row + count, col)){
            if(this.check_empty(row + count, col)){
                count++;
            }
            else{
                break;
            }
        }
        if (this.check_bounary(row + count, col) || this.board[row + count][col][1] !== '將') {
            return true;
        }
        count = 1;
        while(!this.check_bounary(row - count, col)){
            if(this.check_empty(row - count, col)){
                count++;
            }
            else{
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

        if (this.board[row][col][1] === '兵'){
            available_moves = this.get_available_moves_for_bing(row, col);
        }
        else if (this.board[row][col][1] === '卒') {
            available_moves =  this.get_available_moves_for_zu(row, col);
        }
        else if (this.board[row][col][1] === '炮'){
            available_moves  = this.get_available_moves_for_pao(row, col);
        }
        else if (this.board[row][col][1] === '車'){
            available_moves = this.get_available_moves_for_che(row, col);
        }
        else if (this.board[row][col][1] === '馬'){
            available_moves = this.get_available_moves_for_ma(row, col);
        }
        else if (this.board[row][col][1] === '象'){
            available_moves = this.get_available_moves_for_xiangb(row, col);
        }
        else if (this.board[row][col][1] === '相'){
            available_moves = this.get_available_moves_for_xiangr(row, col);
        }
        else if (this.board[row][col][1] === '士'){
            available_moves = this.get_available_moves_for_shib(row, col);
        }
        else if (this.board[row][col][1] === '仕'){
            available_moves = this.get_available_moves_for_shir(row, col);
        }
        else if (this.board[row][col][1] === '將'){
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
}

function piece_move(fpiece, npiece){
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

function is_same_color(piece1, piece2){
    if(piece1.style.color === piece2.style.color)
        return true;
    return false;
}

var game = new Game(document);
set_board_by_game(game);
function handleCellClick(event) {
    if (event.target.classList.contains('piece')) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        const row = parseInt(cellId[0]);
        const col = parseInt(cellId[2]);
        if(game.choosing === null){
            if (game.player === 'red'){
                if(game.isPlayerTurn && cell.style.color === 'red')
                {
                cell.style.fontSize = '43px';
                game.choosing = [9-row, 8-col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black')
                {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else{
                if(game.isPlayerTurn && cell.style.color === 'black')
                {
                cell.style.fontSize = '43px';
                game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red')
                {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
            }
        }
        else{
            if (game.player === 'red'){
                choose = transform(game.choosing[0], game.choosing[1]);
                const id = choose[0] + '-' + choose[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) 
                {
                game.choosing = null;
                fpiece.style.fontSize = '34px';
                cell.style.fontSize = '43px';
                game.choosing = [9-row, 8-col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col))
                {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                }
                else{
                    alert('似乎不可以下在這裏喔');
                }

            }
            else{
                const id = game.choosing[0] + '-' + game.choosing[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) 
                {
                game.choosing = null;
                fpiece.style.fontSize = '34px';
                cell.style.fontSize = '43px';
                game.choosing = [row, col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col))
                {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                }
                else{
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger()) {
                setTimeout(function(){confirm('红方正在被將軍！');}, 100);
            }
            else if(black_king_in_danger()){
                setTimeout(function(){confirm('黑方正在被將軍！');}, 100);
            }
            if (game.isGameOver) {
                setTimeout(function(){confirm('游戲結束！');}, 100);
            }
        }
    }
    if (event.target.classList.contains('x_piece')) {
        const cellId = event.target.id;
        const cell = document.getElementById(cellId);
        const row = parseInt(cellId[0]);
        const col = parseInt(cellId[2]);
        if(game.choosing === null){
            if (game.player === 'red'){
                if(game.isPlayerTurn && cell.style.color === 'red')
                {
                cell.style.fontSize = '43px';
                game.choosing = [9-row, 8-col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black')
                {
                    cell.style.fontSize = '43px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else{
                if(game.isPlayerTurn && cell.style.color === 'black')
                {
                cell.style.fontSize = '43px';
                game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red')
                {
                    cell.style.fontSize = '43px';
                    game.choosing = [row, col];
                }
            }
        }
        else{
            if (game.player === 'red'){
                choose = transform(game.choosing[0], game.choosing[1]);
                const id = choose[0] + '-' + choose[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) 
                {
                game.choosing = null;
                fpiece.style.fontSize = '34px';
                cell.style.fontSize = '43px';
                game.choosing = [9-row, 8-col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col))
                {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                }
                else{
                    alert('似乎不可以下在這裏喔');
                }
            }
            else{
                const id = game.choosing[0] + '-' + game.choosing[1];
                var fpiece = document.getElementById(id);
                if (fpiece.style.color === cell.style.color) 
                {
                game.choosing = null;
                fpiece.style.fontSize = '34px';
                cell.style.fontSize = '43px';
                game.choosing = [row, col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col))
                {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '34px';
                    cell.style.fontSize = '34px';
                }   
                else{
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger()) {
                setTimeout(function(){confirm('红方正在被將軍！');}, 100);
            }
            else if(black_king_in_danger()){
                setTimeout(function(){confirm('黑方正在被將軍！');}, 100);
            }
            if (game.isGameOver) {
                setTimeout(function(){confirm('游戲結束');}, 100);
            }
        }
    }
    }


function set_board(game){
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

function red_player(){
    if (game.step !== 0)
    {
        alert('请先重置棋盘');
        return;
    }
    if(game.player === 'black')
        game.player = 'red';
    else
        game.player = 'black';
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

function transform(row, col){
    return [9-row, 8-col];
}

function reset() {
    game.whole_reset();
    set_board_by_game(game);
    
}

function red_king_in_danger(){
    for (let i=0; i<10; i++){
        for (let j=0; j<9; j++){
            if (game.board[i][j][0] === 'black'){
                if(game.player === 'red'){
                    row = 9-i;
                    col = 8-j;
                }
                else{
                    row = i;
                    col = j;
                }
                const moves = game.get_available_moves(row, col);
                for (let i=0; i<moves.length; i++){
                    if (game.board[moves[i][0]][moves[i][1]][1] === '帥'){
                        return true;
                    }
                }
            }
        }
    }
}

function black_king_in_danger(){
    for (let i=0; i<10; i++){
        for (let j=0; j<9; j++){
            if (game.board[i][j][0] === 'red'){
                if(game.player === 'red'){
                    row = 9-i;
                    col = 8-j;
                }
                else{
                    row = i;
                    col = j;
                }
                const moves = game.get_available_moves(row, col);
                for (let i=0; i<moves.length; i++){
                    if (game.board[moves[i][0]][moves[i][1]][1] === '將'){
                        return true;
                    }
                }
            }
        }
    }
}

function set_board_by_game(game){
    if(game.player === 'red'){
        var reds = [];
        for (let i=0; i<10; i++){
            for (let j=0; j<9; j++){
                if (game.board[i][j][1] !== ''){
                    reds = transform(i, j);
                    var piece = document.getElementById(reds[0].toString() + '-' + reds[1].toString());
                    piece.textContent = game.board[i][j][1];
                    piece.style.color = game.board[i][j][0];
                    piece.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
                    piece.style.borderRadius = '50%';
                    piece.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
                }
                else{
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
        else{
            for (let i=0; i<10; i++){
                for (let j=0; j<9; j++){
                    if (game.board[i][j][1] !== ''){
                        var piece = document.getElementById(i.toString() + '-' + j.toString());
                        piece.textContent = game.board[i][j][1];
                        piece.style.color = game.board[i][j][0];
                        piece.style.outline = '2px ridge rgba(175, 111, 8, 0.678)';
                        piece.style.borderRadius = '50%';
                        piece.style.backgroundColor = 'rgba(175, 111, 8, 0.678)';
                    }
                    else{
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

function undo(){
    if (game.step === 0) {
        return;
    }
    game.undo();
    set_board_by_game(game);
}