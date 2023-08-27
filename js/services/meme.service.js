'use strict';
let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'men'] },
  { id: 2, url: 'img/2.jpg', keywords: ['animal', 'smile'] },
  { id: 3, url: 'img/3.jpg', keywords: ['animal'] },
  { id: 4, url: 'img/4.jpg', keywords: ['animal'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny,smile'] },
  { id: 6, url: 'img/6.jpg', keywords: ['men,funny'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny'] },
  { id: 8, url: 'img/8.jpg', keywords: ['smile', 'funny', 'comic'] },
  { id: 9, url: 'img/9.jpg', keywords: ['smile', 'funny', 'comic'] },
  { id: 10, url: 'img/10.jpg', keywords: ['smile', 'funny', 'men'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny', 'men'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny', 'men', 'comic'] },
  { id: 13, url: 'img/13.jpg', keywords: ['funny', 'men', 'comic', 'smile'] },
  { id: 14, url: 'img/14.jpg', keywords: ['funny', 'men', 'comic'] },
  { id: 15, url: 'img/15.jpg', keywords: ['funny', 'men', 'smile'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'men', 'smile'] },
  { id: 17, url: 'img/17.jpg', keywords: ['men'] },
  { id: 18, url: 'img/18.jpg', keywords: ['funny', 'comic'] },
];

let gNextId = 0;

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
};

let gLinesFlexible = [
  'What was was',
  'What is this',
  'Hello Drama',
  'What will be will be',
];

let gLineDrag;
let gChangeFont;
let gIsFlexible;
let gWidth;
let gHeight;
let selectedLineIdx = gMeme.selectedLineIdx;

function getMeme() {
  return gMeme;
}

function getRandImgId() {
  return getRandomInt(0, gImgs.length);
}

function setFlexible(boolean) {
  gIsFlexible = boolean;
}

function addLine(txt, color, strokeColor, width, height) {
  gWidth = width;
  gHeight = height;
  gChangeFont = false;
  const newLine = _createLine(txt, color, strokeColor);
  console.log(gMeme, 'add-line');
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  selectedLineIdx = gMeme.selectedLineIdx;
  console.log(selectedLineIdx, 'selectedLineIdx');
}

function _createLine(
  txt,
  color = 'black',
  strokeColor = 'white',
  font = 'Arial',
  x = 20,
  y = 50
) {
  const line = {
    txt,
    size: 30,
    color,
    strokeColor,
    font,
    x,
    y,
    id: gNextId,
  };
  gNextId++;
  console.log('gNextId', gNextId);
  console.log(line.id, 'line.id');

  if (line.id === 1) {
    line.x = 20;
    line.y = gWidth - 50;
  } else if (line.id >= 2) {
    line.x = 20;
    line.y = gHeight / 2;
  }
  return line;
}

function getImgs() {
  return gImgs;
}

function switchLine() {
  if (selectedLineIdx + 1 === gMeme.lines.length) {
    selectedLineIdx = 0;
    gMeme.selectedLineIdx = selectedLineIdx;
    console.log('selectedLineIdx', gMeme.selectedLineIdx);
    gChangeFont = false;
    return;
  }

  selectedLineIdx++;
  gMeme.selectedLineIdx = selectedLineIdx;
  console.log('selectedLineIdx', gMeme.selectedLineIdx);
}

function getMemeUrl() {
  const memeUrl = gImgs.find((img) => img.id === gMeme.selectedImgId);
  return memeUrl.url;
}

function getLineTxt() {
  return gMeme.lines[selectedLineIdx].txt;
}

function setLineTxt(newLine) {
  gMeme.lines[selectedLineIdx].txt = newLine;
}

function deleteLine() {
  gMeme.lines.splice(selectedLineIdx, 1);
}

function getColorMeme() {
  return gMeme.lines[selectedLineIdx].color;
}

function setColor(color) {
  gMeme.lines[selectedLineIdx].color = color;
}

function setStrokeColor(strokeColor) {
  gMeme.lines[selectedLineIdx].strokeColor = strokeColor;
}

function setFont(val) {
  gMeme.lines[selectedLineIdx].font = val;
}

function setAlign(str) {
  gMeme.lines[selectedLineIdx].align = str;
}

function getFontSize() {
  return gMeme.lines[selectedLineIdx].size;
}

function setFontSize(fontSize) {
  let sizeMeme = gMeme.lines[selectedLineIdx].size;
  console.log(sizeMeme, 'before');
  if (fontSize === -10 && sizeMeme === 10) {
    return;
  }
  gMeme.lines[selectedLineIdx].size += fontSize;
  console.log(sizeMeme, 'after');
}

function setImg(id) {
  gMeme.selectedImgId = id;
  gMeme.lines = [];
  gMeme.selectedLineIdx = 0;
  selectedLineIdx = 0;
  gNextId = 0;
  if (!gIsFlexible) {
    gMeme.lines[selectedLineIdx] = _createLine(
      'Enter text',
      'black',
      'white',
      'Arial'
    );
  } else {
    gMeme.lines[selectedLineIdx] = _createLine(
      gLinesFlexible[getRandomInt(0, gLinesFlexible.length)],
      'black',
      'white',
      'Arial'
    );
  }
  gChangeFont = false;
  gLineDrag = false;
  console.log(gMeme, 'after clicked on another pic');
}

function setCoords(idx, x, y) {
  gMeme.lines[idx].x = x;
  gMeme.lines[idx].y = y;
}

function getLineDrag() {
  return gLineDrag;
}

function setLineDrag(boolean) {
  gLineDrag = boolean;
  gMeme.selectedLineIdx = selectedLineIdx;
}

function getChangeFont() {
  return gChangeFont;
}

function setChageFont(boolean) {
  gChangeFont = boolean;
  gMeme.selectedLineIdx = selectedLineIdx;
}

function moveLine(dx, dy) {
  gMeme.lines[selectedLineIdx].x += dx;
  gMeme.lines[selectedLineIdx].y += dy;
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setSelectedLine(idx) {
  gMeme.selectedLineIdx = idx;
  selectedLineIdx = idx;
  console.log(selectedLineIdx);
}

function getSelectedLine() {
  return gMeme.selectedLineIdx;
}
