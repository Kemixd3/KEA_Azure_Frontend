export default class Track {
  constructor(obj) {
    this.id = obj.track_id;
    this.name = obj.track_title;
    this.duration = obj.duration;
    this.album_id = obj.album_id;

    Object.defineProperty(this, "id", { writable: false });
  }
}
