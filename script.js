import { readAllAlbums } from "./Controllers/albumsController.js";
import { readAllArtists } from "./Controllers/artistsController.js";
import { readAllTracks } from "./Controllers/tracksController.js";
import ArtistRenderer from "./Renderers/ArtistRenderer.js";
import listRenderer from "./Renderers/ListRenderer.js";
import AlbumRenderer from "./Renderers/AlbumRenderer.js";
import TrackRenderer from "./Renderers/TrackRenderer.js";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const artistRadio = document.getElementById("artistRadio");
const albumRadio = document.getElementById("albumRadio");
const trackRadio = document.getElementById("trackRadio");

const searchTypes = {
  artist: ArtistRenderer,
  albums: AlbumRenderer,
  tracks: TrackRenderer,
};

// Define reusable functions to fetch and render search results
async function fetchAndRenderResults(searchType) {
  const searchTerm = searchInput.value.toLowerCase();
  let searchResults = [];

  if (searchType === "artist") {
    searchResults = await readAllArtists(searchTerm);
  } else if (searchType === "albums") {
    searchResults = await readAllAlbums(searchTerm);
  } else if (searchType === "tracks") {
    searchResults = await readAllTracks(searchTerm);
  }

  const list = new listRenderer(
    searchResults,
    "#resultsContainer",
    searchTypes[searchType]
  );

  list.render();
}

// Event listeners
artistRadio.addEventListener("click", () => fetchAndRenderResults("artist"));
albumRadio.addEventListener("click", () => fetchAndRenderResults("albums"));
trackRadio.addEventListener("click", () => fetchAndRenderResults("tracks"));

searchButton.addEventListener("click", () => {
  const searchType = artistRadio.checked
    ? "artist"
    : albumRadio.checked
    ? "albums"
    : "tracks";

  fetchAndRenderResults(searchType);
});

window.addEventListener("load", () => {
  fetchAndRenderResults("artist");
});
