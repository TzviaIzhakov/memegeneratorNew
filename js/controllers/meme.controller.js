'use strict';

let gElCanvas;
let gCtx;
let gAlingnment;
let gIsDown;
// let gCountChar = 0;
// let gContinuedline;
let gisClickedUp;
let gStartPos;
let gDx;
let gDy;

function onInit() {
  console.log('Hi');
  gIsDown = false;
  // gAlingnment = 'start';
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
  renderMeme();
  addMouseListeners();
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mouseup', onUp);
}
function onDown(ev) {
  const pos = getEvPos(ev);
  if (!onClickedLine(ev)) {
    return;
  }

  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  if (!getLineDrag()) return;
  console.log('Moving the line');

  const pos = getEvPos(ev);
  // Calc the delta, the diff we moved
  gDx = pos.x - gStartPos.x;
  gDy = pos.y - gStartPos.y;
  moveLine(gDx, gDy);
  gStartPos = pos;
  renderMeme();
}

function onUp() {
  setLineDrag(false);
  document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  return pos;
}

function renderMeme() {
  const elImg = new Image();
  const meme = getMeme();
  const urlMeme = getMemeUrl();
  elImg.src = `${urlMeme}`;

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    renderLines();
  };
}

function onDownLine(px) {
  gIsDown = true;
  const line = getLine();
  setCoords(getSelectedLine(), 20, line.y + px);
  renderMeme();
}

function renderLines() {
  const meme = getMeme();
  meme.lines.forEach((line, i) => {
    gCtx.fillStyle = line.color;
    gCtx.lineWidth = 4;
    const font = line.font;
    gCtx.font = `${line.size}px ${font}`;

    if (i === meme.selectedLineIdx) {
      gCtx.strokeStyle = 'brown';
      gCtx.strokeRect(20, line.y - 30, gElCanvas.width - 50, line.size + 5);
    }

    if (i === meme.selectedLineIdx) {
      if (line.align) {
        gCtx.textAlign = line.align;
        if (line.align === 'center') {
          setCoords(i, gElCanvas.width / 2, line.y);
        } else if (line.align === 'start') {
          setCoords(i, 50, line.y);
        } else if (line.align === 'end') {
          setCoords(i, gElCanvas.width - 50, line.y);
        }

        gCtx.strokeStyle = line.strokeColor;
        gCtx.strokeText(line.txt, line.x, line.y);
        gCtx.fillText(line.txt, line.x, line.y);
        return;
      }
    }

    gCtx.textAlign = line.align ? line.align : 'start';
    gCtx.strokeStyle = line.strokeColor;
    gCtx.strokeText(line.txt, line.x, line.y);
    gCtx.fillText(line.txt, line.x, line.y);
  });
}

function getColor() {
  const color = document.querySelector('.shape-color');
  setColor(color.value);
  renderMeme();
}

function getStrokeColor() {
  const strokeColor = document.querySelector('.stroke-color');
  setStrokeColor(strokeColor.value);
  renderMeme();
}

function changeFont(dxSize) {
  setFontSize(dxSize);
  renderMeme();
}

function drawText(elInput) {
  setLineTxt(elInput.value);
  renderMeme();
}

function onAlign(str) {
  gAlingnment = str;
  setAlign(str);
  renderMeme();
}

function onGetFont(val) {
  console.log('val', val);
  setFont(val);
  renderMeme();
}

function onAddLine() {
  gIsDown = false;
  const elInput = document.querySelector('.txt');
  elInput.value = '';
  addLine(elInput.value, 'black', 'white', gElCanvas.width, gElCanvas.height);
  drawText(elInput);
  renderMeme();
}

function onDeleteLine() {
  const elInput = document.querySelector('.txt');
  elInput.value = '';
  deleteLine();
  renderMeme();
}

function onSwitchLine() {
  const elInput = document.querySelector('.txt');
  elInput.value = '';
  switchLine();
  renderMeme();
}

