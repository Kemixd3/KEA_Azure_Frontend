import albumModel from "../Models/albumModel.js";
import { AlbumRenderer } from "./AlbumRenderer.js";

const endpoint = "http://localhost:8000";

let allAlbums = [];

async function showCreateAlbum() {
  const dialog = document.querySelector("#create-album-dialog");
  const artists = await readAllArtists(); // Implement readAllArtists function
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
    name: form.name.value,
    artistId: Number(form.artists.value),
    releaseDate: form.releaseDate.value,
    // Add more album properties as needed
  };
  console.log(album);
  const response = await createAlbum(album);
  if (response) {
    await displayUpdatedLists(); // Implement displayUpdatedLists function
  }
}

// ----- Read all albums ---- //
async function readAllAlbums(searchTerm) {
  let albumsData;
  if (searchTerm === "") {
    const res = await fetch(`${endpoint}/albums`);
    albumsData = await res.json();
  } else {
    const res = await fetch(`${endpoint}/search/albums:${searchTerm}`);
    albumsData = await res.json();
  }

  allAlbums = albumsData.map((jsonObj) => new albumModel(jsonObj));
  renderAlbumsInHTML(allAlbums);
}

function renderAlbumsInHTML(albums) {
  const albumList = document.querySelector(".album-list");

  // Clear previous results
  albumList.innerHTML = "";

  // Render each album in the album list
  albums.forEach((album) => {
    const albumHTML = AlbumRenderer.render(album);
    albumList.insertAdjacentHTML("beforeend", albumHTML);
  });
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
async function deleteAlbum(album) {
  const res = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export { createAlbum, readAllAlbums, updateAlbum, deleteAlbum, showCreateAlbum };
