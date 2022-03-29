import React, {Context, useContext, useEffect, useState} from 'react';
import {CellStatus} from '../components/Cell/Cell';
import {useRandomNumbers} from '../hooks/use-random-numbers';
import {useArray} from '../hooks/use-array';

const DEFAULT_BOARD_SIZE = 10;
const DEFAULT_TOTAL_MINE_COUNT = 10;

interface BoardContextProps {
  setupBoard: () => void;
  board: CellProps[][];
  boardSize: number;
}

export interface CellProps {
  status: CellStatus;
  hasMine: boolean;
  neighborhoodMineCount: number;
}

const defaultBoardContext: BoardContextProps = {
  setupBoard: () => null,
  board: [],
  boardSize: DEFAULT_BOARD_SIZE,
};

const defaultCell: CellProps = {
  hasMine: false,
  neighborhoodMineCount: 0,
  status: CellStatus.CLOSED,
};

const BoardContext: Context<BoardContextProps> =
  React.createContext(defaultBoardContext);

const useBoard = () => useContext(BoardContext);

const WithBoard = ({children}: any) => {
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);
  const [board, setBoard] = useState<CellProps[][]>([]);
  const {generateRandom2DIndexes} = useRandomNumbers();
  const {findNeighborhoods} = useArray();
  const [totalMineCount, setTotalMineCount] = useState(
    DEFAULT_TOTAL_MINE_COUNT
  );

  const placeMines = (_board: CellProps[][]) => {
    const indexes = generateRandom2DIndexes(boardSize, totalMineCount);
    indexes.map(index => {
      _board[index[0]][index[1]].hasMine = true;
      const neighborhoods = findNeighborhoods(_board, index[0], index[1]);
      neighborhoods.map(neighborhood => {
        _board[neighborhood[0]][neighborhood[1]].neighborhoodMineCount += 1;
      });
    });
  };

  const setupBoard = () => {
    const board = Array(boardSize)
      .fill(null)
      .map(() =>
        Array(boardSize)
          .fill(null)
          .map(() => ({...defaultCell}))
      );
    placeMines(board);
    setBoard(board);
  };

  return (
    <BoardContext.Provider value={{setupBoard, board, boardSize}}>
      {children}
    </BoardContext.Provider>
  );
};

export {WithBoard, useBoard};
