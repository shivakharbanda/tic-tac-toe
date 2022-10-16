let gameBoard = (function(){
    'use strict';
    var gameBoardArr = ["","","","","","","","",""];


    var gameBoardDisplay = () => {

        let gameboxes = [...document.querySelectorAll(".td")];
        //console.log(gameboxes)
        gameboxes.forEach(Element=> {
            let index = Element.id;

            //console.log(gameBoard.gameBoardArr);
            if (gameBoard.gameBoardArr[index] == "X"){
                Element.textContent = "⨉"
            } else if (gameBoard.gameBoardArr[index] == "O") {
                Element.textContent = "◯"
            } else {
                Element.textContent = gameBoard.gameBoardArr[index];
            }
            
        })

    }

    return {gameBoardDisplay, gameBoardArr};
})();

let gamePlayer = (playerSymbol) => {
    let player = playerSymbol;

    return {player}
}

let displayController = (function () {

    let _count = 0;
    
    let _gameDiv = document.querySelector(".game-board");

    let _welcomePanel = document.querySelector(".welcome");

    let _selectionBtn1 = document.querySelector(".btn-1");
    let _selectionBtn2 = document.querySelector(".btn-2");

    var _resetBoard = () => {
        gameBoard.gameBoardArr = ["","","","","","","","",""];
        gameBoard.gameBoardDisplay();
        _count = 0;
    }

    var _congratulateWinner = (winnerName) => {


        
        playNextRoundBtn = document.createElement("button");
        playNextRoundBtn.classList.add("play-next-round")
        playNextRoundBtn.textContent = "Play Next Round"

        //console.log("winnerbox");
        winnerBox = document.querySelector(".congratulations");
        winnerBox.textContent = "";

        fullscreenbox = document.querySelector(".full-screenbox");
        fullscreenbox.classList.remove("dont-show");
        congratulationMsg = document.createElement("h1");

        if (winnerName == "DRAW") {
            congratulationMsg.textContent = `Game Drawn`;
        } else {
            congratulationMsg.textContent = `congratulations ${winnerName}!`
        };
       
    
        //console.log(referenceNode);
        winnerBox.appendChild(congratulationMsg);
        winnerBox.appendChild(playNextRoundBtn);

        setTimeout(function(){
            playNextRoundBtn.addEventListener("click", () => {
                setTimeout(5000);
                fullscreenbox.classList.add("dont-show");
            });
        }, 50);
        
        

    };

    var _checkWinner = (whatMark) => {
    
        //console.log(arr);
        let winningConfigs = [
            [2, 5, 8],
            [0, 4, 8],
            [0, 1, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ]

        for (i = 0; i < winningConfigs.length; i ++) {
            //console.log(winningConfigs[i][0])

            //console.log(arr[winningConfigs[i][0]]);
            //console.log(whatMark);
            //console.log(arr[winningConfigs[i][0]] == whatMark);
            if (gameBoard.gameBoardArr[winningConfigs[i][0]] == whatMark && gameBoard.gameBoardArr[winningConfigs[i][1]] == whatMark && gameBoard.gameBoardArr[winningConfigs[i][2]] == whatMark) {

                return "win"
            } ;

            
        };
        

    };
    function _nextStep() {
        _gameDiv.classList.remove("dont-show");
        _welcomePanel.classList.add("dont-show");
    }

    function HumanVHuman() {
        player1 = gamePlayer("X");
        player2 = gamePlayer("O");

        chanceFlag = true;

        cells = [...document.querySelectorAll(".td")];
        
        cells.forEach(cell =>{
            cell.addEventListener("click", ()=>{

                if (chanceFlag && gameBoard.gameBoardArr[cell.id] == "") {
                    gameBoard.gameBoardArr[cell.id] = "X";
                    _count = _count + 1
                    //console.log(gameBoard.gameBoardArr);
                    chanceFlag = false;
                } else if (!chanceFlag && gameBoard.gameBoardArr[cell.id] == ""){
                    gameBoard.gameBoardArr[cell.id] = "O";
                    _count = _count + 1
                    chanceFlag = true;
                }
                
                gameBoard.gameBoardDisplay();
                //console.log(chanceFlag);
                //console.log(gameBoard.gameBoardArr)
                setTimeout(function(){
                    let winStatus = _checkWinner(chanceFlag?"O":"X");

                    if (winStatus == "win" && chanceFlag == false) {
                        _congratulateWinner("Player 1");

                        _resetBoard();
                    } else if (winStatus == "win" && chanceFlag == true) {
                        _congratulateWinner("Player 2");
                        _resetBoard();
                    };
                }, 50);

                
                //console.log(_count);
                if (_count == 9) {
                    console.log("first here");
                    _congratulateWinner("DRAW");
                    _resetBoard();
                };
                

            });
        });
    };

    function startGame() {
        _selectionBtn1.addEventListener("click", ()=>{
            setTimeout(function(){
                let gameMode = "HVH";
                _nextStep();
                HumanVHuman();
                //console.log(gameMode);
                }, 50);   
        });
        
        _selectionBtn2.addEventListener("click", ()=>{
            let gameMode = "HVA";
            _nextStep();
            //console.log(gameMode);

        });
    };
    
    return {startGame, HumanVHuman, _count};

})();


gameBoard.gameBoardDisplay();

displayController.startGame();