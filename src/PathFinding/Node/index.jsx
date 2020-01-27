import React from 'react';

const Node = (props) => {
  const {
    isStart,
    isFinish,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
    col,
  } = props;

  const generateClassName = () => {
    if (isStart) {
      return 'box-start';
    }

    if (isFinish) {
      return 'box-finish';
    }

    if (isWall) {
      return 'box-wall';
    }

    return '';
  };

  return (
    <div
      onMouseDown={() => onMouseDown()}
      onMouseEnter={() => onMouseEnter()}
      onMouseUp={() => onMouseUp()}
      id={`${row}-${col}`}
      className={`box ${generateClassName()}`}
    />
  );
};

export default Node;
