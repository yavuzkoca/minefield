import React, {Context, useContext, useEffect, useState} from 'react';
import {CellStatus} from '../components/Cell/Cell';

const DEFAULT_BOARD_SIZE = 10;

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

  const setupBoard = () => {
    const rows = new Array(boardSize).fill(null);
    const board = rows.map(_ => new Array(boardSize).fill(defaultCell));
    setBoard(board);
  };

  return (
    <BoardContext.Provider value={{setupBoard, board, boardSize}}>
      {children}
    </BoardContext.Provider>
  );
};

export {WithBoard, useBoard};
