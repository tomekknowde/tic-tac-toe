import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {emptyBoard} from '../services/game.service';

export const useLocalStorageState = <T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(emptyBoard)) || initialState);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}