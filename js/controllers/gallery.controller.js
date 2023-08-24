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
  const gallery = document.querySelector('.gallery');
  const memeEditor = document.querySelector('.meme-editor');
  gallery.classList.add('hidden');
  memeEditor.classList.remove('hidden');
}
