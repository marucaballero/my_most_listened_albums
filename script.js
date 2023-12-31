document.addEventListener("DOMContentLoaded", function () {
  // Define la lista de álbumes fuera de la función
  const listaDeAlbumes = [
      { name: "Be Here Now", artist: "Oasis", rating: 5 },
      { name: "The Ballad of Darren", artist: "Blur", rating: 4 },
      { name: "Bandwagonesque", artist: "Teenage Fanclub", rating: 4 },
      { name: "The Stone Roses", artist: "The Stone Roses", rating: 5 },
      { name: "Council Skies", artist: "Noel Gallagher's High Flying Birds", rating: 3 },
      { name: "C'mon You Know", artist: "Liam Gallagher", rating: 5 },
      { name: "Dia De Los Muertos", artist: "El Mato A Un Policia Motorizado", rating: 5 },
      { name: "Chaos and Creation In The Backyard", artist: "Paul McCartney", rating: 5 },
      { name: "All Things Must Pass", artist: "George Harrison", rating: 4 },
      { name: "Greatest Hits", artist: "The Cure", rating: 4 },
      { name: "Ocean Rain", artist: "Echo And The Bunnymen", rating: 4 },
      { name: "Four Thousand Seven Hundred and Sixty-Six Seconds - A Short Cut To Teenage Fanclub", artist: "Teenage Fanclub", rating: 5 },
      
  ];

   // Obtener la información del álbum desde la API de Last.fm
   function obtenerInfoDelAlbum(artist, album) {
    const apiKey = "561883d5a0d1bf57dd5dabee620939e4";
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${apiKey}&artist=${artist}&album=${album}&format=json`;

    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => data.album)
        .catch((error) => {
            console.error("Error al obtener información del álbum:", error);
        });
}

  // Llama a la función para mostrar los álbumes
  obtenerAlbumesYMostrar(listaDeAlbumes);

  function obtenerAlbumesYMostrar(albumes) {
      // Obtén el contenedor donde se mostrarán los álbumes
      const albumsContainer = document.getElementById("albums-container");

    // Recorre la lista de álbumes y muestra cada uno en la página
    albumes.forEach((album) => {
    const albumContainer = document.createElement("div");
    albumContainer.classList.add("album-container");

    // Crea elementos HTML para mostrar la información del álbum
    const albumTitle = document.createElement("h2");
    albumTitle.textContent = album.name;
    
    const artistNameElement = document.createElement("p");
    artistNameElement.textContent = `Artista: ${album.artist}`;

    // Crea la imagen del álbum
    const albumImage = document.createElement("img");

    // Llama a la función para obtener la información del álbum
    obtenerInfoDelAlbum(album.artist, album.name)
        .then((albumInfo) => {
            if (albumInfo && albumInfo.image[2]["#text"]) {
                albumImage.src = albumInfo.image[2]["#text"];
            }
        })
        .catch((error) => {
            console.error("Error al obtener información del álbum:", error);
        });

    // Puntuación con estrellas
    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.classList.add("star", i <= album.rating ? "filled" : "empty");
        ratingContainer.appendChild(star);
    }

    // Agrega los elementos al contenedor del álbum
    albumContainer.appendChild(albumTitle);
    albumContainer.appendChild(artistNameElement);
    albumContainer.appendChild(albumImage);
    albumContainer.appendChild(ratingContainer);

    albumsContainer.appendChild(albumContainer);
      });
  }
});
