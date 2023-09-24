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

function zipArrays(array1, array2) {
  const zipped = [];

  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    zipped.push({
      ...array1[i], // Assuming array1 contains objects
      ...array2[i]  // Assuming array2 contains objects
    });
  }

  return zipped;
}

function displayResults(results, searchType) {
  clearResults();

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    results.forEach((result) => {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");

      if (searchType === "tracks") {
        // Displaying track information
        gridItem.textContent = `Track name: ${result.track_title}: ${result.duration}`;
      } else if (searchType === "artist") {
        // Display the artist information
        gridItem.textContent = `Artist name: ${result.artist_name}, Birth date: ${result.birth_date}`;
      } else if (searchType === "searchAll") {
        gridItem.textContent = `Type: "${result.entity_type}", name: "${result.name}", date: "${result.duration}"`;

        // Display the artist information
      } else if (searchType === "albums-with-artists-and-tracks") {
        // Display album information along with artists and tracks
        gridItem.textContent = `Album title: ${result.album_title}, Published: ${result.release_date}, Artist: ${result.artists[0].artist_name}`;

        const zippedData = zipArrays(result.artists, result.tracks);
          const artistsUl = document.createElement("dl");
          const artistHeader = document.createElement("dt");
          artistHeader.textContent = "Songs:";
          artistsUl.appendChild(artistHeader);
          result.tracks.forEach((data) => {
            const artistLi = document.createElement("dd");
            artistLi.textContent = `Name: ${data.track_title}, Duration: ${data.duration},  Artist: mangler`;
            artistsUl.appendChild(artistLi);
          });
          gridItem.appendChild(artistsUl);
        
      }

      gridContainer.appendChild(gridItem);
    });

    resultsContainer.appendChild(gridContainer);
  }
}


function clearResults() {
  resultsContainer.innerHTML = "";
}

