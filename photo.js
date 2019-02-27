class Photo {
  constructor(id, title, caption, image) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.image = image;
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