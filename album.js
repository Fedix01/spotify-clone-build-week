const albumContent = document.getElementById("album-content");

const tableContent = document.getElementById("dynamicRows");

let countTrack = 1;

const playerBtn = document.getElementById("playerBtn");
const backwardBtn = document.getElementById("backward-btn");
const forwardBtn = document.getElementById("forward-btn");
const volumeSlider = document.getElementById("volume-slider")
const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const songsSide = document.getElementById("songsSide");

const albumContentMobile = document.getElementById("album-content-mobile");

const songsMob = document.getElementById("songs-mob");

const sidebarRight = document.querySelector(".sidebar-right");
const centerContent = document.querySelector(".center-content");
const btnRightClose = document.querySelector(".top-right-btn.close");


// btnRightClose.addEventListener("click", () => {
//   closeRight();
// });
// hiddenPostsBtn.addEventListener("click", () => {
//   toggleRight();
// });

// Sidebar closing

// const closeRight = () => {
//   sidebarRight.classList.add("d-none");
//   centerContent.classList.remove("col-lg-8");
//   centerContent.classList.add("col-lg-10");
//   hiddenPostsBtn.innerText = "VISUALIZZA ANNUNCI";
// };

// const toggleRight = () => {
//   sidebarRight.classList.toggle("d-none");

//   if (hiddenPostsBtn.innerText === "NASCONDI ANNUNCI") {
//     hiddenPostsBtn.innerHTML = "VISUALIZZA ANNUNCI";
//     centerContent.classList.remove("col-lg-8");
//     centerContent.classList.add("col-lg-10");
//   } else {
//     hiddenPostsBtn.innerText = "NASCONDI ANNUNCI";
//     centerContent.classList.add("col-lg-8");
//     centerContent.classList.remove("col-lg-10");
//   }
// };

window.onload = getFromApi();

async function getFromApi() {
  try {
    const results = await fetch(`${endpoint}${id}`);
    const json = await results.json();
    console.log(json);
    createHtml(json);
    createHtmlMob(json);
  } catch (error) {
    console.log(error);
  }
}

function createHtml(album) {
  // parte superiore artista album

  let topAlbumCont = document.createElement("div");
  topAlbumCont.classList.add(
    "d-md-flex",
    "d-none",
    "mt-5",
    "container-fluid",
    "align-items-center"
  );

  let imgCont = document.createElement("div");

  let albumImg = document.createElement("img");
  albumImg.src = album.cover_big;
  albumImg.classList.add("img-fluid", "album-img");

  let infoCont = document.createElement("div");
  infoCont.classList.add("ms-3");

  let albumSub = document.createElement("h6");
  albumSub.innerText = "ALBUM";
  let albumTitle = document.createElement("h2");
  albumTitle.innerText = album.title;
  albumTitle.style.fontSize = "50px";

  let artistInfoCont = document.createElement("div");
  artistInfoCont.style.marginTop = "70px";
  artistInfoCont.style.position = "absolute";

  let artistImg = document.createElement("img");
  artistImg.src = album.artist.picture;
  artistImg.classList.add("artist-img");

  let artistTitle = document.createElement("span");
  artistTitle.innerText = ` ${album.artist.name}·${album.release_date}·${album.nb_tracks} brani, ${album.duration} minuti`;

  artistInfoCont.appendChild(artistImg);
  artistInfoCont.appendChild(artistTitle);

  imgCont.appendChild(albumImg);

  infoCont.appendChild(albumSub);
  infoCont.appendChild(albumTitle);
  infoCont.appendChild(artistInfoCont);

  topAlbumCont.appendChild(imgCont);
  topAlbumCont.appendChild(infoCont);

  albumContent.appendChild(topAlbumCont);

  // barra comandi

  let middleAlbumCont = document.createElement("div");
  middleAlbumCont.classList.add("d-flex", "mt-3", "align-items-center");

  let playBtnCont = document.createElement("div");

  let playBtn = document.createElement("i");
  playBtn.classList.add("fa-solid", "fa-circle-play", "p-3", "me-2");
  playBtn.style.color = "#1ed75f";
  playBtn.style.fontSize = "50px";
  playBtn.style.cursor = "pointer";

  let groupBtn = document.createElement("div");

  let heartBtn = document.createElement("i");
  heartBtn.classList.add("fa-regular", "fa-heart", "p-3");
  heartBtn.style.fontSize = "35px";
  heartBtn.style.cursor = "pointer";

  let downloadBtn = document.createElement("i");
  downloadBtn.classList.add("fa-solid", "fa-circle-arrow-down", "p-3");
  downloadBtn.style.fontSize = "35px";
  downloadBtn.style.cursor = "pointer";

  let dotsBtn = document.createElement("i");
  dotsBtn.classList.add("fa-solid", "fa-ellipsis", "p-3");
  dotsBtn.style.fontSize = "35px";
  downloadBtn.style.cursor = "pointer";

  playBtnCont.appendChild(playBtn);

  groupBtn.appendChild(heartBtn);
  groupBtn.appendChild(downloadBtn);
  groupBtn.appendChild(dotsBtn);

  middleAlbumCont.appendChild(playBtnCont);
  middleAlbumCont.appendChild(groupBtn);

  albumContent.appendChild(middleAlbumCont);

  // tabella con canzoni album

  let allTracks = album.tracks.data;
  allTracks.forEach((track) => {
    createTable(track);
  });
}


