import * as ListRenderer from "./Renderers/ListRenderer.js";
import { ArtistRenderer } from "./Renderers/ArtistRenderer.js";
import { TrackRenderer } from "./Renderers/TrackRenderer.js";
import { AlbumRenderer } from "./Renderers/AlbumRenderer.js";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const artistRadio = document.getElementById("artistRadio");
const albumRadio = document.getElementById("albumRadio");
const altRadio = document.getElementById("altRadio");
const trackRadio = document.getElementById("trackRadio");

const resultsContainer = document.getElementById("resultsContainer");

searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const searchType = document.querySelector(
    'input[name="searchType"]:checked'
  ).value;

  //Make GET request to your backend API
  await fetch(
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

  //call
  
}

function clearResults() {
  resultsContainer.innerHTML = "";
}
