let gameBoard = (function(){
    'use strict';
    var gameBoardArr = ["","","","","","","","",""];


    var gameBoardDisplay = () => {

        let gameboxes = [...document.querySelectorAll(".td")];
        ////////console.log(gameboxes)
        gameboxes.forEach(Element=> {
            let index = Element.id;

            ////////console.log(gameBoard.gameBoardArr);
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

let gamePlayer = (name, symbol) => {
    let wins = 0;
    let losses = 0;
    let draws = 0;

    function getPlayerName() {
        //////console.log(this);
    }
    return {name, symbol, wins, losses, draws, getPlayerName};
}

let displayController = (function () {


    gameBoard.gameBoardDisplay();

    let _count = 0;
    
    let _gameDiv = document.querySelector(".game-board");

    let _welcomePanel = document.querySelector(".welcome");

    let _selectionBtn1 = document.querySelector(".btn-1");
    let _selectionBtn2 = document.querySelector(".btn-2");

    let _playerNameBox = document.querySelector(".name-form");
    let _playerNameAI = document.querySelector(".name-form-ai");

    let _player1 = "";
    let _player2 = "";

    let chanceFlag = true;

    var _resetBoard = (optionalArg) => {
        gameBoard.gameBoardArr = ["","","","","","","","",""];
        gameBoard.gameBoardDisplay();
        _renderNameAndStats();
        _count = 0;
        
        if (optionalArg == "AI") {

            setTimeout(function () {
                if (!chanceFlag){
            
                    _cellNo = GetRandomMove(gameBoard.gameBoardArr);
                
                    
                    gameBoard.gameBoardArr[_cellNo] = "O";
                    _count = _count + 1
                    chanceFlag = true;
                    gameBoard.gameBoardDisplay();
                    _renderNameAndStats();
                }
            }, 50);

        }
       
    }

    var _congratulateWinner = (winnerName) => {

        
        playNextRoundBtn = document.createElement("button");
        playNextRoundBtn.classList.add("play-next-round");
        playNextRoundBtn.textContent = "Play Next Round";

        ////////console.log("winnerbox");
        winnerBox = document.querySelector(".congratulations");
        winnerBox.textContent = "";

        fullscreenbox = document.querySelector(".full-screenbox");
        fullscreenbox.classList.remove("dont-show");
        congratulationMsg = document.createElement("h1");

        if (winnerName == "DRAW") {
            congratulationMsg.textContent = `Game Drawn`;
        } else {
            congratulationMsg.textContent = `congratulations ${winnerName}!`
            if (winnerName == "AI") {
                congratulationMsg.textContent = `You lose!`;
                playNextRoundBtn.textContent = "Please Try Again";
                
            }
           
        };

        winnerBox.appendChild(congratulationMsg);

       
        winnerBox.appendChild(playNextRoundBtn);

        setTimeout(function(){
            playNextRoundBtn.addEventListener("click", () => {
                
                fullscreenbox.classList.add("dont-show");
            });
        }, 50);
        
        

    };

    var _checkWinner = (whatMark) => {
    
       
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

        for (let i = 0; i < winningConfigs.length; i ++) {
           
            if (gameBoard.gameBoardArr[winningConfigs[i][0]] == whatMark && gameBoard.gameBoardArr[winningConfigs[i][1]] == whatMark && gameBoard.gameBoardArr[winningConfigs[i][2]] == whatMark) {

                return "win"
            } ;

            
        };
        
        return false;
    };
    function _nextStep() {
        //_gameDiv.classList.remove("dont-show");
        
        _welcomePanel.classList.add("dont-show");
        _playerNameBox.classList.remove("dont-show");
        _getPlayerNames();
       
    };

    function _nextStepAI() {
        //_gameDiv.classList.remove("dont-show");
        
        _welcomePanel.classList.add("dont-show");
        _playerNameAI.classList.remove("dont-show");
        _getPlayerNameAI();
       
    }

    function _getPlayerNames() {
        
        let _player1Input = document.getElementById("player-1");
        let _player2Input = document.getElementById("player-2");

        _player1Input.value = ""
        _player2Input.value = ""

        let _playBtn = document.querySelector(".play-game-btn");
        let _skipBtn = document.querySelector(".skip-btn");

        _skipBtn.addEventListener("click", () => {
            _player1 = gamePlayer("Player 1", "X");
            _player2 = gamePlayer("Player 2", "O");

            _gameDiv.classList.remove("dont-show");
            _playerNameBox.classList.add("dont-show");
            
            _player1Input.value = "";
            _player2Input.value = "";

            _renderNameAndStats();
        })


        _playBtn.addEventListener("click", ()=>{
            let _player1Name = _player1Input.value;
            let _player2Name = _player2Input.value;

            
            if (_player1Name == "" || _player2Name == "") {
                alert("fields Cant be empty");
            } else {
                _player1 = gamePlayer(_player1Name, "X");
                _player2 = gamePlayer(_player2Name, "O");
    
                _gameDiv.classList.remove("dont-show");
                _playerNameBox.classList.add("dont-show");
            }

            _player1Input.value = ""
            _player2Input.value = ""
            _renderNameAndStats();
        })
        

    };

    function _updateGameStats(player, win, loss, draw) {
        player.wins += win;
        player.losses += loss;
        player.draws += draw

        _renderNameAndStats();
    }

    function _renderNameAndStats() {

        let _player1NameBox = document.getElementById("player-1-name");
        let _player2NameBox = document.getElementById("player-2-name");


        _player1NameBox.textContent = _player1.name;
        _player2NameBox.textContent = _player2.name;

        let _player1Wins = document.querySelector(".player-1-win");
        let _player1losses = document.querySelector(".player-1-losses");
        let _player1Draws = document.querySelector(".player-1-draws");

        _player1Wins.textContent = _player1.wins;
        _player1losses.textContent = _player1.losses;
        _player1Draws.textContent = _player1.draws;

        let _player2Wins = document.querySelector(".player-2-win");
        let _player2losses = document.querySelector(".player-2-losses");
        let _player2Draws = document.querySelector(".player-2-draws");

        _player2Wins.textContent = _player2.wins;
        _player2losses.textContent = _player2.losses;
        _player2Draws.textContent = _player2.draws;

        let _player1ColorDiv = document.querySelector(".player-1");
        let _player2ColorDiv = document.querySelector(".player-2");

        if (chanceFlag) {
            _player1ColorDiv.classList.add("chance");
            _player2ColorDiv.classList.remove("chance");
        } else {
            _player2ColorDiv.classList.add("chance");
            _player1ColorDiv.classList.remove("chance");
        }
    }

    function _HumanVHuman() {
        _renderNameAndStats();

        chanceFlag = true;

        cells = [...document.querySelectorAll(".td")];
        
        cells.forEach(cell =>{
            cell.addEventListener("click", ()=>{
                
                if (chanceFlag && gameBoard.gameBoardArr[cell.id] == "") {
                    gameBoard.gameBoardArr[cell.id] = "X";
                    _count = _count + 1
                    //////console.log(gameBoard.gameBoardArr);
                    chanceFlag = false;
                } else if (!chanceFlag && gameBoard.gameBoardArr[cell.id] == ""){
                    gameBoard.gameBoardArr[cell.id] = "O";
                    _count = _count + 1
                    chanceFlag = true;
                }
                
                gameBoard.gameBoardDisplay();
                //////console.log(chanceFlag);
                ////console.log(gameBoard.gameBoardArr)
                setTimeout(function(){
                    let winStatus = _checkWinner(chanceFlag?"O":"X");

                    if (winStatus == "win" && chanceFlag == false) {
                        _congratulateWinner(_player1.name);

                        _resetBoard();
                        
                        _updateGameStats(_player1, 1, 0, 0);
                        _updateGameStats(_player2, 0, 1, 0);

                        

                    } else if (winStatus == "win" && chanceFlag == true) {
                        _congratulateWinner(_player2.name);

                        _resetBoard();

                        _updateGameStats(_player2, 1, 0, 0);
                        _updateGameStats(_player1, 0, 1, 0);
                        
                    } else if (_count == 9) {
                        _congratulateWinner("DRAW");

                        _resetBoard();

                        _updateGameStats(_player1, 0, 0, 1);
                        _updateGameStats(_player2, 0, 0, 1);

                        
                    };
                    _renderNameAndStats();
                }, 50);

                
                ////console.log(_count);
                
                

            });
        });
    };

    function _getPlayerNameAI() {
        
        let _playerAIInput = document.getElementById("player-ai");

        _playerAIInput.value = ""
        

        let _playBtn = document.querySelector(".play-game-btn-ai");
        let _skipBtn = document.querySelector(".skip-btn-ai");

        _skipBtn.addEventListener("click", () => {
            _player1 = gamePlayer("Player 1", "X");
            _player2 = gamePlayer("AI", "O");

            _gameDiv.classList.remove("dont-show");
            _playerNameAI.classList.add("dont-show");
            
            _playerAIInput.value = "";

            _renderNameAndStats();
        })


        _playBtn.addEventListener("click", ()=>{
            let _player1Name = _playerAIInput.value;
            let _player2Name = "AI";

            
            if (_player1Name == "" || _player2Name == "") {
                alert("field Cant be empty");
            } else {
                
                _player1 = gamePlayer(_player1Name, "X");
                _player2 = gamePlayer(_player2Name, "O");
    
                _gameDiv.classList.remove("dont-show");
                _playerNameAI.classList.add("dont-show");
            }

            _playerAIInput.value = ""
            _renderNameAndStats();
        })
        

    };

    function _checkDraw(state) {
        
        for (let i = 0; i < state.length; i ++) {
            if (state[i] == "") {
                return false;
            }
        }
        return true;
    }
    
    function _checkWin(state) {
        
        let winningConfigs = [
            [2, 5, 8],
            [0, 4, 8],
            [0, 1, 2],
            [0, 3, 6],
            [1, 4, 7],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];

        for (let i = 0; i < winningConfigs.length; i ++) {

            if (_checkDraw(state)) {
                
                return ["DRAW", "none"]
            }
           
            if (gameBoard.gameBoardArr[winningConfigs[i][0]] == "X" && gameBoard.gameBoardArr[winningConfigs[i][1]] == "X" && gameBoard.gameBoardArr[winningConfigs[i][2]] == "X") {

                return ["win", "X"];
            } else if (gameBoard.gameBoardArr[winningConfigs[i][0]] == "O" && gameBoard.gameBoardArr[winningConfigs[i][1]] == "O" && gameBoard.gameBoardArr[winningConfigs[i][2]] == "O") {

                return ["win", "O"];
            }

            
        };

        return ["none", "nome2"]


    }
    
    function GetRandomMove(state) {
        let _bestScore = Infinity;
        let _bestPosition;
        for (let i = 0; i < state.length; i ++) {
            
            let score;
            if (state[i] == "") {
                state[i] = "O";
                score = _miniMax(state, true);

                
                if (score < _bestScore) {
                    _bestScore = score;
                    _bestPosition = i
                    //console.log(i)
                }
                state[i] = ""
            }
        }
        
        return _bestPosition;

    };
    function getScore(endWinner) {
        if (endWinner == "X") {
            return 1
        } else if (endWinner == "O") {
            return -1
        } else if (endWinner == "none") {
            return 0;
        }
    }
    let _miniMax = (state, isMaximizing) => {

        let _terminalConditionCheck;


        _terminalConditionCheck = _checkWin(state);
        ////console.log(state)
        let _terminalConditionCheckResult = _terminalConditionCheck[0];
        let _terminalConditionCheckWinner = _terminalConditionCheck[1];

        if (_terminalConditionCheckResult == "win" || _terminalConditionCheckResult == "DRAW") {
            let score = getScore(_terminalConditionCheckWinner);
            return score;

        } else if (isMaximizing) {
            let score = -Infinity;
            for (let i = 0; i < state.length; i ++) {
                if (state[i] == "") {
                    state[i] = "X";
                    score = Math.max(score, _miniMax(state, false));
                    state[i] = ""
                }
            }

            return score
        } else {
            let score = Infinity;
            for (let i = 0; i < state.length; i ++) {
                if (state[i] == "") {
                    state[i] = "O";
                    score = Math.min(score, _miniMax(state, true));
                    state[i] = "";
                }
            }
            return score;
        }
        
    }


    function HumanVAi() {
        _renderNameAndStats();

        chanceFlag = true;

        cells = [...document.querySelectorAll(".td")];
        
        cells.forEach(cell =>{
            cell.addEventListener("click", ()=>{
                
                if (chanceFlag && gameBoard.gameBoardArr[cell.id] == "") {
                    gameBoard.gameBoardArr[cell.id] = "X";
                    _count = _count + 1
                    
                    chanceFlag = false;
                    setTimeout(function () {
                        if (!chanceFlag){
                 
                            _cellNo = GetRandomMove(gameBoard.gameBoardArr);
                        
                           
                            gameBoard.gameBoardArr[_cellNo] = "O";
                            _count = _count + 1
                            chanceFlag = true;
                            gameBoard.gameBoardDisplay();
                        }
                    }, 50);
                    
                };

                gameBoard.gameBoardDisplay();
                //console.log("count1", _count)
                setTimeout(function(){
                    let winStatus = _checkWinner("X");
                    if (winStatus == "win") {
                        chanceFlag = false;
                    }else if (winStatus != "win") {
                        winStatus = _checkWinner("O");
                        chanceFlag = true;
                    };
                    //console.log("count", _count)
                    if (winStatus == "win" && chanceFlag == false) {
                        _congratulateWinner(_player1.name);

                        _resetBoard("AI");
                        
                        _updateGameStats(_player1, 1, 0, 0);
                        _updateGameStats(_player2, 0, 1, 0);
                        chanceFlag = false;

                        

                    } else if (winStatus == "win" && chanceFlag == true) {
                        _congratulateWinner(_player2.name);
                        ////console.log("coming here");
                        _resetBoard("AI");

                        _updateGameStats(_player2, 1, 0, 0);
                        _updateGameStats(_player1, 0, 1, 0);
                        chanceFlag = true;
                        
                    } else if (_count == 10) {
                        ////console.log(_count, "hereee")
                        _congratulateWinner("DRAW");

                        _resetBoard("AI");

                        _updateGameStats(_player1, 0, 0, 1);
                        _updateGameStats(_player2, 0, 0, 1);

                        
                    };
                    _renderNameAndStats();
                }, 50);

                
                ////////console.log(_count);
                
                

            });
        });
    }

    function startGame() {
        _selectionBtn1.addEventListener("click", ()=>{
            setTimeout(function(){
                let gameMode = "HVH";
                _nextStep();
                _HumanVHuman();
                ////////console.log(gameMode);
                }, 50);   
        });
        _selectionBtn2.addEventListener("click", ()=>{
            setTimeout(function(){
                let gameMode = "HVA";
                _nextStepAI();
                HumanVAi()
                ////////console.log(gameMode);
                }, 50);   
        });
    };
   

    return {startGame};

})();



displayController.startGame();