function onClickedLine(ev) {
  const meme = getMeme();
  const { offsetX, offsetY } = ev;

  const clickedLine = getMeme().lines.find((line, i) => {
    console.log(offsetX, offsetY);
    // const textWidth = gCtx.measureText(line.txt).width;
    // const hightFrame =
    //   textWidth + 100 >= gElCanvas.width ? line.size + 100 : line.size;
    // gCtx.strokeRect(20, line.y - 30, gElCanvas.width - 50, line.size + 5);
    const selected =
      offsetX >= 20 &&
      offsetX <= 20 + gElCanvas.width - 50 &&
      offsetY >= line.y - 30 &&
      offsetY <= line.size + 5 + line.y;
    console.log(line.y, 'line.y');
    console.log(line.size, 'line.size');
    // const s =
    //   offsetX >= line.x - 5 &&
    //   offsetX <= line.x + textWidth &&
    //   offsetY >= line.y - line.size &&
    //   offsetY <= hightFrame + line.y;
    if (selected) {
      setSelectedLine(i);
      const elInput = document.querySelector('.txt');
      elInput.value = meme.lines[getSelectedLine()].txt;
      renderMeme();
    }
    return selected;
  });

  if (clickedLine) {
    return true;
  }
  return false;
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL();
  console.log('dataUrl', dataUrl);

  elLink.href = dataUrl;
  elLink.download = 'my-meme';
}
// function drawText(elInput) {
//   const maxTextWidth = gElCanvas.width - 100; // Adjust the threshold as needed
//   const words = elInput.value.split(' ');
//   let lines = [];
//   let currentLine = '';

//   for (const word of words) {
//     const testLine = currentLine ? currentLine + ' ' + word : word;
//     const testWidth = gCtx.measureText(testLine).width;

//     if (testWidth <= maxTextWidth) {
//       currentLine = testLine;
//     } else {
//       lines.push(currentLine);
//       currentLine = word;
//     }
//   }

//   lines.push(currentLine);
//   const wrappedText = lines.join('\n');
//   setLineTxt(wrappedText);

//   renderMeme();
// }

// function renderLines() {
//   const meme = getMeme();
//   const elInput = document.querySelector('.txt');
//   console.log(gCtx.measureText(elInput.value).width);
//   meme.lines.forEach((line, i) => {
//     gCtx.fillStyle = line.color;
//     gCtx.font = `${line.size}px Arial`;
//     if (i == 1) {
//       setCoords(i, 100, gElCanvas.height - 100);
//     }
//     if (i >= 2) {
//       setCoords(i, 100, gElCanvas.height / 2 - 5);
//     }

//     if (i === meme.selectedLineIdx) {
//       gCtx.strokeStyle = 'blue'; // Set the frame color
//       gCtx.lineWidth = 2;
//       let mesureWidthInput = gCtx.measureText(elInput.value).width;
//       let size = line.size;

//       const hightFrame =
//         mesureWidthInput + 100 >= gElCanvas.width ? (size += 100) : size + 5;
//       console.log(hightFrame);
//       gCtx.strokeRect(
//         line.x - 5,
//         line.y - line.size,
//         mesureWidthInput,
//         hightFrame
//       );
//       console.log(line.txt);
//       gCtx.fillText(line.txt, line.x, line.y);
//       // drawWrappedText(gCtx, line.txt, line.x, line.y, gElCanvas.width);
//     }
//   });
// }
// function onClickedUp() {
//   gisClickedUp = true;
// }

// if (getLineDrag()) {
//   if (i === 1) {
//     moveLine(gDx, gDy);
//   }
// } else {
// if (!gIsDown) {
//   if (i === 1) {
//     setCoords(i, 20, gElCanvas.height - 50);
//   }
//   if (i >= 2) {
//     setCoords(i, 20, gElCanvas.height / 2);
//   }
// }
