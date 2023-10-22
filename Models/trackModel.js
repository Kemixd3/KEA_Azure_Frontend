export default class Track {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.duration = obj.duration;
    this.artists = obj.artists;

    Object.defineProperty(this, "id", { writable: false });
  }
}
