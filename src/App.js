import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(8).fill(Array(8).fill(0))); // 初期状態の盤面
  const [player, setPlayer] = useState(1); // 現在のプレイヤー
  const [stake, setStake] = useState(1000); // 賭け金
  const [playerKeys, setPlayerKeys] = useState([]); // プレイヤーの公開鍵
  const [message, setMessage] = useState("Initializing game...");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // ゲームの初期化: サーバーから初期データを取得
    axios.get("http://localhost:5000/init").then((response) => {
      setBoard(response.data.board);
      setPlayerKeys(response.data.playerKeys);
      setMessage("Game started. Player 1's turn.");
    });
  }, []);

  const handleClick = (row, col) => {
    if (gameOver || board[row][col] !== 0 || player !== 1) {
      setMessage("Invalid move. Try again.");
      return;
    }

    // サーバーに手を送信して検証
    axios
      .post("http://localhost:5000/move", {
        board,
        player,
        move: [row, col],
        playerKeys,
        stake,
      })
      .then((response) => {
        if (response.data.newBoard) {
          setBoard(response.data.newBoard);
          setPlayer(player === 1 ? 2 : 1);
          setMessage(`Player ${player === 1 ? 2 : 1}'s turn.`);
        } else if (response.data.result) {
          setGameOver(true);
          const winner = response.data.result.winner;
          setMessage(
            winner === 0
              ? "Game is a draw! Stakes returned to both players."
              : `Player ${winner} wins! Total reward: ${response.data.result.reward} mojo.`
          );
        }
      })
      .catch(() => setMessage("Invalid move. Try again."));
  };

  return (
    <div className="App">
      <h1>Reversi</h1>
      <p>{message}</p>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${
                cell === 1
                  ? "player1"
                  : cell === 2
                  ? "player2"
                  : ""
              }`}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
