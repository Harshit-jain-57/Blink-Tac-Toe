import styled from '@emotion/styled';
import Cell from './Cell';
import { theme } from '../styles/theme';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  background: ${theme.colors.dodgerBlue};
  padding: 8px;
  border-radius: 12px;
  box-shadow: ${theme.shadows.neon} ${theme.colors.dodgerBlue};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.hotPink};
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Board = ({ board, onCellClick, lastVanishedCell, winningCombination }) => {
  return (
    <BoardContainer>
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isDisabled={index === lastVanishedCell}
          isWinning={winningCombination?.includes(index)}
        />
      ))}
    </BoardContainer>
  );
};

export default Board; 