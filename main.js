const input = document.querySelector('.file-input');
const title = document.querySelector('#title-input');
const trashCan = document.querySelector('#trash-can');
const searchBtn = document.querySelector('.search-btn');
const photoArea = document.querySelector('#photo-area');
const inputArea = document.querySelector('#input-area');
const caption = document.querySelector('#caption-input');
const imageUpload = document.querySelector('#image-upload');
const searchInput = document.querySelector('#search-input');
const showMoreBtn = document.querySelector('.show-more-btn');
const showLessBtn = document.querySelector('.show-less-btn');
const addToAlbumBtn = document.querySelector('#add-to-album-btn');
const favoriteCounterEl = document.querySelector('.favorite-counter');
const viewFavoritesBtn = document.querySelector('#view-favorites-btn');


const imagesArr = JSON.parse(localStorage.getItem('photoCards')) || [];
const reader = new FileReader();


addToAlbumBtn.addEventListener('click', loadImg);
showMoreBtn.addEventListener('click', morePhotos);
showLessBtn.addEventListener('click', lessPhotos);
searchBtn.addEventListener('click', searchPhotos);
photoArea.addEventListener('click', buttonChecker);
photoArea.addEventListener('focusout', updateText);
searchInput.addEventListener('keyup', searchPhotos);
inputArea.addEventListener('change', buttenEnabler);
window.addEventListener('load', appendPhotos(imagesArr));


function appendPhotos(imagesArr) {
  photoArea.innerHTML = '';
  if (imagesArr.length === 0) {
    photoArea.innerHTML = '<p class="photo-area-text">Add some photos to your album.</p>';
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
    reader.onload = createPhotoCard;
  }
}

function createPhotoCard(e) {
  const photoCard = new Photo(Date.now(), title.value, caption.value, e.target.result, false);
  imagesArr.push(photoCard);
  photoCard.saveToStorage(imagesArr);
}

function generatePhotoCard(card) {
  var card = `<article data-id=${card.id} class="photo-card">
      <p contenteditable="true" class="photo-title" id="photo-title">${card.title}</p>
      <img src="${card.image}" alt="uploaded-photo" class="uploaded-photo">
      <div>
        <p contenteditable="true" class="photo-caption" id="photo-caption">${card.caption}</p>
      </div>
      <div class="card-button-container">
        <label class="delete-btn" id="trash-can"></label>
        <button class="favorite-btn favorite-heart" id="favorite-heart"></button>
      </div>
    </article>`;
  photoArea.insertAdjacentHTML('afterbegin', card);
  clearInputs();
}

function clearInputs() {
  title.value = '';
  caption.value = '';
}

function buttonChecker(e) {
  e.preventDefault();
  if (e.target.id === 'trash-can') {
    deleteCard(e);
  }
  if (e.target.classList.contains('favorite-btn')) {
    toggleFavoriteBtn(e);
  }
}

function reinstantiatePhoto(imagesArr, i) {
  return new Photo(imagesArr[i].id, imagesArr[i].title, imagesArr[i].caption, imagesArr[i].image, imagesArr[i].favorite);
}

function deleteCard(e) {
  const i = getIndex(e);
  const photoToDelete = reinstantiatePhoto(imagesArr, i);
  e.target.closest('.photo-card').remove();
  photoToDelete.deleteFromStorage(imagesArr, i);
}

function getIndex(e) {
  const parent = e.target.closest('article');
  const parentID = parseInt(parent.dataset.id);
  return imagesArr.findIndex(photo => photo.id === parentID);
}

function searchPhotos(e) {
  e.preventDefault();
  const searchResults = [];
  const searchQuery = searchInput.value.toLowerCase();
  let photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  photos.forEach((photo) => {
    if (photo.title.toLowerCase().includes(searchQuery) || photo.caption.toLowerCase().includes(searchQuery)) {
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
  let photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  if (!photos) {
    return false;
  }
  photoArea.innerHTML = '';
  for (let i = 0; i < photos.length; i++) {
    generatePhotoCard(photos[i]);
  }
}

function lessPhotos() {
  showMoreBtn.classList.remove('hidden');
  showLessBtn.classList.add('hidden');
  let photos = localStorage.photoCards || '[]';
  photos = JSON.parse(photos);
  appendPhotos(photos);
}

function updateText(e) {
  const i = getIndex(e);
  const photoToUpdate = reinstantiatePhoto(imagesArr, i);
  imagesArr.push(photoToUpdate);
  if (e.target.id === 'photo-title') {
    photoToUpdate.title = e.target.innerText;
  }
  if (e.target.id === 'photo-caption') {
    photoToUpdate.caption = e.target.innerText;
  }
  photoToUpdate.saveToStorage(imagesArr);
  photoToUpdate.updatePhotoCard(imagesArr, i);
}

function toggleFavoriteBtn(e) {
  const i = getIndex(e);
  const photoToFavorite = reinstantiatePhoto(imagesArr, i);
  imagesArr.push(photoToFavorite);
  if (photoToFavorite.favorite === false) {
    photoToFavorite.favorite = true;
    e.target.classList.add('favorite-active-svg');
  } else {
    photoToFavorite.favorite = false;
    e.target.classList.remove('favorite-active-svg');
  }
  photoToFavorite.saveToStorage(imagesArr);
  photoToFavorite.updatePhotoCard(imagesArr, i);
}
