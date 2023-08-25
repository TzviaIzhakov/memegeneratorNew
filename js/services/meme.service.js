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

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    _createLine('I sometimes eat Falafel', 'black'),
    _createLine('I love to eat Hamburger', 'red'),
  ],
};

let gLineDrag;

var selectedLineIdx = gMeme.selectedLineIdx;
function getMeme() {
  // console.log(gMeme, 'getMeme');
  return gMeme;
}

function addLine(txt, color, strokeColor) {
  const newLine = _createLine(txt, color, strokeColor);
  console.log(gMeme, 'add-line');
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  selectedLineIdx = gMeme.selectedLineIdx;
  console.log(selectedLineIdx);
  // _saveBooks();
}

function _createLine(
  txt,
  color = 'black',
  strokeColor = 'white',
  font = 'Arial',
  x = 50,
  y = 50
) {
  return {
    txt,
    size: 30,
    color,
    strokeColor,
    font,
    x,
    y,
  };
}

function getImgs() {
  return gImgs;
}

function switchLine() {
  if (selectedLineIdx + 1 === gMeme.lines.length) {
    selectedLineIdx = 0;
    gMeme.selectedLineIdx = selectedLineIdx;
    console.log('selectedLineIdx', gMeme.selectedLineIdx);
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
  setLineTxt('');
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

// lines: [
//   _createLine('I sometimes eat Falafel', 'black'),
//   _createLine('I love to eat Hamburger', 'red'),
// ],

function setImg(id) {
  gMeme.selectedImgId = id;
  gMeme.lines = [];
  gMeme.selectedLineIdx = 0;
  selectedLineIdx = 0;
  gMeme.lines[selectedLineIdx] = _createLine('', 'black', 'white', 'Arial');
  console.log(gMeme, 'after clicked on another pic');
}

function setCoords(idx, x, y) {
  gMeme.lines[idx].x = x;
  gMeme.lines[idx].y = y;
}

function setLineDrag(boolean) {
  gLineDrag = boolean;
  gMeme.selectedLineIdx = selectedLineIdx;
}

function getLineDrag() {
  return gLineDrag;
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
