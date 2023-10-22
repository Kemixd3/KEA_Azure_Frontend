import formatBirthDate from "../Services/dateService.js";

export default class ArtistRenderer {
  constructor(item) {
    this.item = item;
  }

  render() {
    const artist = this.item;
    const artistHTML = `
      <ul type ="none">
        <li>Artist: ${artist.name}, Debut: ${formatBirthDate(
      artist.debut,
      true
    )}</li>
      </ul>
      `;
    return artistHTML;
  }
}
