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
    console.log('Made it to deleteFromStorage');
    imagesArr.splice(i, 1);
    this.saveToStorage(imagesArr);
  }

  updateStorage(imagesArr, i) {
    console.log('updateStorage')
    imagesArr.splice(i, 1);
    localStorage.setItem('photoCards', JSON.stringify(imagesArr));
  }

  updatePhotoCard() {
    
  }
}