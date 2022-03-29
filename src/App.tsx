import React from 'react';
import './styles/main.scss';
import {Cell} from './components/Cell/Cell';
import {useBoard} from './hocs/board';

function App() {
  const {board} = useBoard();

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i.toString()}>
          {row.map((cell, j) => (
            <React.Fragment key={j.toString()}>
              <Cell
                status={cell.status}
                hasMine={cell.hasMine}
                neighborhoodMineCount={cell.neighborhoodMineCount}
              />
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
