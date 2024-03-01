const albumContent = document.getElementById("album-content");

const tableContent = document.getElementById("dynamicRows");

let countTrack = 1;

const playerBtn = document.getElementById("playerBtn");

const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const songsSide = document.getElementById("songsSide");

const albumContentMobile = document.getElementById("album-content-mobile");

const songsMob = document.getElementById("songs-mob")


const sidebarRight = document.querySelector(".sidebar-right");
const centerContent = document.querySelector(".center-content");
const hiddenPostsBtn = document.querySelector(".hidden-posts");
const btnRightClose = document.querySelector(".top-right-btn.close");

btnRightClose.addEventListener("click", () => {
    closeRight()
});
hiddenPostsBtn.addEventListener("click", () => {
    toggleRight()
});

// Sidebar closing

const closeRight = () => {
    sidebarRight.classList.add("d-none");
    centerContent.classList.remove("col-lg-8");
    centerContent.classList.add("col-lg-10");
    hiddenPostsBtn.innerText = "VISUALIZZA ANNUNCI";
}

const toggleRight = () => {
    sidebarRight.classList.toggle("d-none");

    if (hiddenPostsBtn.innerText === "NASCONDI ANNUNCI") {
        hiddenPostsBtn.innerHTML = "VISUALIZZA ANNUNCI";
        centerContent.classList.remove("col-lg-8");
        centerContent.classList.add("col-lg-10");
    } else {
        hiddenPostsBtn.innerText = "NASCONDI ANNUNCI";
        centerContent.classList.add("col-lg-8");
        centerContent.classList.remove("col-lg-10");
    }
}

window.onload = getFromApi()

async function getFromApi() {
    try {
        const results = await fetch(`${endpoint}${id}`);
        const json = await results.json();
        console.log(json)
        createHtml(json)
        createHtmlMob(json)
    } catch (error) {
        console.log(error)
    }
}

function createHtml(album) {
    // parte superiore artista album

    let topAlbumCont = document.createElement("div");
    topAlbumCont.classList.add("d-md-flex", "d-none", "mt-5", "container-fluid", "align-items-center");

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
    console.log(track)
    let tRows = document.createElement("tr");

    let trackNum = document.createElement("th");
    trackNum.innerText = countTrack;
    countTrack++;

    let trackTitleCont = document.createElement("td");
    trackTitleCont.style.cursor = "pointer";

    let trackTitleBox = document.createElement("div");
    trackTitleBox.innerHTML = `${track.title}<br>${track.artist.name}`;

    trackTitleCont.addEventListener("click", () => {
        bottomSong(track.title, track.artist.name, track.album.cover_small, track.preview)
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

// Navbar bottom player

function bottomSong(title, artist, albumImg, preview) {
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

    playerBtn.addEventListener("click", () => {
        playMusic(preview)
    })

    let sideList = document.createElement("li");
    sideList.innerText = title;
    sideList.style.listStyle = "none";
    sideList.classList.add("py-2");

    songsSide.appendChild(sideList)

}

function playMusic(url) {

    let mySong = new Audio(url);

    if (mySong.paused) {
        mySong.play();
        playerBtn.classList.remove("fa-solid", "fa-play")
        playerBtn.classList.add("fa-solid", "fa-pause");
    } else if (!mySong.paused) {
        mySong.pause();
        playerBtn.classList.remove("fa-solid", "fa-pause");
        playerBtn.classList.add("fa-solid", "fa-play")
    }
    // let isPlaying = false;

    // isPlaying ? mySong.pause() : mySong.play();


    // mySong.onplaying = function () {
    //     isPlaying = true;
    // };
    // mySong.onpause = function () {
    //     isPlaying = false;
    // };

}

function createHtmlMob(album) {
    albumContentMobile.classList.add("d-block", "d-md-none")

    let topAlbumCont = document.createElement("div");


    let imgCont = document.createElement("div");
    imgCont.classList.add("d-flex", "justify-content-center", "my-4");

    let albumImg = document.createElement("img");
    albumImg.src = album.cover;
    albumImg.classList.add("img-fluid", "album-img-mob");

    let infoCont = document.createElement("div");
    infoCont.classList.add("ms-1")


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
    artistAlbum.classList.add("mt-2")
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
    middleAlbumCont.classList.add("d-flex", "mt-3", "align-items-center", "justify-content-between");

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
        createSongsMob(track)
    })


}

function createSongsMob(track) {
    console.log(track)
    songsMob.classList.add("d-block", "d-md-none")
    let songCont = document.createElement("div");
    songCont.classList.add("d-flex", "align-items-center", "justify-content-between", "my-2")

    let songInfoBox = document.createElement("div");
    let songInfo = document.createElement("h4");
    songInfo.innerHTML = `${track.title}`;
    songInfo.style.fontSize = "15px";

    let songArtist = document.createElement("h5");
    songArtist.classList.add("mt-1")
    songArtist.innerText = `${track.artist.name}`;
    songArtist.style.color = "gray";
    songArtist.style.fontSize = "15px";

    let dots = document.createElement("i");
    dots.classList.add("fa-solid", "fa-ellipsis-vertical");

    songInfoBox.appendChild(songInfo);
    songInfoBox.appendChild(songArtist);

    songCont.appendChild(songInfoBox);
    songCont.appendChild(dots);

    songsMob.appendChild(songCont)
}