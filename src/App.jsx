import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import { useState } from 'react'
import { WINNING_COMBINATIONS } from './winning_combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
  'X' : 'Player 1',
  'O' : 'Player 2',
}

const initialGameBoard =  [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let activePlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    activePlayer = 'O';
  }

  return activePlayer;
}

function deriveWinner (gameBoard, playerInfo) {
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =  gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol == secondSquareSymbol && secondSquareSymbol == thirdSquareSymbol){
      winner = playerInfo[firstSquareSymbol];
    }
  }

  return winner;
}


function derviveGameBoard(gameTurns) {
  
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];

  for(const turn of gameTurns){
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [playerInfo, setPlayerInfo] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = derviveGameBoard(gameTurns);

  let winner = deriveWinner(gameBoard, playerInfo);  

  const hasDraw = gameTurns.length == 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    })
  }

  function restartGame () {
    setGameTurns([]);
  }

  function handleChangePlayerInfo(symbol, newName){
    setPlayerInfo(prevInfo => {
      return {
        ...prevInfo,
        [symbol] : newName,
      }
    })
  }


  return (
   <main>
    <div id = "game-container">
      <ol id = 'players' className = 'highlight-player'>
        <Player initialName = {PLAYERS.X} symbol = 'X' isActive={ activePlayer === 'X' } onChangeName = { handleChangePlayerInfo } />
        <Player initialName = {PLAYERS.O} symbol = 'O' isActive={ activePlayer === 'O' } onChangeName = { handleChangePlayerInfo } />
      </ol>
      { (winner || hasDraw)  && <GameOver winner = { winner } restartGame = { restartGame } /> }
      <GameBoard onSelect = {handleSelectSquare} board = { gameBoard } />
    </div>

    <Log turns = { gameTurns } />
   </main>
  )
}

export default App
