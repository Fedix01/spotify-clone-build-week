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
function showTracks ({album, title, duration, rank}) {

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