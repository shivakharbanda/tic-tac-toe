let gameBoard = (function(){
    'use strict';
    var gameBoardArr = ["","","","","","","","",""];


    var gameBoardDisplay = () => {

        let gameboxes = [...document.querySelectorAll("td")];

        gameboxes.forEach(Element=> {
            let index = Element.id;

            //console.log(Element.textContent);
            Element.textContent = gameBoardArr[index];
        })

    }

    return {gameBoardDisplay, gameBoardArr};
})();

let gamePlayer = (playerSymbol) => {
    let player = playerSymbol;

    return {player}
}

let displayController = (function () {
    let _gameDiv = document.querySelector(".game-board");

    let _welcomePanel = document.querySelector(".welcome");

    let _selectionBtn1 = document.querySelector(".btn-1");
    let _selectionBtn2 = document.querySelector(".btn-2");


    var _checkWinner = (whatMark) => {
        let arr = gameBoard.gameBoardArr;
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
            if (arr[winningConfigs[i][0]] == whatMark && arr[winningConfigs[i][1]] == whatMark && arr[winningConfigs[i][2]] == whatMark) {

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

        cells = [...document.querySelectorAll("td")];
        
        cells.forEach(cell =>{
            cell.addEventListener("click", ()=>{
                if (chanceFlag && gameBoard.gameBoardArr[cell.id] == "") {
                    gameBoard.gameBoardArr[cell.id] = "X";
                    chanceFlag = false;
                } else if (!chanceFlag && gameBoard.gameBoardArr[cell.id] == ""){
                    gameBoard.gameBoardArr[cell.id] = "O";
                    chanceFlag = true;
                }
                
                
                gameBoard.gameBoardDisplay();
                console.log(chanceFlag);
                let winStatus = _checkWinner(chanceFlag?"O":"X");

                if (winStatus == "win") {
                    alert("player won");
                };

            });
        });
    };

    function startGame() {
        _selectionBtn1.addEventListener("click", ()=>{
            let gameMode = "HVH";
            _nextStep();
            HumanVHuman();
            //console.log(gameMode);

        });
        _selectionBtn2.addEventListener("click", ()=>{
            let gameMode = "HVA";
            _nextStep();
            //console.log(gameMode);

        });
    };
    
    return {startGame, HumanVHuman};

})();

let newGameBoard = gameBoard;

gameBoard.gameBoardDisplay();

displayController.startGame();