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

const board = document.querySelector('#board');

populateBoard(5, 5, board);

// pointer-event for stylus/touch-IO-compatibility
board.addEventListener('pointerrawupdate', e => {
  // work only when pointer is down ("LMB")
  const isPointerDown = e.pressure > 0;
  
  if (!isPointerDown) return;

  // dynamically get element because e.target doesn't update on moving
  const actualElement = document.elementFromPoint(
        e.clientX,
        e.clientY
  );

  if (actualElement?.classList.contains('cell'))
    actualElement.classList.add('active');
});

