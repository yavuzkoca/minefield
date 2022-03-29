import React from 'react';
import {CellProps} from '../../hocs/game';

export enum CellStatus {
  OPEN,
  FLAGGED,
  CLOSED,
}

export const Cell = (props: CellProps) => {
  const {neighborhoodMineCount, hasMine, status} = props;

  return <div className="cell">{neighborhoodMineCount}</div>;
};
