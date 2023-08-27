'use strict';

renderGallery();

function onSetFilterBy(filterBy) {
  // { minSpeed: 74 }
  console.log('filterBy', filterBy);
  filterBy = setMemeFilter(filterBy);
  console.log(filterBy);
  renderGallery();
}

function renderGallery() {
  const imgs = getImgs();
  const strHtml = imgs.map((img) => {
    return `<img class = "img-${img.id}" src="img/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})">`;
  });

  const elGallery = document.querySelector('.gallery');
  elGallery.innerHTML = strHtml.join('');
}

function onImgSelect(id) {
  setImg(id);
  const elGallery = document.querySelector('.gallery-user-tool');
  const elMemeEditor = document.querySelector('.meme-editor');
  elGallery.classList.add('hidden');
  elMemeEditor.classList.remove('hidden');
  const elImg = document.querySelector(`.img-${id}`);
  coverCanvasWithImg(elImg);
  renderMeme();
}

function onGetFlexible() {
  const id = getRandImgId();
  setFlexible(true);
  onImgSelect(id);
}

function onReturnGallery() {
  const elGallery = document.querySelector('.gallery-user-tool');
  const elMemeEditor = document.querySelector('.meme-editor');
  const elInput = document.querySelector('.txt');
  console.log(elInput);
  elGallery.classList.remove('hidden');
  elMemeEditor.classList.add('hidden');
  elInput.value = '';
  setFlexible(false);
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function onDisplayModal() {
  const elBackDrop = document.querySelector('.backdrop');
  elBackDrop.classList.remove('hidden');
}

function onCloseModal() {
  const elBackDrop = document.querySelector('.backdrop');
  elBackDrop.classList.add('hidden');
}
