var title = document.querySelector('#title-input');
var caption = document.querySelector('#caption-input');
var imageUploadBtn = document.querySelector('#image-upload-btn');
var addToAlbumBtn = document.querySelector('#add-to-album-btn');
var searchInput = document.querySelector('#search-input');
var viewFavoritesBtn = document.querySelector('#view-favorites-btn');
var searchBtn = document.querySelector('.search-btn');
var photoArea = document.querySelector('#photo-area');
var input = document.querySelector('.file-input');
var trashCan = document.querySelector('#trash-can');


var imagesArr = JSON.parse(localStorage.getItem('photoCards')) || [];
var reader = new FileReader();

photoArea.addEventListener('click', buttonChecker);
addToAlbumBtn.addEventListener('click', loadImg);
window.addEventListener('load', appendPhotos(imagesArr));

function appendPhotos(array) {
  imagesArr = []
  array.forEach(function(obj) {
    var card = new Photo(obj.id, obj.title, obj.caption, obj.image);
    console.log(card);
    imagesArr.push(Photo);
    generatePhotoCard(card);
  });
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
}

function generatePhotoCard(card) {
  var card = `<article id="${card.id}" class="photo-card">
        <h2 contenteditable="true" class="photo-title">${card.title}</h2>
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
}

function buttonChecker(e) {
  e.preventDefault();
  if (e.target.id === 'trash-can') {
    e.target.parentElement.parentElement.remove();
    // photoToDelete.deleteFromStorage(i);
  }
}