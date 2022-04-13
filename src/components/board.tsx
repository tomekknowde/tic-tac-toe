import React, {useState} from 'react';
import {FC} from 'react';
import {Square} from './square';
import styled from '@emotion/styled';


export const BoardRow = styled.div`
  display: flex;
`;

export const Board: FC = () => {
  const squaresGrid = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));

  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const selectSquare = (index: number) => {
    if (winner || squares[index]) {
      return;
    }
    setSquares(prevState => prevState.map((square, squareIndex) => index === squareIndex ? nextValue : square));
  }

  const reset = () => {
    setSquares(Array(9).fill(''));
  }

  return (
    <>
      <div>{status}</div>
      {squaresGrid.map((row, rowIndex) =>
        <BoardRow key={rowIndex}>
          {row.map(squareIndex =>
            <Square key={squareIndex} value={squares[squareIndex]} onClick={() => selectSquare(squareIndex)}/>)}
        </BoardRow>
      )}
      <button onClick={() => reset()}>Reset</button>
    </>
  );
};

function calculateNextValue(squares: string[]): string {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateStatus(winner: string | null, squares: string[], nextValue: string): string {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

function calculateWinner(squares: string[]): string | null {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}