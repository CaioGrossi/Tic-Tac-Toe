
const Player = (name, marker) => {

    return {name, marker}
}

const gameBoard = (() => {

    let table = [0,1,2,3,4,5,6,7,8];
    let tableCells = document.querySelectorAll("#table div");

    const addListeners = () => {

        gameBoard.tableCells.forEach(cell => {
            cell.addEventListener("click", function (event) {

                if (pushMarkerOnTable(event.target)) {

                    if (checkRows() || checkColumns() || checkDiagonal()) {
                        
                        if (game.currentRound == "X") {
                            displayController.pushWinner(game.playerOne.name);
                            makeTableFull();
                        }

                        else {
                            displayController.pushWinner(game.playerTwo.name);
                            makeTableFull();
                        }

                        game.currentRound = "finish";

                    }

                    if (isTableFull()) {
                        displayController.itsAtie();
                        game.currentRound = "finish";
                        makeTableFull();
                    }

                    if (game.currentRound != "finish"){
                        game.updateCurrentRound();
                        displayController.updateRound();
                    }
                }

            })
        })
    }
    
    const pushMarkerOnTable = (currentCell) => {

        if (currentCell.className == "full") {
            return false;
        }
        
        else {
            table[currentCell.id] = game.currentRound;
            currentCell.textContent = game.currentRound;
            currentCell.classList.add("full");
            return true;
        }
    }

    function makeTableFull () {
        gameBoard.tableCells.forEach(cell => {

            if (cell.className != "full") {
                cell.classList.add("full");
            }
        })
    }


    const checkRows = () => {

        if (gameBoard.table[0] == gameBoard.table[1] &&
            gameBoard.table[1] == gameBoard.table[2]) {

                return true;
            }
        
        else if (gameBoard.table[3] == gameBoard.table[4] &&
                gameBoard.table[4] == gameBoard.table[5]) {

                    return true;
            }
        
        else if (gameBoard.table[6] == gameBoard.table[7] &&
                gameBoard.table[7] == gameBoard.table[8]) {

                    return true;
            }

        else {
            return false;
        }
        
    }

    const checkColumns = () => {

        if (gameBoard.table[0] == gameBoard.table[3] &&
            gameBoard.table[3] == gameBoard.table[6]) {

                return true;
            }

        else if (gameBoard.table[1] == gameBoard.table[4] &&
                gameBoard.table[4] == gameBoard.table[7]) {
                    return true;
            }
        
        else if (gameBoard.table[2] == gameBoard.table[5] &&
                gameBoard.table[5] == gameBoard.table[8]) {
                    return true;
            }

        else {
            return false;
        }
    }

    const checkDiagonal = () => {

        if (gameBoard.table[0] == gameBoard.table[4] &&
            gameBoard.table[4] == gameBoard.table[8]) {

                return true;
            }
        
        else if (gameBoard.table[2] == gameBoard.table[4] &&
            gameBoard.table[4] == gameBoard.table[6]) {

                return true;
            }
        else {
            return false;
        }
    }

    const isTableFull = () => {
        
        for (let i = 0; i < 9; i++) {
            if (gameBoard.table[i] != "X" && gameBoard.table[i] != "O") {
                return false;
            }
        }

        return true;
    }

    return {table, tableCells, addListeners}
})();

const formControler = (() => {

    let playerOneName = "";
    let playerTwoName = "";

    const verifyData = () => {

        formControler.playerOneName = document.querySelector("#namePlayerOneData").value;
        formControler.playerTwoName = document.querySelector("#namePlayerTwoData").value;

        if (formControler.playerOneName != "" && formControler.playerTwoName != "") {
            return true;
        }

        else {
            return false;
        }
    }

    return {playerOneName, playerTwoName, verifyData};
})()

const displayController = (() => {

    let roundDisplay = document.querySelector("#round");
    let displayPlayerOne = document.querySelector("#namePlayerOneDisplay");
    let displayPlayerTwo = document.querySelector("#namePlayerTwoDisplay");

    const putPlayersName = (PlayerOneName,PlayerOneMarker, PlayerTwoName, PlayerTwoMarker) => {

        displayPlayerOne.textContent = `${PlayerOneMarker} ${PlayerOneName}`;
        displayPlayerTwo.textContent = `${PlayerTwoName} ${PlayerTwoMarker}`;
    }

    const updateRound = () => {
        displayController.roundDisplay.textContent = game.currentRound;
    }

    const pushWinner = (winner) => {
        displayController.roundDisplay.textContent = `${winner} won the game!`;
    }

    const itsAtie = () => {
        displayController.roundDisplay.textContent = "It's a tie!";
    }

    return {roundDisplay, displayPlayerOne, displayPlayerTwo, putPlayersName, updateRound, pushWinner, itsAtie}

})();

const game = (() => {

    const pickRandomMarker = () => {
        let marker;

        if (Math.random() < 0.6) {
            marker = "X";
        }

        else {
            marker = "O"
        }

        return marker;
    }

    let currentRound = pickRandomMarker();
    let playerOne = {};
    let playerTwo = {};

    const startGame = () => {

        let startGameButton = document.querySelector("#start");
        let newGameButton = document.querySelector("#newGame");

        startGameButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (formControler.verifyData()) {

                game.playerOne = Player(formControler.playerOneName, "X");
                game.playerTwo = Player(formControler.playerTwoName, "O");

                displayController.putPlayersName(game.playerOne.name, game.playerOne.marker, 
                                                 game.playerTwo.name, game.playerTwo.marker);
                
                displayController.updateRound();

                gameBoard.addListeners();
            }

            else {
                alert("Please, enter valid values!");
            }

        })

        newGameButton.addEventListener("click", () => location.reload())
    }

    const updateCurrentRound = () => {
        
        if (game.currentRound == "X") {
            game.currentRound = "O";
        }

        else {
            game.currentRound = "X";
        }
    }

    return {currentRound, playerOne, playerTwo, startGame, updateCurrentRound}
})();

game.startGame();





