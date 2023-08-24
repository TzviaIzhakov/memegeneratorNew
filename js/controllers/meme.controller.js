'use strict';

let gElCanvas;
let gCtx;
let gAlingnment;
// let gCountChar = 0;
// let gContinuedline;
let gisClickedUp;
let gStartPos;
let gDx;
let gDy;
function onInit() {
  console.log('Hi');
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
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
  //Save the pos we start from
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
  // console.log('onMove')
  // const { isDrag } = getCircle();
  if (!getLineDrag()) return;
  console.log('Moving the line');

  const pos = getEvPos(ev);
  // Calc the delta, the diff we moved
  gDx = pos.x - gStartPos.x;
  gDy = pos.y - gStartPos.y;
  moveLine(gDx, gDy);
  // Save the last pos, we remember where we`ve been and move accordingly
  gStartPos = pos;
  // The canvas is render again after every move
  renderMeme();
}

function onUp() {
  // console.log('onUp')
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
    // gCtx.fillStyle = getColorMeme();
    // gCtx.font = `${getFontSize()}px Arial`;
    // gCtx.fillText(getLineTxt(), 100, 100);
    renderLines();
  };
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
  // gCountChar++;
  //   for (var j = 0; j<lines.length; j++)
  // c.fillText(lines[j], a, b + (j*lineheight) );
  // let mesureWidthInput = gCtx.measureText(elInput.value).width;
  // const line = getLine();
  setLineTxt(elInput.value);

  renderMeme();
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

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL();
  console.log('dataUrl', dataUrl);

  elLink.href = dataUrl;
  elLink.download = 'my-meme';
}

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

function onAlign(str) {
  gAlingnment = str;
  renderMeme();
}

function onGetFont(val) {
  console.log('val', val);
  setFont(val);
  renderMeme();
}

function renderLines() {
  const meme = getMeme();

  meme.lines.forEach((line, i) => {
    const textWidth = gCtx.measureText(line.txt).width;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.strokeColor;
    // console.log(line.color);
    // console.log(line.strokeColor);
    // console.log(line.strokeColor);
    gCtx.lineWidth = 4;
    const font = line.font;
    gCtx.font = `${line.size}px ${font}`;
    gCtx.strokeText(line.txt, line.x, line.y);

    if (getLineDrag()) {
      if (i === 1) {
        moveLine(gDx, gDy);
      }
    } else {
      if (i === 1) {
        setCoords(i, 20, gElCanvas.height - 50);
      }
      if (i >= 2) {
        setCoords(i, 20, gElCanvas.height / 2);
      }
    }

    if (i === meme.selectedLineIdx) {
      // console.log('i-if', i);
      // console.log('meme.selectedLineIdx-if', meme.selectedLineIdx);
      if (gAlingnment) {
        gCtx.textAlign = gAlingnment;
        if (gAlingnment === 'center') {
          setCoords(i, gElCanvas.width / 2, line.y);
          // gCtx.fillText(line.txt, gElCanvas.width / 2, line.y);
        } else if (gAlingnment === 'start') {
          setCoords(i, 50, line.y);
          // gCtx.fillText(line.txt, 50, line.y);
        } else if (gAlingnment === 'end') {
          setCoords(i, gElCanvas.width - 50, line.y);
          // gCtx.fillText(line.txt, gElCanvas.width - 50, line.y);
        }
      }
    } else {
      // console.log('i', i);
      // console.log('meme.selectedLineIdx', meme.selectedLineIdx);
      gCtx.textAlign = 'start'; // Reset alignment for non-selected lines
      // gCtx.fillText(line.txt, line.x, line.y);
    }

    if (i === meme.selectedLineIdx) {
      gCtx.strokeStyle = 'white';
      gCtx.strokeRect(20, line.y - 30, gElCanvas.width - 50, line.size + 5);
      // const hightFrame =
      //   textWidth + 100 >= gElCanvas.width ? line.size + 100 : line.size + 5;
    }
    // Draw the text, handling wrapping if needed
    // const words = line.txt.split(' ');
    // console.log(words);
    // let lineText = '';
    // let y = line.y;

    // for (let word of words) {
    //   const testLine = lineText + word + ' ';
    //   const testWidth = gCtx.measureText(testLine).width;

    //   if (testWidth > gElCanvas.width - 100) {
    //     gCtx.fillText(lineText, line.x, y);
    //     lineText = word + ' ';
    //     y += line.size;
    //   } else {
    //     lineText = testLine;
    //   }
    // }
    // gCtx.fillText(lineText, line.x, y);
    // Split the line text into individual lines
    // const lines = line.txt.split('\n');
    // console.log(lines);
    // // Loop through each line and draw it on the canvas
    // for (let j = 0; j < lines.length; j++) {
    //   gCtx.fillText(lines[j], line.x, line.y + j * line.size); // Draw each line
    // }
    gCtx.fillText(line.txt, line.x, line.y);
  });
}

// function drawWrappedTextWithBorder(context, text, x, y, maxWidth) {
//   const words = text.split(' ');
//   let line = '';

//   for (let i = 0; i < words.length; i++) {
//     const testLine = line + words[i] + ' ';
//     const testWidth = context.measureText(testLine).width;
//     if (testWidth > maxWidth && i > 0) {
//       context.strokeText(line, x, y);
//       context.fillText(line, x, y);
//       line = words[i] + ' ';
//       y += fontSize; // Move to the next line
//     } else {
//       line = testLine;
//     }
//   }

//   context.strokeText(line, x, y);
//   context.fillText(line, x, y);
// }

function onAddLine() {
  const elInput = document.querySelector('.txt');
  elInput.value = '';
  addLine(elInput.value, 'black', 'white');
  drawText(elInput);
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
    }
    return selected;
  });

  if (clickedLine) {
    return true;
  }
  return false;
}

function onClickedUp() {
  gisClickedUp = true;
}

function coverCanvasWithImg(elImg) {
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}
