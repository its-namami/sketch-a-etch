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
    cellRow.append(buildCell());
  }

  return cellRow;
}

const addBoardRow = (width) => {
  board.append(buildCellRow(width));
}

const board = document.querySelector('#board');

for(let i = 0; i < 5; i++) { addBoardRow(5); }

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

const increaseBoardWidth = width => {
  const rows = board.querySelectorAll('& > .row');

  rows.forEach(row => {
    for (let i = 0; i < width; i++) {
      row.append(buildCell())
    }
  });
}

increaseBoardHeight = height => {
  for (let i = 0; i < height; i++) {
    addBoardRow(firstRow?.children.length || 1);
  }
}
const firstRow = document.querySelector('#board > .row');
const increaseWidthBtn = document.querySelector('button#increase-width');
const increaseHeightBtn = document.querySelector('button#increase-height');

increaseWidthBtn.addEventListener('pointerdown', e => {
  increaseBoardWidth(2);
});

increaseHeightBtn.addEventListener('pointerdown', e => {
  increaseBoardHeight(2);
});
