function formatBirthDate(birthDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(birthDate).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

const ArtistRenderer = {
  render(artist) {
    const artistHTML = /*html*/ `
      <ul type ="none">
        <li>Artist name: ${artist.artist_name}, Birth date: ${formatBirthDate(artist.birth_date)}</li>
      </ul>
      `;
    return artistHTML;
  },
};

export { ArtistRenderer };
