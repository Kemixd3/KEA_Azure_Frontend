const TrackRenderer = {
  render(track) {
    const trackHTML = /*html*/ `
      <ol type>
        <li>Track name: ${track.name}: ${track.duration}, by: ${track.artists}</li>
      </ol>
      `;
    return trackHTML;
  },
};

export { TrackRenderer };
