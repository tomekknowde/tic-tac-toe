import React, { FC } from 'react';
import { Board } from './board';
import { calculateNextValue, calculateStatus, calculateWinner, emptyBoard } from '../services/game.service';
import { useLocalStorageState } from '../hooks/use-local-storage-state';

export const Game: FC = () => {

    const {
        addToSquareHistory,
        currentSquare,
        moveBack,
        moveForward,
        reset
    } = useLocalStorageState<string[]>('squares', 'squaresIndex', emptyBoard);
    const winner = calculateWinner(currentSquare);
    const nextValue = calculateNextValue(currentSquare);
    const status = calculateStatus(winner, currentSquare, nextValue);

    const selectSquare = (index: number) => {
        if (winner || currentSquare[index]) {
            return;
        }

        const newSquare = currentSquare.map((value: string, squareIndex: number) => index === squareIndex ? nextValue : value)
        addToSquareHistory(newSquare);
    }

    return (
        <>
            <div>{status}</div>
            <Board squares={currentSquare} selectSquare={(squareIndex) => selectSquare(squareIndex)}/>
            <button onClick={() => reset()}>Reset</button>
            <button onClick={() => !winner && moveBack()}>Undo</button>
            <button onClick={() => !winner && moveForward()}>Redo</button>
        </>
    );
};