function createTable(track) {
  console.log(track);
  let tRows = document.createElement("tr");

  let trackNum = document.createElement("th");
  trackNum.innerText = countTrack;
  countTrack++;

  let trackTitleCont = document.createElement("td");
  trackTitleCont.style.cursor = "pointer";

  let trackTitleBox = document.createElement("div");
  trackTitleBox.innerHTML = `${track.title}<br>${track.artist.name}`;

  trackTitleCont.addEventListener("click", () => {
    bottomSong(track);
    playSong(track.preview)
  });

  trackTitleCont.appendChild(trackTitleBox);

  let trackRank = document.createElement("td");
  trackRank.innerText = track.rank;

  let trackDuration = document.createElement("td");
  trackDuration.innerText = `${track.duration} secondi`;

  tRows.appendChild(trackNum);
  tRows.appendChild(trackTitleCont);
  tRows.appendChild(trackRank);
  tRows.appendChild(trackDuration);

  tableContent.appendChild(tRows);
}

// Navbar bottom player

function bottomSong({ title, artist, album}) {
  const bottomBarSong = document.getElementById("song-content");

  bottomBarSong.innerHTML = "";
  let bottomCont = document.createElement("div");
  bottomCont.classList.add("d-flex", "align-items-center", "p-3");

  let img = document.createElement("img");
  img.src = album.cover_small;
  img.style.height = "50px";

  let infoArtist = document.createElement("span");
  infoArtist.innerHTML = `${title}<br>${artist.name}`;
  infoArtist.classList.add("ms-3");

  let icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-heart", "ms-4");

  bottomCont.appendChild(img);
  bottomCont.appendChild(infoArtist);
  bottomCont.appendChild(icon);

  bottomBarSong.appendChild(bottomCont);
  
  let sideList = document.createElement("li");
  sideList.innerText = title;
  sideList.style.listStyle = "none";
  sideList.classList.add("py-2");
  
  songsSide.appendChild(sideList);
}

function playSong(preview) {
    let mySong = new Audio(preview);
    
    playerBtn.addEventListener("click", () => {
      stopStartMusic(mySong);
    });
    
    backwardBtn.addEventListener("click", () => {
      restartMusic(mySong);
    });
    
    forwardBtn.addEventListener("click", () => {
      endMusic(mySong);
    });
    
    mySong.ontimeupdate = (event) => {
      updateProgress(mySong);
    };

    volumeSlider.addEventListener("input", (event) => {
      mySong.volume = event.target.value; 
    })
}

