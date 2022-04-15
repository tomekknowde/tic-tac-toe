import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export const useLocalStorageState = <T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] => {
  const [squares, setSquares] = useState<T>(() => JSON.parse(localStorage.getItem(key) || '') || initialState);

  useEffect(() => {
    localStorage.setItem('squares', JSON.stringify(squares));
  }, [key, squares]);

  return [squares, setSquares];
}