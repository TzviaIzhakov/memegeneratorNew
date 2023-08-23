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
      color: 'red',
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

function setLineTxt(newLine) {
  gMeme.lines[0].txt = newLine;
}

function setImg(id) {
  gMeme.selectedImgId = id;
  console.log(gMeme.selectedImgId);
}