function stopStartMusic(mySong) {
  if (mySong.paused) {
    console.log("song was paused. Playing again !");
    mySong.play();
    playerBtn.classList.remove("fa-solid", "fa-play");
    playerBtn.classList.add("fa-solid", "fa-pause");
  } else if (!mySong.paused) {
    console.log("song was playing. Putting in pause !");
    mySong.pause();
    playerBtn.classList.remove("fa-solid", "fa-pause");
    playerBtn.classList.add("fa-solid", "fa-play");
  }
}

function restartMusic(mySong) {
  mySong.currentTime = 0;
  updateProgress(mySong);
}

function endMusic(mySong) {
  mySong.currentTime = mySong.duration;
  updateProgress(mySong);
}

let progressBar = document.getElementById("progress-bar");

function updateProgress(mySong) {
  let percentage = Math.round((mySong.currentTime / mySong.duration) * 100);
  progressBar.style.width = `${percentage}%`;
}

function createHtmlMob(album) {
  albumContentMobile.classList.add("d-block", "d-md-none");

  let topAlbumCont = document.createElement("div");

  let imgCont = document.createElement("div");
  imgCont.classList.add("d-flex", "justify-content-center", "my-4");

  let albumImg = document.createElement("img");
  albumImg.src = album.cover;
  albumImg.classList.add("img-fluid", "album-img-mob");

  let infoCont = document.createElement("div");
  infoCont.classList.add("ms-1");

  let albumTitle = document.createElement("h2");
  albumTitle.innerText = album.title;
  albumTitle.style.fontSize = "20px";

  let artistInfoCont = document.createElement("div");
  artistInfoCont.style.marginTop = "10px";

  let artistImg = document.createElement("img");
  artistImg.src = album.artist.picture;
  artistImg.classList.add("artist-img");

  let artistTitle = document.createElement("span");
  artistTitle.innerHTML = ` ${album.artist.name}`;

  let artistAlbum = document.createElement("h5");
  artistAlbum.innerText = `Album · ${album.release_date}`;
  artistAlbum.classList.add("mt-2");
  artistAlbum.style.fontSize = "15px";
  artistAlbum.style.color = "gray";

  artistInfoCont.appendChild(artistImg);
  artistInfoCont.appendChild(artistTitle);
  artistInfoCont.appendChild(artistAlbum);

  imgCont.appendChild(albumImg);

  infoCont.appendChild(albumTitle);
  infoCont.appendChild(artistInfoCont);

  topAlbumCont.appendChild(imgCont);
  topAlbumCont.appendChild(infoCont);

  albumContentMobile.appendChild(topAlbumCont);

  // barra comandi

  let middleAlbumCont = document.createElement("div");
  middleAlbumCont.classList.add(
    "d-flex",
    "mt-3",
    "align-items-center",
    "justify-content-between"
  );

  let heartBtn = document.createElement("i");
  heartBtn.classList.add("fa-regular", "fa-heart", "p-2");
  heartBtn.style.fontSize = "20px";
  heartBtn.style.cursor = "pointer";

  let downloadBtn = document.createElement("i");
  downloadBtn.classList.add("fa-solid", "fa-circle-arrow-down", "p-2");
  downloadBtn.style.fontSize = "20px";
  downloadBtn.style.cursor = "pointer";

  let dotsBtn = document.createElement("i");
  dotsBtn.classList.add("fa-solid", "fa-ellipsis", "p-2");
  dotsBtn.style.fontSize = "20px";
  dotsBtn.style.cursor = "pointer";

  let playBtnCont = document.createElement("div");

  let playBtn = document.createElement("i");
  playBtn.classList.add("fa-solid", "fa-circle-play", "p-3", "me-2");
  playBtn.style.color = "#1ed75f";
  playBtn.style.fontSize = "50px";
  playBtn.style.cursor = "pointer";

  let groupBtn = document.createElement("div");

  playBtnCont.appendChild(playBtn);

  groupBtn.appendChild(heartBtn);
  groupBtn.appendChild(downloadBtn);
  groupBtn.appendChild(dotsBtn);

  middleAlbumCont.appendChild(groupBtn);
  middleAlbumCont.appendChild(playBtnCont);

  albumContentMobile.appendChild(middleAlbumCont);

  // tabella con canzoni album

  let allTracks = album.tracks.data;
  allTracks.forEach((track) => {
    createSongsMob(track);
  });
}

