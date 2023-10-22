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
        <li>Artist: ${artist.name}, Birth date: ${formatBirthDate(artist.date)}</li>
      </ul>
      `;
    return artistHTML;
  },
};

export { ArtistRenderer };
