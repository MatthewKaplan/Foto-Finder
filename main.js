var title = document.querySelector('#title-input');
var caption = document.querySelector('#caption-input');
var imageUpload = document.querySelector('#image-upload');
var addToAlbumBtn = document.querySelector('#add-to-album-btn');
var searchInput = document.querySelector('#search-input');
var viewFavoritesBtn = document.querySelector('#view-favorites-btn');
var searchBtn = document.querySelector('.search-btn');
var photoArea = document.querySelector('#photo-area');
var input = document.querySelector('.file-input');
var trashCan = document.querySelector('#trash-can');
var inputArea = document.querySelector('#input-area');
var showMoreBtn = document.querySelector('.show-more-btn');
var showLessBtn = document.querySelector('.show-less-btn');
var favoriteCounterEl = document.querySelector('.favorite-counter');


var imagesArr = JSON.parse(localStorage.getItem('photoCards')) || [];
var reader = new FileReader();
var favoriteArray = [];


showMoreBtn.addEventListener('click', morePhotos);
showLessBtn.addEventListener('click', lessPhotos);
inputArea.addEventListener('change', buttenEnabler);
searchInput.addEventListener('keyup', searchPhotos);
photoArea.addEventListener('click', buttonChecker);
photoArea.addEventListener('focusout', updateText);
addToAlbumBtn.addEventListener('click', loadImg);
window.addEventListener('load', appendPhotos(imagesArr));




function appendPhotos(imagesArr) {
  photoArea.innerHTML = '';
  if (imagesArr.length === 0) {
    photoArea.innerText = `PLEASE ADD A PHOTO`;
  } else if (imagesArr.length <= 10) {
    for (var i = 0; i < 10; i++) {
      generatePhotoCard(imagesArr[i]);
    }  
  } else {
    for (var i = imagesArr.length - 10; i < imagesArr.length; i++) {
      generatePhotoCard(imagesArr[i]);
    }
  }
}

function loadImg() {
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = createPhotoCard
  }
}

function createPhotoCard(e) {
  var photoCard = new Photo(Date.now(), title.value, caption.value, e.target.result);
  imagesArr.push(photoCard);
  photoCard.saveToStorage(imagesArr);
  generatePhotoCard(photoCard);
}

function generatePhotoCard(card) {
  var card = `<article data-id=${card.id} class="photo-card">
        <p contenteditable="true" class="photo-title" id="photo-title">${card.title}</p>
        <img src="${card.image}" alt="uploaded-photo" class="uploaded-photo">
        <div>
          <p contenteditable="true" class="photo-caption" id="photo-caption">${card.caption}</p>
        </div>
        <div class="card-button-container">
          <img src="images/delete.svg" alt="delete" class="delete-icon" id="trash-can">
          <label class="favorite-icon favorite-heart favorite-false" id="favorite-heart"></label>
          <label class="favorite-icon favorite-active-heart favorite-true hidden" id="favorite-active-heart"></label>
        </div>
      </article>`
      photoArea.insertAdjacentHTML('afterbegin', card);
      clearInputs();
}

function clearInputs() {
  title.value = '';
  caption.value = '';
  addToAlbumBtn.disabled = true;
}

function buttonChecker(e) {
  e.preventDefault();
  if (e.target.id === 'favorite-heart') {
    favoriteHeart(e);
  }
  if (e.target.id === 'favorite-active-heart') {
    favoriteActiveHeart(e);
  }
  if (e.target.id === 'trash-can') {
    deleteCard(e);
  }
}

function reinstantiatePhoto(imagesArr, i) {
  return new Photo(imagesArr[i].id, imagesArr[i].title, imagesArr[i].caption, imagesArr[i].image);
}

function deleteCard(e) {
  var i = getIndex(e);
  var photoToDelete = reinstantiatePhoto(imagesArr, i);
  e.target.closest('.photo-card').remove();
  photoToDelete.deleteFromStorage(imagesArr, i);
}


function getIndex(e) {
  const parent = e.target.closest('article');
  const parentID = parseInt(parent.dataset.id);
  return imagesArr.findIndex(photo => photo.id === parentID);
}

function searchPhotos() {
  var searchResults = [];
  var searchQuery = searchInput.value.toLowerCase();
  var photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  photos.forEach(photo => {
    if(photo.title.toLowerCase().includes(searchQuery) || photo.caption.toLowerCase().includes(searchQuery)) {
      searchResults.push(photo);
    }
  });
  appendPhotos(searchResults);
}

function buttenEnabler() {
  if (title && caption && imageUpload.files[0]) {
    addToAlbumBtn.disabled = false;
    addToAlbumBtn.classList.remove('disabled');
  }
}

function morePhotos() {
  showMoreBtn.classList.add('hidden');
  showLessBtn.classList.remove('hidden');
  var photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  if (!photos) {
    return false;
  } else {
    photoArea.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      generatePhotoCard(photos[i]);
    }
  }
}

function lessPhotos() {
  showMoreBtn.classList.remove('hidden');
  showLessBtn.classList.add('hidden');
  var photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  appendPhotos(photos);
}



function updateText(e) {
  var i = getIndex(e);
  var photoToUpdate = reinstantiatePhoto(imagesArr, i);
  imagesArr.push(photoToUpdate);
  if (e.target.id === 'photo-title') {
    photoToUpdate.title = e.target.innerText;
  }
  if (e.target.id === 'photo-caption') {
    photoToUpdate.caption = e.target.innerText;
  }
  photoToUpdate.saveToStorage(imagesArr);
  photoToUpdate.updateStorage(imagesArr, i);
}

function favoriteCounter() {
  var favoriteCounter = 0;
  for (var i = 0; i < imagesArr.length; i++) {
    if (imagesArr[i].favorite === true) {
      favoriteCounter++
    }
  }
  favoriteCounterEl.innerText = favoriteCounter;
}

function favoriteHeart(e) {
  var favoriteBtn = document.querySelector('.favorite-heart');
  var favoriteActiveBtn = document.querySelector('.favorite-active-heart');
  favoriteBtn.classList.add('hidden');
  favoriteActiveBtn.classList.remove('hidden');
}


function favoriteActiveHeart(e) {
  var favoriteBtn = document.querySelector('.favorite-heart');
  var favoriteActiveBtn = document.querySelector('.favorite-active-heart');
  favoriteBtn.classList.remove('hidden');
  favoriteActiveBtn.classList.add('hidden');
}




