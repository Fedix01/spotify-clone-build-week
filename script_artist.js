//URL endpoint:
const urlSongs = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen"; //! cambiare querystring

// todo NODI UTILI:
const pageCover = document.getElementById("jumboTitle"); 

const artistTable = document.getElementById("artistTable");

const favSong = document.getElementById("favSongSection");

getArtist ()

//fetch tracklist:
async function getArtist () {
    try {
        let response = await fetch(urlSongs);
        let object = await response.json();
        object = object.data; // oggetto con tutti i contenuti relativi allo specifico artista
        console.log(object) 
        
        getPageTitle(object);
          
    } catch (error) {
        console.log("there's an error in your request!")
    }
}

// inner jumbotron:
function getPageTitle () {
    let artistTitle = document.querySelector("#jumboTitle p:first-of-type");
    artistTitle.innerText = "The Queen";
    
}






/* todo <tbody>
    <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
    </tr>
    </tbody>*/ 