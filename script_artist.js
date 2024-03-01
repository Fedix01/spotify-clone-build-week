//tramite ID dell'album su cui l'utente clicca

// id esempio (pink floyd)
let artistID = 860;

//URL 
const artistUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID}`;

//NODI UTILI
//sezione copertina:
const jumbotrone = document.getElementById("jumboTitle"); 
//sezione tabella risultati: 
const artistTable = document.getElementById("artistTable");
//sezione favourite songs:
const favSongSection = document.getElementById("favSongSection");

window.onload = getArtist ()

//fetch GET artista 
async function getArtist () {
    try {
        let response = await fetch(artistUrl);
        let object = await response.json();
        // console.log(object);
        createTitlePage (object);
        getTracks(object);
        innerFavourite(object);

    } catch (error) {
        console.log("There's an error!")
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

        let [one, two, three, four, five] = object.data; // voglio solo le prime 5
        let tracksToShow = [];
        tracksToShow.push(one, two, three, four, five);

        tracksToShow.forEach(track => {
            showTracks(track);

        })
        
    } catch (error) {
        console.log("There's an error!")
    }
}

// funzione che mostra tracklist in table:
// li number: 
let listNumber = 1;
function showTracks ({album, title, duration, rank}) {

    //tableTr
    let tableTr = document.createElement("tr");
    tableTr.classList.add("border-0");
    artistTable.appendChild(tableTr);

    //tableTh
    let tableTh = document.createElement("th");
    let tableThNumber = listNumber;
    listNumber++;
    tableTh.classList.add("text-white", "px-2")
    tableTh.innerText = `${tableThNumber}`;

    //tableTD
    let firstTableTd = document.createElement("td");
    let albumPrev = document.createElement("img");
    albumPrev.classList.add("img-tracklist");
    albumPrev.src = `${album.cover}`;
    let titleTrack = document.createElement("span");
    titleTrack.classList.add("text-white", "fw-bold");
    titleTrack.innerText = `${title}`;

    let secondTableTd = document.createElement("td");
    secondTableTd.classList.add("text-white", "ps-2");
    secondTableTd.innerText = `${rank}`;
    

    let thirdTableTd = document.createElement("td");
    thirdTableTd.classList.add("text-white");
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
    favImg.classList.add("img-favourite", "mx-3");
    favImg.src = `${picture}`;
    favImg.alt = "artist_image";

    let favSpan = document.querySelector("#favSongSection div span:last-of-type");
    favSpan.innerText = `Di ${name}`;
}

/* <div class="col-12 col-sm-12 col-md-3 col-lg-3">
<div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-title">Album</p>
      <p class="card-text">Artista</p>
    </div>
</div>
</div> */