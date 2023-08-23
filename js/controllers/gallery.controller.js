'use strict';

let gNextId = 0;
renderGallery();

function renderGallery() {
  gNextId++;
  const img1 = `<img src="img/${gNextId}.jpg" alt="" onclick="onImgSelect(${gNextId})">`;
  gNextId++;
  const img2 = `<img src="img/${gNextId}.jpg" alt="" onclick="onImgSelect(${gNextId})">`;
  const strHtml = img1 + img2;
  const elGallery = document.querySelector('.gallery');
  elGallery.innerHTML = strHtml;
}

function onImgSelect(id) {
  setImg(id);
  renderMeme();
}
