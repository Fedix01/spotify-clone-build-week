<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Spotify</title>
</head>
<body>
    <div class="container-fluid fixed-top">
        <div class="row px-1">
            <!-- sidebar left -->
            <div class="col-2 sidebar-left">
                <div class="head-left-cont col-12 px-0">
                    <div class="home">
                        <a href="#" type="button">
                            <i class="fa-solid fa-house p-2"></i>
                            <span>Home</span>
                        </a>
                    </div>
                    <div class="search">
                        <a href="#" type="button">
                            <i class="fa-solid fa-magnifying-glass p-2"></i>
                            <span>Cerca</span>
                        </a>
                    </div>
                    <div class="books">
                        <a href="#" type="button">
                            <i class="fa-solid fa-book p-2"></i>
                            <span>La tua libreria</span>
                        </a>
                    </div>
                </div>
                <div class="center-left-cont col-12 px-0 mt-3">
                    <div class="playlist">
                        <a href="#" type="button">
                            <i class="fa-solid fa-square-plus p-2"></i>
                            <span>Crea Playlist</span>
                        </a>
                    </div>
                    <div class="liked">
                        <a href="#" type="button">
                            <i class="fa-regular fa-heart p-2"></i>
                            <span>Brani che ti piacciono</span>
                        </a>
                    </div>
                    <div class="episodes">
                        <a href="#" type="button">
                            <i class="fa-regular fa-bookmark p-2"></i>
                            <span>I Tuoi Episodi</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- center content -->
            <div class="col-8 center-content px-4">
                <div class="row">
                    <div class="col-12 d-flex justify-content-between">
                        <div>
                            <button class="left-btn"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="right-btn"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                        <div>
                            <button class="user-btn d-flex justify-content-center align-items-center px-3">
                                <img src="https://www.downloadclipart.net/large/girl-smile-png-transparent-picture.png" alt="user-img" class="user-img me-2">
                                <p class="m-0">Lidia Nautilus</p>
                                <i class="fa-solid fa-caret-down ms-2"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-12 card-top p-2 mt-1">
                        <div class="row">
                            <div class="col-3 d-flex align-items-center ps-4 pe-0">
                                <img class="img-card-top" src="https://tse4.mm.bing.net/th?id=OIP.QKkajbXF-yIvymzVHHgmFgHaHb&pid=Api" alt="viola">
                            </div>
                            <div class="col-9">
                                <div class="row">
                                    <div class="col-12 px-0">
                                        <div class="d-flex justify-content-between px-2">
                                            <p class="p-album m-0">ALBUM</p>
                                            <button class="hidden-posts">NASCONDI ANNUNCI</button>
                                        </div>
                                        <div class="px-2">
                                            <h1 class="m-0">VIOLA (feat. Salmo)</h1>
                                            <p class="p-album">Fedez, Salmo</p>
                                            <p class="p-album mb-1">Ascolta il nuovo singolo di Fedez e Salmo!</p>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="card-top-btn play">Play</button>
                                        <button class="card-top-btn save">Salva</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- sidebar right -->
            <div class="col-2 sidebar-right">
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button class="top-right-btn add"><i class="fa-solid fa-user-plus"></i></button>
                        <button class="top-right-btn close"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
                
            </div>
            <!-- bottom command bar -->
            <div class="col-12 command-bar">
                <div class="row">
                    <div class="col-4 command-left"></div>
                    <div class="col-4 command-center">
                        <div class="row d-flex justify-content-center">
                            <div class="col-12 d-flex justify-content-center">
                                <a href="#" type="button"><img class="player-btn" src="player-button/Shuffle.png" alt="shuffle"></a>
                                <a href="#" type="button"><img class="player-btn" src="player-button/Previous.png" alt="previous"></a>
                                <a href="#" type="button"><img class="player-btn" src="player-button/Play.png" alt="play"></a>
                                <a href="#" type="button"><img class="player-btn" src="player-button/Next.png" alt="next"></a>
                                <a href="" type="button"><img class="player-btn" src="player-button/Repeat.png" alt="repeat"></a>  
                            </div>
                            <div class="progress col-10">
                                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 command-right"></div>
                </div>
            </div>
            
        </div>        
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/c2c086fb37.js" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
