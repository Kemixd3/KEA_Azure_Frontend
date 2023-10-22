import { readAllAlbums } from "./Controllers/albumsController.js";
import { readAllArtists } from "./Controllers/artistsController.js";
import { readAllTracks } from "./Controllers/tracksController.js";

const resultsContainer = document.getElementById("resultsContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const artistRadio = document.getElementById("artistRadio");
const albumRadio = document.getElementById("albumRadio");
const altRadio = document.getElementById("altRadio");
const trackRadio = document.getElementById("trackRadio");

searchButton.addEventListener("click", async () => {
  clearResults();

  const searchTerm = searchInput.value.toLowerCase();

  // Determine which radio button is checked
  let searchType;
  if (artistRadio.checked) {
    searchType = artistRadio.value;
    await readAllArtists(searchTerm);

  } else if (albumRadio.checked) {
    searchType = albumRadio.value;
    await readAllAlbums(searchTerm);

  } else if (altRadio.checked) {
    searchType = altRadio.value;

  } else {
    searchType = trackRadio.value; 
    await readAllTracks(searchTerm);

  }
});


function clearResults() {
  resultsContainer.innerHTML = "";
}
