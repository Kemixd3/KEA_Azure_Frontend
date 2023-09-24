const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const artistRadio = document.getElementById("artistRadio");
const albumRadio = document.getElementById("albumRadio");
const altRadio = document.getElementById("altRadio");
const trackRadio = document.getElementById("trackRadio");

const resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;

  //Make GET request to your backend API
  fetch(
    `https://schoolapi123.azurewebsites.net/search/${searchType}?query=${searchTerm}`
  )
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
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    results.forEach((result) => {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");

      if (searchType === "tracks") {
        // Displaying track information
        gridItem.textContent = `Track name: ${result.track_title}: ${result.duration}`;
      } else if (searchType === "artist") {
        // Display the artist information
        gridItem.textContent = `Artist name: ${result.artist_name}, Birth date: ${result.birth_date}`;
      } else if (searchType === "searchAll") {
        gridItem.textContent = `Type: "${result.entity_type}", name: "${result.name}", date: "${result.duration}"`;

        // Display the artist information
        console.log("Works");
      } else if (searchType === "albums-with-artists-and-tracks") {
        // Display album information along with artists and tracks
        console.log(result);
        gridItem.textContent = `Album title: ${result.album_title}, Published: ${result.release_date}`;

        // Display related artists
        if (result.artists && result.artists.length > 0) {
          const artistsUl = document.createElement("ul");
          result.artists.forEach((artist) => {
            const artistLi = document.createElement("li");
            artistLi.textContent = `Artist: ${artist.artist_name}`;
            artistsUl.appendChild(artistLi);
          });
          gridItem.appendChild(artistsUl);
        }

        // Display the related tracks
        if (result.tracks && result.tracks.length > 0) {
          const tracksUl = document.createElement("ul");
          result.tracks.forEach((track) => {
            const trackLi = document.createElement("li");
            trackLi.textContent = `Track: ${track.track_title}`;
            tracksUl.appendChild(trackLi);
          });
          gridItem.appendChild(tracksUl);
        }
      }

      gridContainer.appendChild(gridItem);
    });

    resultsContainer.appendChild(gridContainer);
  }
}


function clearResults() {
  resultsContainer.innerHTML = "";
}

