export default class Album {
  constructor(obj) {
    this.name = obj.album_title;
    this.id = obj.albumId;
    this.date = obj.release_date;
    Object.defineProperty(this, "id", { writable: false });
  }
}
