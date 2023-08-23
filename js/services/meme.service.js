'use strict';
let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'donald'] },
  { id: 2, url: 'img/2.jpg', keywords: ['dog', 'love'] },
];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    _createLine('I sometimes eat Falafel', 'black'),
    _createLine('I love to eat Hamburger', 'red'),
  ],
};

var selectedLineIdx = gMeme.selectedLineIdx;
function getMeme() {
  return gMeme;
}

function addLine(txt, color) {
  const newLine = _createLine(txt, color);
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
  selectedLineIdx = gMeme.selectedLineIdx;
  console.log(selectedLineIdx);
  // _saveBooks();
}

function _createLine(txt, color = 'black', x = 100, y = 100) {
  return {
    txt,
    size: 30,
    color,
    x,
    y,
  };
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
  console.log(newLine, 'newLine');
}

function getColorMeme() {
  return gMeme.lines[selectedLineIdx].color;
}

function setColor(color) {
  gMeme.lines[selectedLineIdx].color = color;
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
}

function setCoords(idx, x, y) {
  gMeme.lines[idx].x = x;
  gMeme.lines[idx].y = y;
}
