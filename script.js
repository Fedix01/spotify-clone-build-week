const btnRightClose = document.querySelector(".top-right-btn.close");
const sidebarRight = document.querySelector(".sidebar-right");
const centerContent = document.querySelector(".center-content");
const hiddenPostsBtn = document.querySelector(".hidden-posts");

const closeRight = () => {
  sidebarRight.classList.add("d-none");
  centerContent.classList.add("col-10");
  centerContent.classList.remove("col-8");
  hiddenPostsBtn.innerText = "VISUALIZZA ANNUNCI";
};

const openRight = () => {
  sidebarRight.classList.toggle("d-none");
  centerContent.classList.toggle("col-10");
  centerContent.classList.toggle("col-8");
  if (hiddenPostsBtn.innerText === "NASCONDI ANNUNCI") {
    hiddenPostsBtn.innerHTML = "VISUALIZZA ANNUNCI";
  } else {
    hiddenPostsBtn.innerText = "NASCONDI ANNUNCI";
  }
};


/* Codice per la ricerca . 
API : https://striveschool-api.herokuapp.com/api/deezer/search?=q{query}

*/

let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let searchValue = undefined;
let songsResultsBox = document.getElementById('songs-result')
let albumsResultsBox = document.getElementById('albums-result')
let defaultContentBox = document.getElementById('content-center')

function searchSongs() {
    searchInput.classList.toggle("d-none")
    searchValue = searchInput.value;
    // Dato che l'utente clicca sul tasto sia per far comparire l'input che per eseguire la ricerca,
    // controlliamo che non venga fatta la fetch quando è ancora inizialmente vuoto
    if (searchValue != "" ) {
        getResults(searchValue)
    }
}

async function getResults(query) {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    );
    const json = await res.json();
    searchInput.classList.toggle("d-none")
    songsResultsBox.innerHTML = ""; 
    defaultContentBox.classList.toggle("d-none")
    songsResultsBox.classList.toggle("d-none")
    json.data.forEach( (single_song) => {
       createResultingSongs(single_song)
    })
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

let createResultingSongs = ({ title, artist, album, preview }) => {
       // My song template:
    // <div class="text-light p-3 text-center">
    //   <img src="" alt="No image here...">
    //   <h6 class="mt-2 mb-0">Flower</h6>
    //   <a href="index.html?q=[song.artist.id]">Artista</a>
    // </div>

    // <i class="fa-regular fa-circle-play"></i>

    let songBox = document.createElement("div");
    songBox.classList.add("text-light", "p-3", "text-center", "col-3");
    let songImg = document.createElement("img");
    songImg.src = album.cover_medium;
    let songTitle = document.createElement("h6");
    songTitle.classList.add("mt-2", "mb-0");
    songTitle.innerText = title;
    let songArtist = document.createElement("a");
    songArtist.href = `artist.html?id=${artist.id}`;
    songArtist.innerText = artist.name;
    let playBtn = document.createElement("i");
    playBtn.classList.add("fa-regular", "fa-circle-play", "ml-2");
    playBtn.addEventListener("click", () => {
        playSong(preview);
    });

    songBox.appendChild(songImg);
    songBox.appendChild(songTitle);
    songBox.appendChild(songArtist);
    songBox.appendChild(playBtn);

    songsResultsBox.appendChild(songBox);    
}

// Funzione per riprodurre la demo del brano:
function playSong(url) {
    // console.log(url);
    let mySong = new Audio(url);
    mySong.play();
}



// Navbar bottom player in HOMEPAGE ((FEDERICO))

// function bottomSong(title, artist, albumImg) {
//   const bottomBarSong = document.getElementById("song-content");

//   bottomBarSong.innerHTML = "";
//   let bottomCont = document.createElement("div");
//   bottomCont.classList.add("d-flex", "align-items-center", "p-3")

//   let img = document.createElement("img");
//   img.src = albumImg;
//   img.style.height = "50px";

//   let infoArtist = document.createElement("span");
//   infoArtist.innerHTML = `${title}<br>${artist}`;
//   infoArtist.classList.add("ms-3");

//   let icon = document.createElement("i");
//   icon.classList.add("fa-regular", "fa-heart", "ms-4");

//   bottomCont.appendChild(img);
//   bottomCont.appendChild(infoArtist);
//   bottomCont.appendChild(icon)

//   bottomBarSong.appendChild(bottomCont);


// }