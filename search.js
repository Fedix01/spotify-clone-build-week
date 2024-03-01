const btmHomeBtn = document.querySelector(".bottom-home-btn");
const btmSearchBtn = document.querySelector(".bottom-search-btn");
const inputSearch = document.querySelector(".resp-input-search");
const node = document.querySelector(".node");
const titleSearch = document.querySelector(".dynamic-title");

const ifEnter = (event) =>{
    if(event.key === "Enter"){
        titleSearch.innerText = "Risultati della tua ricerca";
        fetchFnc(inputSearch.value)
    }
}

const fetchFnc = async (idSearch)=>{
    try{
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${idSearch}`);
        let json = await response.json();
        displayFnc(json.data);

    }catch(err){
        console.log(err);
    }
};

const displayFnc = (array) => {
    node.innerHTML = "";
    array.forEach(element => {
        let side = document.createElement("div");
        side.classList.add("col-6", "my-2");
        node.appendChild(side)
        
        let content = document.createElement("div");
        content.classList.add("p-3");
        content.style.backgroundColor = "rgb(18, 18, 18)";
        content.style.borderRadius = "10px";
        content.style.height = "100%"
        side.appendChild(content);

        let img = document.createElement("img");
        img.src = element.album.cover_medium;
        img.style.width = "100%";
        content.appendChild(img);

        let art = document.createElement("p");
        art.classList.add("pt-2", "mb-1");
        art.innerText = element.artist.name;
        content.appendChild(art);

        let title = document.createElement("p");
        title.style.color = "grey";
        title.innerText = element.album.title;
        content.appendChild(title);

    });
}

btmHomeBtn.addEventListener("click", ()=>{location.href = "index.html"});
btmSearchBtn.addEventListener("click", ()=>{location.href = "search.html"});
inputSearch.addEventListener("keyup", ifEnter);