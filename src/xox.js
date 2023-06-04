import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] === null && !winner && player === 'X') {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer('O');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setWinner(winner);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    } else if (player === 'O') {
      const bestMove = findBestMove(board);
      const newBoard = [...board];
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
      setPlayer('X');
    }
  }, [board, player]);

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const findBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const scores = {
    X: -1,
    O: 1,
    Draw: 0,
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = checkWinner();

    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }

      return bestScore;
    }
  };

  return (
    <div className="tictactoe">
        <div>
        <div className="board">
          {board.map((value, index) => (
            <div key={index} className="square-container">
              {renderSquare(index)}
            </div>
          ))}
        </div>
        </div>

        {winner &&
        <div>
        {winner !== 'Draw' ? (
          <h2>{winner} WON</h2>
        ) : (
          <h2>It's a draw!</h2>
        )}
        <button id='restartbutton' onClick={resetGame}>Restart</button>
      </div>
        }

    </div>
  );
};

export default App;
