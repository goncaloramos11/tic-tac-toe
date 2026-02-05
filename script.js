function GameController(){
    
    const players = ["X", "O"];
    let board = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer = players[0];
    let endGame = false;
    let draw = false;
    let xPoints = 0;
    let oPoints = 0;
    
    const cleanGame = () => { 
        board = ["", "", "", "", "", "", "", "" ,""]
        endGame = false;
        currentPlayer = players[0];
        draw = false;
    };

    const getCurrentPlayer = () => currentPlayer;

    const getXPoints = () => xPoints;

    const getOPoints = () => oPoints;

    const getBoard = () => board;

    const getEndGame = () => endGame;

    const checkDraw = () => endGame && draw;

    const changePlayer = () => {currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0]}

    const playRound = (index) => {

        if (endGame) return;


        if (board[index] === "") {
            board[index] = currentPlayer;
            
            verifyStateGame();

            if(!endGame){
                changePlayer(); 
            }
            console.log("Tabuleiro atual:", board);

        } else {
            console.log("Posição Ocupada! Tente novamente.");
        }
    

    };

    const endWithWinner = () => {
        endGame = true;
        currentPlayer === "X" ? xPoints++ : oPoints++;
    };

    const verifyStateGame = () => {
        //check the winner in a row
        if(    (board[0] == board[1] && board[1] == board[2] && board[0] != "")
            || (board[3] == board[4] && board[4] == board[5] && board[3] != "")
            || (board[6] == board[7] && board[7] == board[8] && board[6] != "") 
        ){

            console.log(`Jogo acabou! Vencedor é ${currentPlayer}`);

            endWithWinner();
        }

        // check the winner in column
        else if(   (board[0] == board[3] && board[3] == board[6] && board[0] != "")
                 ||(board[1] == board[4] && board[4] == board[7] && board[1] != "")
                 ||(board[2] == board[5] && board[5] == board[8] && board[2] != "")  
        ){
            console.log(`Jogo acabou! Vencedor é ${currentPlayer}`);

            endWithWinner();
        }
        //check the winner in diagonal
        else if(  (board[0] == board[4] && board[4] == board[8] && board[0] != "")
                ||(board[2] == board[4] && board[4] == board[6] && board[2] != "")
        ){
            console.log(`Jogo acabou! Vencedor é ${currentPlayer}`);

            endWithWinner();
        }

        //check if it was a draw
        else if(!board.includes("")){
            endGame = true;
            draw = true;
        }

        

    }


    return { cleanGame, playRound, getBoard, getCurrentPlayer,getEndGame, checkDraw, getXPoints, getOPoints};
};


function DisplayController(game){
    const squares = document.querySelectorAll(".square");
    const restart = document.querySelector(".restart");
    const playerActual = document.querySelector(".turn-player");
    const playerXStatus = document.querySelector(".score-x");
    const playerOStatus = document.querySelector(".score-o");
    let index = 0;


    const displayTurnPlayer = () => {

        if(game.checkDraw()){
            playerActual.textContent = `It was a draw!`;
        }

        else if(game.getEndGame()){
            playerActual.textContent = `Player ${game.getCurrentPlayer()}'s win the game`;
            game.getCurrentPlayer() == "X" ? playerXStatus.textContent = `X : ${game.getXPoints()}` : playerOStatus.textContent = `O : ${game.getOPoints()}`;
        }
        else{
            playerActual.textContent = `Player ${game.getCurrentPlayer()}'s turn`;
        }
    }

    const displaySquare = (e) => {
        for(i = 0; i < squares.length; i++){
            if(e.target.classList == squares[i].classList){
                index = i;
            }
        }

        game.playRound(index);
        displayTurnPlayer();

        e.target.textContent = game.getBoard()[index];

    }


    const restartGame = () => {
        game.cleanGame();
        displayTurnPlayer();

        squares.forEach((square) => square.textContent = "");
    }


    squares.forEach((square) => {
        square.addEventListener("click", displaySquare);
    })

    restart.addEventListener("click", restartGame);

}






const game = GameController();
DisplayController(game);



