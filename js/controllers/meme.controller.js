'use strict';

let gElCanvas;
let gCtx;

function onInit() {
  console.log('Hi');
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
}

function renderMeme() {
  const elImg = new Image();
  const meme = getMeme();
  const urlMeme = getMemeUrl();
  console.log(urlMeme);
  console.log(elImg);
  elImg.src = `${urlMeme}`;

  elImg.onload = () => {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.fillText(meme.lines[0].txt, 100, 100);
  };
}

function drawText(elInput) {
  setLineTxt(elInput.value);
  renderMeme();
}
