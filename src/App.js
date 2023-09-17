import React from "react";
import { useState } from "react";


function Square({ value, onSquareClick }) {
  // value is a prop being passed down from the Board component and onSquareClick is 
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

export default function Board() {
  // creates array with 9 elements set them all to null
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true) // set X as first move by default flipped to see which players goes next

  function handleClick(i) {
    // check if square already had X or O value if yes return early so board state is not updated
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    // updates the squares array which has the Board state
    const nextSquares = squares.slice() // used to create a copy of the squares array rather than mutating the original array
    // nextSquares[0] = 'X'//hardcoded means can only add x to top left square instead becomes this
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  const winner = calculateWinner(squares)
  let status

  winner ? status = `Winner: ${winner}` : status = `Next player: ${xIsNext ? "X" : "O"}`

  // Board needs to pass value prop down to each of the squares it renders
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}