function createSongsMob(track) {

  songsMob.classList.add("d-block", "d-md-none");
  let songCont = document.createElement("div");
  songCont.classList.add(
    "d-flex",
    "align-items-center",
    "justify-content-between",
    "my-2"
  );

  let songInfoBox = document.createElement("div");
  let songInfo = document.createElement("h4");
  songInfo.innerHTML = `${track.title}`;
  songInfo.style.fontSize = "15px";

  let songArtist = document.createElement("h5");
  songArtist.classList.add("mt-1");
  songArtist.innerText = `${track.artist.name}`;
  songArtist.style.color = "gray";
  songArtist.style.fontSize = "15px";

  let dots = document.createElement("i");
  dots.classList.add("fa-solid", "fa-ellipsis-vertical");

  songInfoBox.appendChild(songInfo);
  songInfoBox.appendChild(songArtist);

  songCont.appendChild(songInfoBox);
  songCont.appendChild(dots);

  songsMob.appendChild(songCont);
}



//SEARCH FUNCTION
// FUNZIONE RICERCA: 
const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector(".ipt-src");
const searchInput = document.querySelector(".input-search");
const otherTitle = document.querySelector(".other-title");
const node = document.querySelector(".row.node");


const srcBarDisp = () => {
    searchBar.classList.remove("d-none");
}

const ifEnter = (event) => {
    if (event.key === "Enter") {
        searchBar.classList.add("d-none");
        let src = searchInput.value;
        otherTitle.classList.remove("d-none");
        console.log(searchInput.value);
        searchInput.value = "";
        fetchFnc(src);
    }
}

const fetchFnc = async (idSearch) => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${idSearch}`);
        let json = await response.json();
        console.log(json.data)
        displayFnc(json.data);

    } catch (err) {
        console.log(err);
    }
};

const displayFnc = (array) => {
    node.innerHTML = "";
    array.forEach(element => {
        console.log(element)
        let side = document.createElement("div");
        side.classList.add("col-sm-6", "col-md-4", "col-lg-3", "my-2");
        node.appendChild(side)

        let content = document.createElement("div");
        content.classList.add("p-3");
        content.style.backgroundColor = "rgb(18, 18, 18)";
        content.style.borderRadius = "10px";
        content.style.height = "100%"
        side.appendChild(content);

        let imgContainer = document.createElement("a");
        imgContainer.href = `album.html?id=${element.album.id}`;

        let img = document.createElement("img");
        img.src = element.album.cover_medium;
        img.style.width = "100%";
        imgContainer.appendChild(img);
        content.appendChild(imgContainer);

        let art = document.createElement("a");
        art.classList.add("pt-2", "mb-1", "fs-6");
        art.innerText = element.artist.name;
        content.appendChild(art);
        art.href = `artist.html?id=${element.artist.id}`;

        let title = document.createElement("p");
        title.style.color = "grey";
        title.innerText = element.album.title;
        content.appendChild(title);

    });
}
searchBtn.addEventListener("click", srcBarDisp);
searchInput.addEventListener("keyup", (event) => { ifEnter(event) });

const openBtnCont = document.querySelector(".open-btn-cont");
const openRightBtn = document.querySelector(".open-right-btn");

const toggleRight = () => {
  sidebarRight.classList.toggle("d-none");
  let stateSidebar = sidebarRight.classList.toString();
  if (stateSidebar.includes("d-none")) {
    openBtnCont.classList.remove("d-none");
    centerContent.classList.remove("col-lg-8");
    centerContent.classList.add("col-lg-10");
  } else {
    openBtnCont.classList.add("d-none");
    centerContent.classList.add("col-lg-8");
    centerContent.classList.remove("col-lg-10");
  }

}

btnRightClose.addEventListener("click", toggleRight);
openRightBtn.addEventListener("click", toggleRight);