const TrackRenderer = {
  render(track) {
    const trackHTML = /*html*/ `
      <ol type>
        <li>Track name: ${track.track_title}: ${track.duration}</li>
      </ol>
      `;
    return trackHTML;
  },
};

export { TrackRenderer };
