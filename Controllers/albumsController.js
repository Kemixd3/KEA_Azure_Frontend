import albumModel from "../models/albumModel.js";

const endpoint = "http://localhost:8000"; //

let allAlbums = [];

async function showCreateAlbum() {
  const dialog = document.querySelector("#create-album-dialog");
  const artists = await readAllArtists();
  for (const artist of artists) {
    document
      .querySelector("#album-create-select")
      .insertAdjacentHTML(
        "beforeend",
        /* html */ `<option value="${artist.id}">${artist.name}</option>`
      );
  }
  dialog.showModal();
  document
    .querySelector("#create-album")
    .addEventListener("submit", createAlbumClicked);
  document
    .querySelector("#create-album button")
    .addEventListener("click", () => dialog.close());
}

async function createAlbumClicked(event) {
  event.preventDefault();
  const form = this;
  const album = {
    name: form.title.value,
    releaseDate: form.date.value,
    image: form.image.value,
    artistId: Number(form.artists.value),
  };
  console.log(album);
  const response = await createAlbum(album);
  if (response) {
    await displayUpdatedLists();
  }
}

// ----- Read all albums ---- //
async function readAllAlbums() {
  const res = await fetch(`${endpoint}/albums`);
  const albumsData = await res.json();
  allAlbums = albumsData.map((jsonObj) => new albumModel(jsonObj));
  return allAlbums;
}

// ----- Create new album ----- //
async function createAlbum(album) {
  const json = JSON.stringify(album);
  const res = await fetch(`${endpoint}/albums`, {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Update album ----- //
async function updateAlbum(album) {
  const json = JSON.stringify(album);
  const res = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "PUT",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Delete album ----- //
async function deleteAlbum(albums) {
  const res = await fetch(`${endpoint}/albums/${albums.id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export { createArtist, readAllAlbums, createAlbum, updateAlbum, deleteAlbum };

export { showCreateAlbum };
