import React from "react";
import { useState } from "react";


function Square({ value, onSquareClick }) {
  // value is a prop being passed down from the Board component and onSquareClick is a function
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // check if square already had X or O value if yes return early so board state is not updated
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    // updates the squares array which has the Board state
    const nextSquares = squares.slice() // used to create a copy of the squares array rather than mutating the original array
    // nextSquares[0] = 'X'// hardcoded means can only add x to top left square instead becomes this
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    // replaced setSquares and setXIsNext with a single call to onPlay function
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status

  winner ? status = `Winner: ${winner}` : status = `Next player: ${xIsNext ? "X" : "O"}`

  // Board needs to pass value prop down to each of the squares it renders
  return (
    <>
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
    </>
  );
}
// one default export per file so game becomes top-level component
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  // track current step user is looking at
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  // instead of final move now tracking currentMove
  const currentSquares = history[currentMove]

  // will be called by Board component to update the game
  function handlePlay(nextSquares){
    // add nextSquares after history.slice so only keeping that part of old history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove){
    // update currentMove
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = `Go to game start`
    }

    return (
      // need to add a key
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
      {/* Passing xIsNext, currentSquares and handlePlay as props */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
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