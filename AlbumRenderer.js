const AlbumRenderer = {
  render(album) {
    const albumHTML = /*html*/ `
      <ul type ="none">
        <li>${album.album_name}</li>
      </ul>
      `;
    return albumHTML;
  },
};

export { AlbumRenderer };
