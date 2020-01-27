import React from 'react';
import PathFinding from './PathFinding';
import './App.scss';

const App = () => {
  return (
    <PathFinding
      columnCount={30}
      rowCount={30}
    />
  );
}

export default App;
