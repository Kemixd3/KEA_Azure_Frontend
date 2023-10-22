//import * as ListRenderer from "./Renderers/ListRenderer.js";
//import { ArtistRenderer } from "./Renderers/ArtistRenderer.js";
//import { TrackRenderer } from "./Renderers/TrackRenderer.js";
//import { AlbumRenderer } from "./Renderers/AlbumRenderer.js";

import { albumsController } from "./Controllers/albumsController.js";
import { readAllTracks } from "./Controllers/artistsController.js";
import { tracksControllers } from "./Controllers/tracksController.js";

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
  } else if (albumRadio.checked) {
    searchType = albumRadio.value;
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
