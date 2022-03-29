import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {WithGame} from './hocs/game';
import {WithBoard} from './hocs/board';

ReactDOM.render(
  <React.StrictMode>
    <WithBoard>
      <WithGame>
        <App />
      </WithGame>
    </WithBoard>
  </React.StrictMode>,
  document.getElementById('root')
);
