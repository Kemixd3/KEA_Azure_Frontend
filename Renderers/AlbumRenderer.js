function formatBirthDate(birthDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(birthDate).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

const AlbumRenderer = {
  render(album) {
    const albumHTML = /*html*/ `
      <ul type ="none">
        <li>
        Album title: ${album.album_title}, Published: ${formatBirthDate(album.release_date)}, Artist: ${  album.artists[0].artist_name}</li>
      </ul>
      `;
    return albumHTML;
  },
};

export { AlbumRenderer };
