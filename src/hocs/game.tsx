import React, {Context, useContext, useEffect, useState} from 'react';
import {CellStatus} from '../components/Cell/Cell';
import {useBoard} from './board';

const DEFAULT_TOTAL_MINE_COUNT = 10;
const DEFAULT_BOARD_SIZE = 10;

interface GameContextProps {
  totalMineCount: number;
  boardSize: number;
}

export interface CellProps {
  status: CellStatus;
  hasMine: boolean;
  neighborhoodMineCount: number;
}

const defaultGameContext: GameContextProps = {
  totalMineCount: DEFAULT_TOTAL_MINE_COUNT,
  boardSize: DEFAULT_BOARD_SIZE,
};

const GameContext: Context<GameContextProps> =
  React.createContext(defaultGameContext);

const useGame = () => useContext(GameContext);

const WithGame = ({children}: any) => {
  const {setupBoard, board, boardSize} = useBoard();

  const [totalMineCount, setTotalMineCount] = useState(
    DEFAULT_TOTAL_MINE_COUNT
  );

  const init = () => {
    setupBoard();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <GameContext.Provider value={{totalMineCount, boardSize}}>
      {children}
    </GameContext.Provider>
  );
};

export {WithGame, useGame};
