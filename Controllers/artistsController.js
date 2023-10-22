import artistModel from "../Models/artistModel.js";

const endpoint = "http://localhost:8000"; //

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
  console.log(artist);
  const response = await createArtist(artist);
  if (response) {
    await displayUpdatedLists();
  }
}

// ----- Read all artists ---- //
async function readAllArtists() {
  const res = await fetch(`${endpoint}/artists`);
  const artistsData = await res.json();
  allArtists = artistsData.map((jsonObj) => new artistModel(jsonObj));
  return allArtists;
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

export { createArtist, readAllArtists, updateArtist, deleteArtist };

export { showCreateArtist };
