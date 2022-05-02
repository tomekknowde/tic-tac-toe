import { useEffect, useState } from 'react';
import { emptyBoard } from '../services/game.service';

interface useLocalStorageReturnState<T> {
    addToSquareHistory: (x: T) => void,
    currentSquare: T;
    moveBack: () => void,
    moveForward: () => void,
    reset: () => void,
};

export const useLocalStorageState = <T = string[]>(key: string, indexKey: string, initialState: T): useLocalStorageReturnState<T> => {
    const oldState = localStorage.getItem(key);
    let oldIndex = Number(localStorage.getItem(indexKey) || 0);
    if (oldState && oldIndex > (JSON.parse(oldState).length - 1)) oldIndex = JSON.parse(oldState).length - 1;

    const [state, setState] = useState<T[]>(() => oldState ? JSON.parse(oldState) : [initialState]);
    const [currentIndex, setCurrentIndex] = useState<number>(oldIndex);

    const [currentSquare, setCurrentSquare] = useState<T>(() => state[currentIndex] || initialState);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
        localStorage.setItem(indexKey, JSON.stringify(currentIndex));
        setCurrentSquare(state[currentIndex]);
    }, [key, indexKey, state, currentIndex]);

    const addToSquareHistory = (square: T) => {
        const newIndex = currentIndex + 1;

        setCurrentSquare(square);

        setState((prevState: T[]): T[] => {
            return [...prevState.slice(0, newIndex), square];
        })
        setCurrentIndex(newIndex);
    };

    const moveBack = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentSquare(state[newIndex]);
            setCurrentIndex(newIndex);
        }
    }

    const moveForward = () => {
        if (currentIndex < (state.length - 1)) {
            setCurrentIndex((currentIndex) => {
                const newIndex = currentIndex + 1;
                setCurrentSquare(state[newIndex]);
                return newIndex;
            });
        }
    }

    const reset = () => {
        setCurrentIndex(0);
        setState([emptyBoard] as any)
    }

    return {
        addToSquareHistory,
        currentSquare,
        moveBack,
        moveForward,
        reset,
    };
}
