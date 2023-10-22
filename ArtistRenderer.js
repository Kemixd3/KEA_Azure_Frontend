const ArtistRenderer = {
  render(artist) {
    const artistHTML = /*html*/ `
      <ul type ="none">
        <li>${artist.artist_name}</li>
      </ul>
      `;
    return artistHTML;
  },
};

export { ArtistRenderer };
