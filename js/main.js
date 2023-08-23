'use strict';

let gElCanvas;
let gCtx;
let gCurrentImg;

function onInit() {
  gElCanvas = document.querySelector('canvas');
  gCtx = gElCanvas.getContext('2d');
}

function onSelectImg(elImg) {
  coverCanvasWithImg(elImg);
}

// Lets cover a fixed-width canvas using an img
// changing the canvas height
function coverCanvasWithImg(elImg) {
  gCurrentImg = elImg;
  gElCanvas.height =
    (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width;
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(elInput) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

  gCtx.lineWidth = 2;
  gCtx.font = '40px Arial';
  const str = elInput.value;

  if (gCurrentImg) {
    gCtx.drawImage(gCurrentImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.fillStyle = getColor();
    gCtx.fillText(str, 100, 100);
  }
}

function getColor() {
  const elInput = document.querySelector('.txt');
  const color = document.querySelector('.shape-color');
  console.log(color.value);
  gCtx.fillStyle = color.value;
  gCtx.fillText(elInput.value, 100, 100);
  return color.value;
}

function downloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL();
  console.log('dataUrl', dataUrl);

  elLink.href = dataUrl;
  // Set a name for the downloaded file
  elLink.download = 'my-meme';
}
