class Photo {
  constructor(id, title, caption, image) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.image = image;
  }

  saveToStorage(array) {
    console.log('Made it to storage');
    localStorage.setItem("photoCards", JSON.stringify(array));
  }

  deleteFromStorage(imagesArr, i) {
    console.log('Made it to deleteFromStorage');
    imagesArr.splice(i, 1);
    this.saveToStorage(imagesArr);
  }

  updatePhotoCard() {
    
  }
}