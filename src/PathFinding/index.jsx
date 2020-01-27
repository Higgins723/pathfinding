import React, { useEffect, useState } from 'react';
import Node from './Node';
import { dijkstra, getNodesInShortestPathOrder } from './Algorithms/Dijkstra';

const PathFinding = (props) => {
  const { columnCount, rowCount } = props;
  const [grid, setGrid] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startNode] = useState({ row: 5, col: 5 });
  const [endNode] = useState({ row: 15, col: 25 });

  const generateGrid = () => {
    // create grid of rows and columns from parent level props
    const localGrid = [];

    for (let row = 0; row < rowCount; row += 1) {
      const currentRow = [];

      for (let col = 0; col < columnCount; col += 1) {
        currentRow.push(createNode(col, row));
      }

      localGrid.push(currentRow);
    }

    return localGrid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === startNode.row && col === startNode.col,
      isFinish: row === endNode.row && col === endNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  };

  const handleMouseDown = (row, col) => {
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMouseDown) return;

    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleWall = (grid, row, col) => {
    const newGrid = grid;
    const selectedNode = newGrid[row][col];
    const updateSelectedNode = {
      ...selectedNode,
      isWall: !selectedNode.isWall,
    };
    newGrid[row][col] = updateSelectedNode;
    return newGrid;
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i += 1) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`${node.row}-${node.col}`).classList.add('box-visited');
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i += 1) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`${node.row}-${node.col}`).classList.add('box-shortest-path');
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const start = grid[startNode.row][startNode.col];
    const finish = grid[endNode.row][endNode.col];
    const visitedNodesInOrder = dijkstra(grid, start, finish);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  useEffect(() => {
    const g = generateGrid();
    setGrid(g);
  }, []);

  return (
    <>
      <div className="description-area">
        <button className="btn btn-primary" onClick={() => visualizeDijkstra()}>Visualize Dijkstra's</button>
      </div>

      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div className={`row ${rowIndex}`} key={rowIndex}>
            {row.map((node, nodeIndex) => (
              <Node
                key={nodeIndex}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isWall={node.isWall}
                row={node.row}
                col={node.col}
                mouseIsPressed={isMouseDown}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={() => handleMouseUp()}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default PathFinding;
