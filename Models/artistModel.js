export default class Artist {
  constructor(obj) {
    this.name = obj.artist_name;
    this.id = obj.artistID;
    this.debut = obj.debut;

    Object.defineProperty(this, "id", { writable: false });
  }
}
