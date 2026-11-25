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

const addStartRow = width => {
  board.prepend(buildCellRow(width));
}

const addEndRow = width => {
  board.append(buildCellRow(width));
}

const addStartColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.prepend(buildCell()));
}

const addEndColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.append(buildCell()));
}

const board = document.querySelector('#board');

for(let i = 0; i < 5; i++) { addEndRow(5); }

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

const firstRow = document.querySelector('#board > .row');
const addEndRowsBtn = document.querySelector('button#add-end-rows');
const addEndColumnsBtn = document.querySelector('button#add-end-columns');
const addStartRowsBtn = document.querySelector('button#add-start-rows');
const addStartColumnsBtn = document.querySelector('button#add-start-columns');

const modifyHeightValue = 2;
const modifyWidthValue = 2;

addEndColumnsBtn.addEventListener('pointerdown', e => {
  for(let i=0; i < modifyWidthValue; i++) addEndColumn(2);
});

addStartColumnsBtn.addEventListener('pointerdown', e => {
  for(let i=0; i < modifyWidthValue; i++) addStartColumn(2);
});

addEndRowsBtn.addEventListener('pointerdown', e => {
  for(let i=0; i < modifyHeightValue; i++) addEndRow(firstRow.childElementCount);
});

addStartRowsBtn.addEventListener('pointerdown', e => {
  for(let i=0; i < modifyHeightValue; i++) addStartRow(firstRow.childElementCount);
});
