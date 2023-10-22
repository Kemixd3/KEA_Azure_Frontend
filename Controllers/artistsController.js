import artistModel from "../Models/artistModel.js";
import ArtistRenderer from "../Renderers/ArtistRenderer.js";

const endpoint = "https://keamusicapi.azurewebsites.net/";

let allArtists = [];

async function showCreateArtist() {
  const dialog = document.querySelector("#create-artist-dialog");
  dialog.showModal();
  document
    .querySelector("#create-artist")
    .addEventListener("submit", createArtistClicked);
  document
    .querySelector("#create-artist button")
    .addEventListener("click", () => dialog.close());
}

async function createArtistClicked(event) {
  event.preventDefault();
  const form = this;
  const artist = {
    name: form.name.value,
    genre: form.genre.value,
    // Add more artist properties as needed
  };
  const response = await createArtist(artist);
  if (response) {
    await displayUpdatedLists(); // Implement displayUpdatedLists function
  }
}

// ----- Read all artists ---- //
async function readAllArtists(searchTerm) {
  let artistsData;
  if (searchTerm === "") {
    const res = await fetch(`${endpoint}/artists`);
    artistsData = await res.json();
  } else {
    const res = await fetch(`${endpoint}/search/artist?query=${searchTerm}`);
    artistsData = await res.json();
  }

  allArtists = artistsData.map((jsonObj) => new artistModel(jsonObj));
  return allArtists;
  //renderArtistsInHTML(allArtists);
}

// ----- Create new artist ----- //
async function createArtist(artist) {
  const json = JSON.stringify(artist);
  const res = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Update artist ----- //
async function updateArtist(artist) {
  const json = JSON.stringify(artist);
  const res = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Delete artist ----- //
async function deleteArtist(artist) {
  const res = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export {
  createArtist,
  readAllArtists,
  updateArtist,
  deleteArtist,
  showCreateArtist,
};
