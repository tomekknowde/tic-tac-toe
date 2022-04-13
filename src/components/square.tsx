import {FC} from 'react';
import styled from '@emotion/styled';


const SquareButton = styled.button`
  border: 1px solid black;
  width: 30px;
  min-height: 30px;
  margin: 3px;
  background: none;
`;

interface SquareProps {
  value: string;
  onClick: () => void;
}

export const Square: FC<SquareProps> = ({value, onClick}) => {
  return <SquareButton onClick={() => onClick()}>{value}</SquareButton>
};