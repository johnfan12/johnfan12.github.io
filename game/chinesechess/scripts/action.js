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
        this.player = 'black'
        this.recoder = [];
        this.eaten = '';
    }


    makeMove(fplace, nplace) {
        if (this.board[nplace[0]][nplace[1]] === '將' || this.board[nplace[0]][nplace[1]] === '帥') {
            this.isGameOver = true;
        }
        if (this.board[nplace[0]][nplace[1]] !== '') {
            this.eaten = this.board[nplace[0]][nplace[1]];
        }
        var temp = this.board[fplace[0]][fplace[1]];
        this.board[fplace[0]][fplace[1]] = '';
        this.board[nplace[0]][nplace[1]] = temp;
        this.step++;
        this.isPlayerTurn = !this.isPlayerTurn;
        this.recoder.push([fplace, nplace]);
    }

    undo() {
        if (this.step === 0) {
            return;
        }
        this.step--;
        var fplace = this.recoder[this.step][0];
        var nplace = this.recoder[this.step][1];
        var temp = this.board[nplace[0]][nplace[1]];
        this.board[nplace[0]][nplace[1]] = this.eaten;
        this.board[fplace[0]][fplace[1]] = temp;
        this.isPlayerTurn = !this.isPlayerTurn;
        this.recoder.pop();
        return [this.eaten, nplace, fplace];
    }

        

    reset() {
        this.board = new Array(11);
        for (let i = 0; i < 10; i++) {
            this.board[i] = new Array(9);
        }
        this.isPlayerTurn = true;
        this.isGameOver = false;
        this.step = 0;
        this.choosing = null;
        this.player = 'black'
    }

    check_empty(row, col) {
        if (this.board[row][col] === '') {
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
            if (this.board[i][col] === '') {
                continue;
            }
            else if (this.board[i][col] !== '帥') {
                return false;
            }
            else if (this.board[i][col] === '帥') {
                return true;
            }
        }
        return false;
    }

    shuai_is_face_to_face(row, col) {
        for (let i = row + 1; !this.check_bounary(i, col); i++) {
            if (this.board[i][col] === '') {
                continue;
            }
            else if (this.board[i][col] !== '將') {
                return false;
            }
            else if (this.board[i][col] === '將') {
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
        if (this.check_bounary(row + count, col) || this.board[row + count][col] !== '將') {
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
        if (this.check_bounary(row - count, col) || this.board[row - count][col] !== '帥') {
            return true;
        }
        return false;
    }



    get_available_moves(row, col) {
        var available_moves = [];

        if (this.board[row][col] === '兵'){
            available_moves = this.get_available_moves_for_bing(row, col);
        }
        else if (this.board[row][col] === '卒') {
            available_moves =  this.get_available_moves_for_zu(row, col);
        }
        else if (this.board[row][col] === '炮'){
            available_moves  = this.get_available_moves_for_pao(row, col);
        }
        else if (this.board[row][col] === '車'){
            available_moves = this.get_available_moves_for_che(row, col);
        }
        else if (this.board[row][col] === '馬'){
            available_moves = this.get_available_moves_for_ma(row, col);
        }
        else if (this.board[row][col] === '象'){
            available_moves = this.get_available_moves_for_xiangb(row, col);
        }
        else if (this.board[row][col] === '相'){
            available_moves = this.get_available_moves_for_xiangr(row, col);
        }
        else if (this.board[row][col] === '士'){
            available_moves = this.get_available_moves_for_shib(row, col);
        }
        else if (this.board[row][col] === '仕'){
            available_moves = this.get_available_moves_for_shir(row, col);
        }
        else if (this.board[row][col] === '將'){
            available_moves = this.get_available_moves_for_jiang(row, col);
        }
        else if (this.board[row][col] === '帥') {
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
set_board(game);
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
                cell.style.fontSize = '42px';
                game.choosing = [9-row, 8-col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black')
                {
                    cell.style.fontSize = '42px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else{
                if(game.isPlayerTurn && cell.style.color === 'black')
                {
                cell.style.fontSize = '42px';
                game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red')
                {
                    cell.style.fontSize = '42px';
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
                fpiece.style.fontSize = '33px';
                cell.style.fontSize = '42px';
                game.choosing = [9-row, 8-col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col))
                {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '33px';
                    cell.style.fontSize = '33px';
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
                fpiece.style.fontSize = '33px';
                cell.style.fontSize = '42px';
                game.choosing = [row, col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col))
                {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '33px';
                    cell.style.fontSize = '33px';
                }
                else{
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger() || black_king_in_danger()) {
                setTimeout(function(){confirm('將軍！');}, 100);
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
                cell.style.fontSize = '42px';
                game.choosing = [9-row, 8-col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'black')
                {
                    cell.style.fontSize = '42px';
                    game.choosing = [9 - row, 8 - col];
                }
            }
            else{
                if(game.isPlayerTurn && cell.style.color === 'black')
                {
                cell.style.fontSize = '42px';
                game.choosing = [row, col];
                }
                else if (!game.isPlayerTurn && cell.style.color === 'red')
                {
                    cell.style.fontSize = '42px';
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
                fpiece.style.fontSize = '33px';
                cell.style.fontSize = '42px';
                game.choosing = [9-row, 8-col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === 9 - row && x[1] === 8 - col))
                {
                    game.makeMove(game.choosing, transform(row, col));
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '33px';
                    cell.style.fontSize = '33px';
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
                fpiece.style.fontSize = '33px';
                cell.style.fontSize = '42px';
                game.choosing = [row, col];
                return;
                }
                const moves = game.get_available_moves(game.choosing[0], game.choosing[1]);
                if (moves.some(x => x[0] === row && x[1] === col))
                {
                    game.makeMove(game.choosing, [row, col]);
                    piece_move(fpiece, cell);
                    game.choosing = null;
                    fpiece.style.fontSize = '33px';
                    cell.style.fontSize = '33px';
                }   
                else{
                    alert('似乎不可以下在這裏喔');
                }
            }
            if (red_king_in_danger() || black_king_in_danger()) {
                //過一會消失的提示
                setTimeout(function(){confirm('將軍！');}, 100);

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
            piece = document.getElementById(i.toString() + '-' + j.toString()).textContent;
            game.board[i][j] = piece;
            if (piece !== '') {
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
    const chessPieces = [
        "車", "馬", "相", "仕", "帥", "仕", "相", "馬", "車",
        "", "", "", "", "", "", "", "", "",
        "", "炮", "", "", "", "", "", "炮", "",
        "兵", "", "兵", "", "兵", "", "兵", "", "兵",
        "", "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "", "",
        "卒", "", "卒", "", "卒", "", "卒", "", "卒",
        "", "炮", "", "", "", "", "", "炮", "",
        "", "", "", "", "", "", "", "", "",
        "車", "馬", "象", "士", "將", "士", "象", "馬", "車"
    ];
    const chessBoard = document.getElementById("chessBoard");
    chessBoard.innerHTML = "";
    var river = document.createElement("div");
    river.id = "river";
    river.className = "river";
    river.innerHTML = "楚河   漢界";
    chessBoard.appendChild(river);
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 9; col++) {
            const pieceIndex = row * 9 + col;
            const piece = chessPieces[pieceIndex];
            
            var div = document.createElement("div");
            div.id = `${row}-${col}`;
            if((row === 1 && col === 4) || (row === 8 && col === 4)){
                div.className = "x_piece";
                div.innerHTML = piece;
            }
            else{
                div.className = "piece";
                div.innerHTML = piece;
            }
            if (piece !== "") {
                div.style.color = (row < 5) ? "red" : "black";
            }
            chessBoard.appendChild(div);
        }
    }
            game.reset();
            set_board(game);
            if (game.player === 'red') {
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
            else
                return;
    
}

function red_king_in_danger(){
    for (let i=0; i<10; i++){
        for (let j=0; j<9; j++){
            if (document.getElementById(i.toString() + '-' + j.toString()).style.color === 'black'){
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
                    if (game.board[moves[i][0]][moves[i][1]] === '帥'){
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
            if (document.getElementById(i.toString() + '-' + j.toString()).style.color === 'red'){
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
                    if (game.board[moves[i][0]][moves[i][1]] === '將'){
                        return true;
                    }
                }
            }
        }
    }
}

function undo(){
    if (game.step === 0) {
        return;
    }
    var eaten = game.undo();
    if (game.player === 'red') {
        eaten[1] = transform(eaten[1][0], eaten[1][1]);
        eaten[2] = transform(eaten[2][0], eaten[2][1]);
    }
    var fplace = document.getElementById(eaten[2][0].toString() + '-' + eaten[2][1].toString());
    var nplace = document.getElementById(eaten[1][0].toString() + '-' + eaten[1][1].toString());
    piece_move(nplace, fplace);
    if (eaten[0] !== '') {
       nplace.textContent = eaten[0];
    }
}