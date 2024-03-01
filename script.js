const btnRightClose = document.querySelector(".top-right-btn.close");
const sidebarRight = document.querySelector(".sidebar-right");
const centerContent = document.querySelector(".center-content");
const hiddenPostsBtn = document.querySelector(".hidden-posts");
const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.querySelector(".ipt-src");
const searchInput = document.querySelector(".input-search");
const node = document.querySelector(".row.node");
const btmHomeBtn = document.querySelector(".bottom-home-btn");
const btmSearchBtn = document.querySelector(".bottom-search-btn");
const otherTitle = document.querySelector(".other-title");

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
        art.classList.add("pt-2", "mb-1");
        art.innerText = element.artist.name;
        content.appendChild(art);
        art.href = `artist.html?id=${element.artist.id}`;

        let title = document.createElement("p");
        title.style.color = "grey";
        title.innerText = element.album.title;
        content.appendChild(title);

    });
}





fetchFnc();

btnRightClose.addEventListener("click", closeRight);
hiddenPostsBtn.addEventListener("click", toggleRight);
searchBtn.addEventListener("click", srcBarDisp);
searchInput.addEventListener("keyup", (event) => { ifEnter(event) });
btmHomeBtn.addEventListener("click", () => { location.href = "index.html" });
btmSearchBtn.addEventListener("click", () => { location.href = "search.html" });


// Navbar bottom player
// function bottomSong(title, artist, albumImg) {
//     const bottomBarSong = document.getElementById("song-content");

//     bottomBarSong.innerHTML = "";
//     let bottomCont = document.createElement("div");
//     bottomCont.classList.add("d-flex", "align-items-center", "p-3")

//     let img = document.createElement("img");
//     img.src = albumImg;
//     img.style.height = "50px";

//     let infoArtist = document.createElement("span");
//     infoArtist.innerHTML = `${title}<br>${artist}`;
//     infoArtist.classList.add("ms-3");

//     let icon = document.createElement("i");
//     icon.classList.add("fa-regular", "fa-heart", "ms-4");

//     bottomCont.appendChild(img);
//     bottomCont.appendChild(infoArtist);
//     bottomCont.appendChild(icon)

//     bottomBarSong.appendChild(bottomCont);


// }