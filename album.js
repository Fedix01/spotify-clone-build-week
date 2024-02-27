const albumContent = document.getElementById("album-content");


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
    artistTitle.innerText = ` ${album.artist.name}·${album.release_date}·${album.nb_tracks} brani, ${album.duration}minuti`;

    artistInfoCont.appendChild(artistImg);
    artistInfoCont.appendChild(artistTitle);

    imgCont.appendChild(albumImg);

    infoCont.appendChild(albumSub)
    infoCont.appendChild(albumTitle);
    infoCont.appendChild(artistInfoCont);


    topAlbumCont.appendChild(imgCont);
    topAlbumCont.appendChild(infoCont);

    albumContent.appendChild(topAlbumCont);

}