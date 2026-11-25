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

const delStartRow = () => {
  board.firstChild?.remove();
}

const addEndRow = width => {
  board.append(buildCellRow(width));
}

const delEndRow = width => {
  board.lastChild?.remove();
}

const addStartColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.prepend(buildCell()));
}

const delStartColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.firstChild?.remove());
}

const addEndColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.append(buildCell()));
}

const delEndColumn = () => {
  board.querySelectorAll('.row').forEach(row => row.lastChild?.remove());
}

const board = document.querySelector('#board');
const helpForm = document.querySelector('form#help');
const dimensionsForm = document.querySelector('form#dimensions');
const dimensionsHeightInput = dimensionsForm.querySelector('input#height');
const dimensionsWidthInput = dimensionsForm.querySelector('input#width');
const chosenDimensions = { width: 1, height: 1 };

const addStartRowsBtn = document.querySelector('button#add-start-rows');
const addEndRowsBtn = document.querySelector('button#add-end-rows');
const addStartColumnsBtn = document.querySelector('button#add-start-columns');
const addEndColumnsBtn = document.querySelector('button#add-end-columns');
const delStartRowsBtn = document.querySelector('button#del-start-rows');
const delEndRowsBtn = document.querySelector('button#del-end-rows');
const delStartColumnsBtn = document.querySelector('button#del-start-columns');
const delEndColumnsBtn = document.querySelector('button#del-end-columns');
const showHelpBtn = document.querySelector('button#show-help');

helpForm.addEventListener('submit', e => {
  e.preventDefault();
  
  helpForm.classList.add('hide');
});

dimensionsForm.addEventListener('submit', e => {
  e.preventDefault();
  
  chosenDimensions.height = dimensionsHeightInput.value;
  chosenDimensions.width = dimensionsWidthInput.value;
});

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

addStartRowsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.height; i++) addStartRow(board.firstChild?.childElementCount || 1);
});

addEndRowsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.height; i++) addEndRow(board.firstChild?.childElementCount);
});

addStartColumnsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.width; i++) addStartColumn();
});

addEndColumnsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.width; i++) addEndColumn();
});

delStartRowsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.height; i++) delStartRow();
});

delEndRowsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.height; i++) delEndRow();
});

delStartColumnsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.width; i++) delStartColumn();
});

delEndColumnsBtn.addEventListener('pointerdown', () => {
  for (let i=0; i < chosenDimensions.width; i++) delEndColumn();
});

showHelpBtn.addEventListener('pointerdown', () => {
  help.classList.remove('hide');
});
