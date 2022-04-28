import React, {FC} from 'react';
import {Square} from './square';
import styled from '@emotion/styled';

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
`;

interface BoardProps {
  squares: string[];
  selectSquare: (squareIndex: number) => void;
}

export const Board: FC<BoardProps> = ({squares, selectSquare}) => {
  return (
    <BoardGrid>
      {squares.map((square, index) => <Square key={index} value={square} onClick={() => selectSquare(index)}/>)}
    </BoardGrid>
  );
};
