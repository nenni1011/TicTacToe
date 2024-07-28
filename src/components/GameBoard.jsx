




export default function GameBoard ({ onSelect, board }) {
  

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare (rowIndex, colIndex) {
  //   console.log('-------------')
  //   setGameBoard((previousBoard) => {
  //     const newTemporaryBoard = [...previousBoard.map((innerArray) => [...innerArray])];
  //     newTemporaryBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return newTemporaryBoard;
  //   })

  //   onSelect();
  // }

  return (
    <ol id = 'game-board'>
      {board.map((row, rowIndex) => (
        <li key = {rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key = {colIndex}>
                <button onClick = { () => onSelect(rowIndex, colIndex) } disabled = { playerSymbol !== null }>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))} 
    </ol>
  )
}