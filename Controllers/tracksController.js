import trackModel from "../Models/trackModel.js";
import { TrackRenderer } from "../Renderers/TrackRenderer.js";

const endpoint = "https://keamusicapi.azurewebsites.net/";

let allTracks = [];

async function showCreateTrack() {
  const dialog = document.querySelector("#create-track-dialog");
  const albums = await readAllAlbums(); // Implement readAllAlbums function
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
  const response = await createTrack(track);
  if (response) {
    await displayUpdatedLists(); // Implement displayUpdatedLists function
  }
}

// ----- Read all tracks ---- //
async function readAllTracks(searchTerm) {
  let tracksData;
  if (searchTerm === "") {
    const res = await fetch(`${endpoint}/tracks`);
    tracksData = await res.json();
  } else {
    const res = await fetch(`${endpoint}/search/tracks?query=${searchTerm}`);
    tracksData = await res.json();
  }

  allTracks = tracksData.map((jsonObj) => new trackModel(jsonObj));
  renderTracksInHTML(allTracks);
}

function renderTracksInHTML(tracks) {
  const innerGrid = document.getElementById("resultsContainer");

  // Clear previous results
  innerGrid.innerHTML = "";

  // Render each track in the inner grid
  tracks.forEach((track) => {
    const trackHTML = TrackRenderer.render(track);
    innerGrid.insertAdjacentHTML("beforeend", trackHTML);
  });
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

export { createTrack, readAllTracks, updateTrack, deleteTrack, showCreateTrack };
