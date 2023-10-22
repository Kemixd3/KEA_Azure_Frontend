import trackModel from "../Models/trackModel.js";

const endpoint = "http://localhost:8000"; //

let allTracks = [];

async function showCreateTrack() {
  const dialog = document.querySelector("#create-track-dialog");
  const albums = await readAllAlbums(); // You may need to implement this function
  for (const album of albums) {
    document
      .querySelector("#track-create-select")
      .insertAdjacentHTML(
        "beforeend",
        /* html */ `<option value="${album.id}">${album.name}</option>`
      );
  }
  dialog.showModal();
  document
    .querySelector("#create-track")
    .addEventListener("submit", createTrackClicked);
  document
    .querySelector("#create-track button")
    .addEventListener("click", () => dialog.close());
}

async function createTrackClicked(event) {
  event.preventDefault();
  const form = this;
  const track = {
    name: form.name.value,
    duration: form.duration.value,
    albumId: Number(form.albums.value),
    // Add more track properties as needed
  };
  console.log(track);
  const response = await createTrack(track);
  if (response) {
    await displayUpdatedLists(); // You may need to implement this function
  }
}

// ----- Read all tracks ---- //
async function readAllTracks() {
  const res = await fetch(`${endpoint}/tracks`);
  const tracksData = await res.json();
  allTracks = tracksData.map((jsonObj) => new trackModel(jsonObj));
  return allTracks;
}

// ----- Create new track ----- //
async function createTrack(track) {
  const json = JSON.stringify(track);
  const res = await fetch(`${endpoint}/tracks`, {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Update track ----- //
async function updateTrack(track) {
  const json = JSON.stringify(track);
  const res = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "PUT",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.ok;
}

// ----- Delete track ----- //
async function deleteTrack(track) {
  const res = await fetch(`${endpoint}/tracks/${track.id}`, {
    method: "DELETE",
  });

  return res.ok;
}

export { createTrack, readAllTracks, updateTrack, deleteTrack };

export { showCreateTrack };
