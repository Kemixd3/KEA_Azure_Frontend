export default class Album {
  constructor(obj) {
    this.name = obj.name;
    this.id = obj.id;
    this.releaseDate = obj.releaseDate;
    this.image = obj.image;
    this.artists = obj.artists;
    Object.defineProperty(this, "id", { writable: false });
  }
}
