import React, {useState} from 'react';
import {FC} from 'react';
import {Square} from './square';
import styled from '@emotion/styled';


export const BoardRow = styled.div`
  display: flex;
`;

interface BoardProps {
  squares: string[];
  selectSquare: (squareIndex: number) => void;
}

export const Board: FC<BoardProps> = ({squares, selectSquare}) => {
  const squaresGrid = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

  return (
    <>
      {squaresGrid.map((row, rowIndex) =>
        <BoardRow key={rowIndex}>
          {row.map(squareIndex =>
            <Square key={squareIndex} value={squares[squareIndex]} onClick={() => selectSquare(squareIndex)}/>)}
        </BoardRow>
      )}
    </>
  );
};
