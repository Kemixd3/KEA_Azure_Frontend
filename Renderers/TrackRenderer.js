export default class TrackRenderer {
  constructor(item) {
    this.item = item;
  }

  render() {
    const trackHTML = `
    <ul type ="none">
      <li>Track name: ${this.item.name}: ${this.item.duration}</li>
    </ul>
      `;
    return trackHTML;
  }
}
