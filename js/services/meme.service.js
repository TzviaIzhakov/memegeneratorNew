'use strict';
let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'donald'] },
  { id: 2, url: 'img/2.jpg', keywords: ['funny', 'dog', 'love'] },
];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'black',
    },
  ],
};

function getMeme() {
  return gMeme;
}

function getMemeUrl() {
  const memeUrl = gImgs.find((img) => img.id === gMeme.selectedImgId);
  console.log(memeUrl.url);
  return memeUrl.url;
}

function getLineTxt() {
  return gMeme.lines[0].txt;
}

function setLineTxt(newLine) {
  gMeme.lines[0].txt = newLine;
}

function getColorMeme() {
  return gMeme.lines[0].color;
}

function setColor(color) {
  gMeme.lines[0].color = color;
}

function getFontSize() {
  return gMeme.lines[0].size;
}

function setFontSize(fontSize) {
  let sizeMeme = gMeme.lines[0].size;
  console.log(sizeMeme, 'before');
  if (fontSize === -10 && sizeMeme === 10) {
    return;
  }
  gMeme.lines[0].size += fontSize;
  console.log(sizeMeme, 'after');
}

function setImg(id) {
  gMeme.selectedImgId = id;
  console.log(gMeme.selectedImgId);
}
