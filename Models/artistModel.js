export default class Artist {
  constructor(obj) {
    this.name = obj.artist_name;
    this.id = obj.artistID;
    this.date = obj.birth_date;


    Object.defineProperty(this, "id", { writable: false });
  }
}
