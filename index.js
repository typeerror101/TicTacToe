
function Gameboard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for(let i = 0; i < rows ; i++){
        board[i] = [];
        for(let j = 0; j < cols ; j++){
            board[i].push(Cell());
        }
    }

    const pinToken =  (row, column, player) => {
        if(board[row][column].getValue() == 0){
            board[row][column].addToken(player)
        }else{
            console.log('Token already exists');
        }
    }
    
    const getBoard = () => board; //for UI

    const printBoard = () => {
        const printFinalBoard = board.map((row) => row.map((cell) => cell.getValue));
        console.log(printFinalBoard);
    }

    return{
        pinToken,
        getBoard,
        printBoard
    };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return{
        addToken,
        getValue
    };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 'O'
        },
        {
            name: playerTwoName,
            token: 'X'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s Turn. `);
        playRound();
    }

    const playRound = () => {
            const Row = prompt('Enter which row to pin token');
            const Col = prompt('Enter which column to pin token');

            console.log(`Dropping pin in column ${Col} and row ${Row} by ${getActivePlayer().name}`);
            board.pinToken(Row, Col, getActivePlayer().token)

            switchPlayerTurn();
            printNewRound();
    }

    printNewRound();       
    
    return{
        playRound,
        getActivePlayer
    };
}

const game = GameController();

game.printNewRound();