const formulaire = document.querySelector("form");
const champRecherche = document.getElementById("recherche");
const listeResultats = document.querySelector("ul");

let recherche = "";
let films = [];

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();
  recherche = champRecherche.value;
  afficherFilms();
});

const afficherFilms = async () => {
  await rechercherFilms();
  creerCartes();
};

const rechercherFilms = async () => {
  films = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${recherche}`
  ).then((res) => res.json());
  films.results.length = 15;
};

const creerCartes = () => {
  listeResultats.innerHTML = "";
  films.results.forEach((film) => {
    listeResultats.innerHTML += `
      <li>
        <h2>${film.original_title}</h2>
        <article>
          <img src="https://image.tmdb.org/t/p/w500${film.poster_path}"></img>
          <div class="infos">
            <p>${film.overview}</p>
            <p>Popularité : ${film.popularity}</p>
          </div>
        </article>
      </li>
    `;
  });
};
