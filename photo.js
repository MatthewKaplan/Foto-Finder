class Photo {
  constructor(id, title, caption, image, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.image = image;
    this.favorite = favorite;
  }

  saveToStorage(array) {    
    localStorage.setItem('photoCards', JSON.stringify(array));
  }

  deleteFromStorage(imagesArr, i) {
    imagesArr.splice(i, 1);
    this.saveToStorage(imagesArr);
  }

  updatePhotoCard(imagesArr, i) {
    imagesArr.splice(i, 1);
    localStorage.setItem('photoCards', JSON.stringify(imagesArr));
  }
}