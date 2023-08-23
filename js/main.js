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
  gCtx.fillStyle = 'black';
  gCtx.font = '40px Arial';
  const str = elInput.value;

  if (gCurrentImg) {
    gCtx.drawImage(gCurrentImg, 0, 0, gElCanvas.width, gElCanvas.height);
    gCtx.fillStyle = 'white';
    gCtx.fillText(str, 100, 100);
  }
}
