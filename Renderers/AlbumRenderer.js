import formatBirthDate from "../Services/dateService.js";

export default class AlbumRenderer {
  constructor(item) {
    this.item = item;
  }
  render() {
    const albumHTML = `
      <ul type ="none">
        <li>Album title: ${this.item.name}, Published: ${formatBirthDate(
      this.item.date
    )}</li>
      </ul>
      `;
    return albumHTML;
  }
}
