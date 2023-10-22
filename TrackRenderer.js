const TrackRenderer = {
  render(track) {
    const trackHTML = /*html*/ `
      <ol type>
        <li>${track.track_name}</li>
      </ol>
      `;
    return trackHTML;
  },
};

export { TrackRenderer };
