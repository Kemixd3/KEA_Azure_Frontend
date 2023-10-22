const TrackRenderer = {
  render(track) {
    const trackHTML = /*html*/ `
    <ul type ="none">
      <li>Track name: ${track.name}: ${track.duration}</li>
    </ul>
      `;
    return trackHTML;
  },
};

export { TrackRenderer };
