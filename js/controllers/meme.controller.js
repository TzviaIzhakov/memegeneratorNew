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
    gCtx.fillStyle = getColorMeme();
    gCtx.font = `${getFontSize()}px Arial`;
    gCtx.fillText(getLineTxt(), 100, 100);
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
  setLineTxt(elInput.value);
  renderMeme();
}

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL();
  console.log('dataUrl', dataUrl);

  elLink.href = dataUrl;
  // Set a name for the downloaded file
  elLink.download = 'my-meme';
}
