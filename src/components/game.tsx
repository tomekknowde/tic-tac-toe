import React, {FC, useEffect, useState} from 'react';
import {Board} from './board';
import {calculateNextValue, calculateStatus, calculateWinner} from '../services/game.service';
import {useLocalStorageState} from '../hooks/use-local-storage-state';

export const Game: FC = () => {

  const [squares, setSquares] = useLocalStorageState<string[]>('squares', Array(9).fill(''));

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
      <Board squares={squares} selectSquare={(squareIndex) => selectSquare(squareIndex)}/>
      <button onClick={() => reset()}>Reset</button>
    </>
  );
};