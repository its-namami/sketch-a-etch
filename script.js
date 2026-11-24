const board = document.querySelector('#board');

const buildCell = () => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.classList.add('outline'); // for debugging
  return cell;
}

const buildCellRow = size => {
  const cellRow = document.createElement('div');
  cellRow.classList.add('row');

  for (let i = 0; i < size; i++) {
    cellRow.appendChild(buildCell());
  }

  return cellRow;
}

const populateBoard = (width, height, board) => {
  for (let i = 0; i < height; i++) {
    board.appendChild(buildCellRow(width));
  }
}

populateBoard(5, 5, board);

