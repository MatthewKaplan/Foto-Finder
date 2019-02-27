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


var imagesArr = JSON.parse(localStorage.getItem('photoCards')) || [];
var reader = new FileReader();

inputArea.addEventListener('change', buttenEnabler);
searchInput.addEventListener('keyup', searchPhotos);
photoArea.addEventListener('click', buttonChecker);
addToAlbumBtn.addEventListener('click', loadImg);
window.addEventListener('load', appendPhotos(imagesArr));

function appendPhotos(imagesArr) {
  photoArea.innerHTML = '';
  if (imagesArr.length === 0) {
    photoArea.innerText = `PLEASE ADD A PHOTO`;
  } else if (imagesArr.length <= 10) {
    for (var i = 0; i < imagesArr.length; i++) {
      generatePhotoCard(imagesArr[i]);
    }  
  } else {
    for (var i = 0; i < imagesArr.length; i++) {
      generatePhotoCard(imagesArr[i]);
    }
  }
}

function loadImg(e) {
  e.preventDefault();
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
        <p contenteditable="true" class="photo-title">${card.title}</p>
        <img src="${card.image}" alt="uploaded-photo" class="uploaded-photo">
        <div>
          <p contenteditable="true" class="photo-caption">${card.caption}</p>
        </div>
        <div class="card-button-container">
          <img src="images/delete.svg" alt="delete" class="delete-icon" id="trash-can">
          <img src="images/favorite.svg" alt="favorite" class="favorite-icon" id="favorite-heart">
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
  if (e.target.id === 'trash-can') {
    deleteCard(e);
  }
}

function reinstantiatePhoto(imagesArr, i) {
  return new Photo(imagesArr[i].id, imagesArr[i].title, imagesArr[i].caption, imagesArr[i].image);
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












