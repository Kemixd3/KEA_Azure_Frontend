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
        <li>Album title: ${album.name}, Published: ${formatBirthDate(album.date)}</li>
      </ul>
      `;
    return albumHTML;
  },
};

export { AlbumRenderer };
