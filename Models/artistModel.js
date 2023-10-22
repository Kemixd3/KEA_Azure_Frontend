export default class Artist {
  constructor(obj) {
    this.name = obj.name;
    this.id = obj.id;
    this.image = obj.image;
    this.website = obj.website;

    Object.defineProperty(this, "id", { writable: false });
  }
}
