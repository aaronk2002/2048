import './App.css';
import Board from './Modules/Board.js';
import React, { useState } from 'react';

function App() {
  // Set up states.
  const testBoard = [
    [2,4,2,4],
    [4,2,4,2],
    [2,4,2,4],
    [4,2,4,2]
  ];
  const zeroBoard = [
    [0,2,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  const [board, setBoard] = useState(zeroBoard);
  const [game, setGame] = useState(true);


  // Create helper functions for moving tiles.
  const moveAny = (list) => {
    // Given a row or column, return the result of
    // performing a move towards the zero index.
    let ix = 0, jx = 0, newList = [0,0,0,0];
    while (jx < 4) {
      if (list[jx] === 0) {
        jx += 1;
        continue;
      }
      if (newList[ix] === 0) {
        newList[ix] = list[jx];
      }
      else {
        if (newList[ix] === list[jx]) {
          newList[ix] *= 2;
          ix += 1
        }
        else {
          ix += 1
          newList[ix] = list[jx];
        }
      }
      jx += 1
    }
    return newList
  };
  const flip = (board) => {
    // Flip a board along the vertical axis.
    let newBoard = []
    for (let ix = 0; ix < 4; ix += 1) {
        newBoard.push([]);
        for (let jx = 0; jx < 4; jx += 1) {
            newBoard[ix].push(board[ix][3-jx])
        }
    }
    return newBoard;
  };
  const transpose = (board) => {
    // Transpose a board.
    let newBoard = []
    for (let ix = 0; ix < 4; ix += 1) {
        newBoard.push([]);
        for (let jx = 0; jx < 4; jx += 1) {
            newBoard[ix].push(board[jx][ix])
        }
    }
    return newBoard;
  };
  const moveUp = (board) => {
    console.log('Up');
    let newBoard = transpose(board);
    newBoard = moveLeft(newBoard);
    newBoard = transpose(newBoard)
    return newBoard;
  };
  const moveDown = (board) => {
    console.log('Down');
    let newBoard = transpose(board);
    newBoard = moveRight(newBoard);
    newBoard = transpose(newBoard)
    return newBoard;
  };
  const moveLeft = (board) => {
    console.log('Left');
    return [moveAny(board[0]), moveAny(board[1]),
    moveAny(board[2]), moveAny(board[3])];
  };
  const moveRight = (board) => {
    console.log('Right');
    let newBoard = flip(board);
    newBoard = moveLeft(newBoard);
    newBoard = flip(newBoard)
    return newBoard;
  };


  // Create helper function for adding tile.
  const addTile = () => {
    let i, j, hasZero = false;
    // Check if there is a zero in the board.
    for (let ix = 0; ix < 4; ix += 1) {
      for (let jx = 0; jx < 4; jx += 1) {
        if (board[ix][jx] === 0) {
          hasZero = true;
          break;
        }
      }
      if (hasZero) {
        break;
      }
    }
    if (!hasZero) {
        return;
    }
    // If there is a zero, randomly pick unoccupied cell.
    do {
      i = Math.floor(Math.random() * 4);
      j = Math.floor(Math.random() * 4);
    } while (board[i][j] !== 0)
    // Create new board.
    let newBoard = [];
    for (let ix = 0; ix < 4; ix += 1) {
      newBoard.push([]);
      for (let jx = 0; jx < 4; jx += 1) {
        newBoard[ix].push(board[ix][jx]);
      }
    }
    // Modify new board to add cell.
    newBoard[i][j] = Math.floor(Math.random() * 2) * 2 + 2;
    setBoard(newBoard);
  }


  // Create functions for detecting game over.
  const compareBoards = (board, otherBoard) => {
    // Compares two boards, and detect whether they are different.
    let sameBoard = true
    for (let ix = 0; ix < 4; ix += 1) {
      for (let jx = 0; jx < 4; jx += 1) {
        if (board[ix][jx] !== otherBoard[ix][jx]) {
          sameBoard = false;
          break;
        }
      }
      if (!sameBoard) {
        break;
      }
    }
    return sameBoard;
  };
  const changeGameOver = () => {
    // Change the game state to game over if no new moves
    // are possible.
    const diffUp = !compareBoards(board, moveUp(board));
    const diffDown = !compareBoards(board, moveDown(board));
    const diffLeft = !compareBoards(board, moveLeft(board));
    const diffRight = !compareBoards(board, moveRight(board));
    const zero = compareBoards(board, zeroBoard);
    if (!(diffUp || diffDown || diffLeft || diffRight || zero)) {
      setGame(false);
    }
  };


  // Create functions that links keypress with action.
  const action = (move) => {
    // Given a move, change the game state accordingly.
    const newBoard = move(board);
    console.log('newBoard');
    console.log(newBoard[0]);
    console.log(newBoard[1]);
    console.log(newBoard[2]);
    console.log(newBoard[3]);
    setBoard(move(board));
    console.log('board');
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
    console.log(board[3]);
    console.log('');
    //addTile();
    //changeGameOver();
  };
  const upPress = () => {
    setBoard(moveUp(board));
    changeGameOver();
    addTile();
  };
  const downPress = () => {
    setBoard(moveDown(board));
    changeGameOver();
    addTile();
  };
  const leftPress = () => {
    setBoard(moveLeft(board));
    changeGameOver();
    addTile();
  };
  const rightPress = () => {
    setBoard(moveRight(board));
    changeGameOver();
    addTile();
  };



  return (
    <div>
      <div className='fullscreen bgColor centerObject flexColumn'>
        <h1 className='title'>2048</h1>
        <Board boardState={board} />
        <span>
          <button onClick={upPress}>Up</button>
          <button onClick={downPress}>Down</button>
          <button onClick={leftPress}>Left</button>
          <button onClick={rightPress}>Right</button>
        </span>
        {game ? <></> : <>Game Over</>}
      </div>
    </div>
  );
}

export default App;
