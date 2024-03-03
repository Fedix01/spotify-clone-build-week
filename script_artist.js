//tramite ID dell'album su cui l'utente clicca

// id esempio (pink floyd)
let artistID = 860;

//URL 
const endpoint = `https://striveschool-api.herokuapp.com/api/deezer/artist/`;
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

//NODI UTILI
//sezione copertina:
const jumbotrone = document.getElementById("jumboTitle"); 
//sezione tabella risultati: 
const artistTable = document.getElementById("artistTable");
//sezione favourite songs:
const favSongSection = document.getElementById("favSongSection");

//Tasti per la riproduzione brani 
const playerBtn = document.getElementById("playerBtn");
const backwardBtn = document.getElementById("backward-btn");
const forwardBtn = document.getElementById("forward-btn");
const volumeSlider = document.getElementById("volume-slider")

window.onload = getArtist ()

//fetch GET artista 
async function getArtist () {
    try {
        let response = await fetch(endpoint+id);
        let object = await response.json();
        createTitlePage (object);
        getTracks(object);
        innerFavourite(object);
    } catch (error) {
        console.log(error)
    }
}

// funzione che mostra i dati nel jumbotron: 
function createTitlePage ({name, picture_xl}) {
    let pTitle = document.querySelector("#jumboTitle p");
    pTitle.innerText = `${name}`;

    let coverImg = document.querySelector("#jumboTitle");
    coverImg.style.backgroundImage = `url(${picture_xl})`
    coverImg.classList.add("jumbotron");
}

// funzione che richiama endpoint per tracklist:
async function getTracks ({tracklist}) {
    try {
        let response = await fetch(tracklist);
        let object = await response.json();       

        let [one, two, three, four, five, six] = object.data; // voglio solo le prime 5
        let tracksToShow = [];
        tracksToShow.push(one, two, three, four, five);
        tracksToShow.forEach(track => {
            showTracks(track);
        });

        let albumtoShow = [];
        albumtoShow.push(one, two, three, four, five, six); // voglio solo 6 album
        albumtoShow.forEach(album => {
            createCardOthers (album);
        });
        
    } catch (error) {
        console.log("There's an error!")
    }
}

// funzione che mostra tracklist in table:
// li number: 
let listNumber = 1;
function showTracks ({title, artist, album, duration, rank, preview}) {

    //tableTr
    let tableTr = document.createElement("tr");
    tableTr.classList.add("border-0");
    artistTable.appendChild(tableTr);

    //tableTh
    let tableTh = document.createElement("th");
    let tableThNumber = listNumber;
    listNumber++;
    tableTh.classList.add("text-white", "px-2", "font-size-10pt")
    tableTh.innerText = `${tableThNumber}`;

    //tableTD
    let firstTableTd = document.createElement("td");
    let albumPrev = document.createElement("img");
    albumPrev.classList.add("img-tracklist");
    albumPrev.src = `${album.cover}`;
    let titleTrack = document.createElement("span");
    titleTrack.classList.add("text-white", "fw-bold", "font-size-10pt");
    titleTrack.innerText = `${title}`;
    titleTrack.style.cursor = "pointer";
    titleTrack.addEventListener("click", () => {
        bottomSong(title, artist, album)
        playSong(preview)
    })

    let secondTableTd = document.createElement("td");
    secondTableTd.classList.add("text-white", "ps-2", "font-size-10pt");
    secondTableTd.innerText = `${rank}`;    

    let thirdTableTd = document.createElement("td");
    thirdTableTd.classList.add("text-white", "font-size-10pt");
    thirdTableTd.innerText = `${duration}`;

    tableTr.appendChild(tableTh);
    tableTr.appendChild(firstTableTd);
    firstTableTd.append(albumPrev, titleTrack);
    tableTr.appendChild(secondTableTd);
    tableTr.appendChild(thirdTableTd);
}


//funzione che aggiorna la sezione "Brani che ti piacciono":
function innerFavourite ({name, picture}) {
    let favImg = document.querySelector("#favSongSection img");
    favImg.classList.add("img-favourite", "me-3");
    favImg.src = `${picture}`;
    favImg.alt = "artist_image";

    let favSpan = document.querySelector("#favSongSection div span:last-of-type");
    favSpan.classList.add("font-size-10pt");
    favSpan.innerText = `di ${name}`;
}

//funzione che crea altri contenuti
function createCardOthers ({artist, album}) {
    let otherRow = document.getElementById("otherRow");

    let otherCol = document.createElement("div");
    otherCol.classList.add("col-12", "col-md-4", "col-lg-4");
    otherRow.appendChild(otherCol);

    let otherCard = document.createElement("div");
    otherCard.classList.add("card", "w-100");
    otherCol.appendChild(otherCard);

    let rowCard = document.createElement("div");
    rowCard.classList.add("row");
    otherCard.appendChild(rowCard);

    let colCard = document.createElement("div");
    colCard.classList.add("col-5");
    rowCard.appendChild(colCard);

    let imgCard = document.createElement("img");
    imgCard.classList.add("img-fluid", "rounded-start", "p-0");
    imgCard.src = `${album.cover}`;
    colCard.appendChild(imgCard);

    let colCard2 = document.createElement("div");
    colCard2.classList.add("col-7", "p-0");
    rowCard.appendChild(colCard2);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-overflow");
    colCard2.appendChild(cardBody);

    let cardTitle = document.createElement("a");
    cardTitle.classList.add("card-title", "font-size-10pt", "fw-bold", "linkToAlbum");
    cardTitle.href = `album.html?id=${album.id}`
    cardTitle.innerText = `${album.title}`
    cardBody.appendChild(cardTitle);

    let cardLink = document.createElement("p");
    cardLink.classList.add("font-size-10pt");
    cardLink.innerText = `${artist.name}`
    cardBody.appendChild(cardLink);
}

// funzione onclick seeMore 
function seeMore() {
    let hiddenSection = document.getElementById("otherAlbum");
    hiddenSection.classList.remove("d-none");

    let seeMoreBtn = document.getElementById("seeMoreBtn");
    seeMoreBtn.style.visibility = "hidden";
}


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
        otherTitle.innerText = "Risultati della tua ricerca";
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

// Navbar bottom player

function bottomSong(title, artist, album) {
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
    
   /*  let sideList = document.createElement("li");
    sideList.innerText = title;
    sideList.style.listStyle = "none";
    sideList.classList.add("py-2");
    
    songsSide.appendChild(sideList); */
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
 
