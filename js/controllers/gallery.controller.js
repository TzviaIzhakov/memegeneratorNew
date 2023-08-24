'use strict';

renderGallery();

function renderGallery() {
  const imgs = getImgs();
  const strHtml = imgs.map((img) => {
    return `<img src="img/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})">`;
  });

  const elGallery = document.querySelector('.gallery');
  elGallery.innerHTML = strHtml.join('');
}

function onImgSelect(id) {
  setImg(id);
  renderMeme();
  const elGallery = document.querySelector('.gallery-user-tool');
  const elMemeEditor = document.querySelector('.meme-editor');
  elGallery.classList.add('hidden');
  elMemeEditor.classList.remove('hidden');
}
