const albumContent = document.getElementById("album-content");

const tableContent = document.getElementById("dynamicRows");

let countTrack = 1;

const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

window.onload = getFromApi()

async function getFromApi() {
    try {
        const results = await fetch(`${endpoint}1121401`);
        const json = await results.json();
        console.log(json)
        createHtml(json)
    } catch (error) {
        console.log(error)
    }
}

function createHtml(album) {
    // parte superiore artista album

    let topAlbumCont = document.createElement("div");
    topAlbumCont.classList.add("d-flex", "mt-5", "container-fluid", "align-items-center");

    let imgCont = document.createElement("div");

    let albumImg = document.createElement("img");
    albumImg.src = album.cover_big;
    albumImg.classList.add("img-fluid", "album-img");

    let infoCont = document.createElement("div");
    infoCont.classList.add("ms-3")

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

    infoCont.appendChild(albumSub)
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
    downloadBtn.style.cursor = "pointer"

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
        createTable(track)
    })


}

function createTable(track) {
    let tRows = document.createElement("tr");

    let trackNum = document.createElement("th");
    trackNum.innerText = countTrack;
    countTrack++;

    let trackTitleCont = document.createElement("td");
    trackTitleCont.style.cursor = "pointer";

    let trackTitleBox = document.createElement("div");
    trackTitleBox.innerHTML = `${track.title}<br>${track.artist.name}`;

    trackTitleCont.addEventListener("click", () => {
        bottomSong(track.title, track.artist.name, track.album.cover_small)
    })

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

function bottomSong(title, artist, albumImg) {
    const bottomBarSong = document.getElementById("song-content");

    bottomBarSong.innerHTML = "";
    let bottomCont = document.createElement("div");
    bottomCont.classList.add("d-flex", "align-items-center", "p-3")

    let img = document.createElement("img");
    img.src = albumImg;
    img.style.height = "50px";

    let infoArtist = document.createElement("span");
    infoArtist.innerHTML = `${title}<br>${artist}`;
    infoArtist.classList.add("ms-3");

    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-heart", "ms-4");

    bottomCont.appendChild(img);
    bottomCont.appendChild(infoArtist);
    bottomCont.appendChild(icon)

    bottomBarSong.appendChild(bottomCont);


}