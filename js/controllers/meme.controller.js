'use strict';

let gElCanvas;
let gCtx;
let gCountChar = 0;
let gContinuedline;
function onInit() {
  console.log('Hi');
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
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

function changeFont(dxSize) {
  setFontSize(dxSize);
  renderMeme();
}

function drawText(elInput) {
  gCountChar++;
  let mesureWidthInput = gCtx.measureText(elInput.value).width;
  if (mesureWidthInput + 100 >= gElCanvas.width) {
    setLineTxt(`${elInput.value}\n`);
    // gContinuedline = elInput.value.substring(gCountChar);
    // console.log(gContinuedline, 'gContinuedline');
  } else {
    setLineTxt(elInput.value);
  }
  renderMeme();
}
// function drawText(elInput) {
//   const maxTextWidth = gElCanvas.width - 100; // Adjust the threshold as needed
//   const text = elInput.value;
//   const words = text.split(' ');
//   let wrappedWords = [];

//   // Calculate which words exceed the canvas width
//   for (let i = 0; i < words.length; i++) {
//     const lineText = wrappedWords.join(' ');
//     const testLine = lineText + (lineText ? ' ' : '') + words[i];
//     const testWidth = gCtx.measureText(testLine).width;

//     if (testWidth > maxTextWidth) {
//       wrappedWords.push('\n', words[i]);
//     } else {
//       wrappedWords.push(words[i]);
//     }
//   }

//   // Update the line text with wrapped words
//   setLineTxt(wrappedWords.join(' '));

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
function renderLines() {
  const meme = getMeme();
  const elInput = document.querySelector('.txt');

  meme.lines.forEach((line, i) => {
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Arial`;

    if (i == 1) {
      setCoords(i, 100, gElCanvas.height - 100);
    }
    if (i >= 2) {
      setCoords(i, 100, gElCanvas.height / 2 - 5);
    }
    // gCtx.fillText(line.txt, line.x, line.y);

    if (i === meme.selectedLineIdx) {
      gCtx.strokeStyle = 'blue'; // Set the frame color
      gCtx.lineWidth = 2;

      const textWidth = gCtx.measureText(line.txt).width;
      const hightFrame =
        textWidth + 100 >= gElCanvas.width ? line.size + 100 : line.size + 5;

      gCtx.strokeRect(line.x - 5, line.y - line.size, textWidth, hightFrame);
    }

    // Draw the text, handling wrapping if needed
    const words = line.txt.split(' ');
    let lineText = '';
    let y = line.y;

    for (let word of words) {
      const testLine = lineText + word + ' ';
      const testWidth = gCtx.measureText(testLine).width;

      if (testWidth > gElCanvas.width - 100) {
        gCtx.fillText(lineText, line.x, y);
        lineText = word + ' ';
        y += line.size;
      } else {
        lineText = testLine;
      }
    }

    gCtx.fillText(lineText, line.x, y);
  });
}

function drawWrappedTextWithBorder(context, text, x, y, maxWidth) {
  const words = text.split(' ');
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const testWidth = context.measureText(testLine).width;

    if (testWidth > maxWidth && i > 0) {
      context.strokeText(line, x, y);
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += fontSize; // Move to the next line
    } else {
      line = testLine;
    }
  }

  context.strokeText(line, x, y);
  context.fillText(line, x, y);
}

function onAddLine() {
  const elInput = document.querySelector('.txt');
  addLine(elInput.value, 'black');
  drawText(elInput);
  renderMeme();
}

function onSwitchLine() {
  switchLine();
  renderMeme();
}
