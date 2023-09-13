const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const artistRadio = document.getElementById("artistRadio");
const albumRadio = document.getElementById("albumRadio");
const trackRadio = document.getElementById("trackRadio");

const resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const searchType = artistRadio.checked
    ? "artists"
    : albumRadio.checked
    ? "albums-with-artists-and-tracks"
    : "tracks";

  //Make GET request to your backend API
  fetch(`http://localhost:3000/search/${searchType}?query=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data, searchType);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

function displayResults(results, searchType) {
  clearResults();

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    const ul = document.createElement("ul");
    results.forEach((result) => {
      const li = document.createElement("li");

      if (searchType === "tracks") {
        //Displaying our track information
        li.textContent = `Id: ${result.track_id} ${result.track_title}: ${result.duration}`;
      } else if (searchType === "artists") {
        //Display the artist information
        li.textContent = `Id: ${result.artist_id} Artist name: ${result.artist_name}, Birth date: ${result.birth_date}`;
      } else if (searchType === "albums-with-artists-and-tracks") {
        //Display album information along with artists and tracks
        li.textContent = `Id: ${result.album_id} Album title: ${result.album_title}, Artists in album: ${result.artists}, Published: ${result.release_date}`;

        //Display related artists
        if (result.artists && result.artists.length > 0) {
          const artistsUl = document.createElement("ul");
          result.artists.forEach((artist) => {
            const artistLi = document.createElement("li");
            artistLi.textContent = `Artist: ${artist.artist_name}`;
            artistsUl.appendChild(artistLi);
          });
          li.appendChild(artistsUl);
        }

        //Display the related tracks
        if (result.tracks && result.tracks.length > 0) {
          const tracksUl = document.createElement("ul");
          result.tracks.forEach((track) => {
            const trackLi = document.createElement("li");
            trackLi.textContent = `Track: ${track.track_title}`;
            tracksUl.appendChild(trackLi);
          });
          li.appendChild(tracksUl);
        }
      }

      ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
  }
}

function clearResults() {
  resultsContainer.innerHTML = "";
}
