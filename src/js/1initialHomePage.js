'use strict';

const searchField = document.querySelector('#js-form');
const moviesList = document.querySelector('#js-moviesList');
const detailsPage = document.querySelector('#js-detailsPage');
const homePage = document.querySelector('#js-homePage');

const apiKey = '5f4a8cd7bcedd7efa785bad615b94f98';
let inputValue = '';
let pageNumber = 1;

let renderedMovies = [];

createStartupMarkup();

function createMarkup() {
  fetchFilms().then(result => {
    moviesList.innerHTML = '';
    result.results.forEach(element => {
      moviesList.insertAdjacentHTML(
        'beforeend',
        createCard(
          element.poster_path,
          element.title,
          element.id,
          element.release_date,
        ),
      );
    });
  });
}

function createStartupMarkup() {
  fetchPopularFilms().then(result => {
    console.log(result);
    moviesList.innerHTML = '';
    result.results.forEach(element => {
      moviesList.insertAdjacentHTML(
        'beforeend',
        createCard(
          element.poster_path,
          element.title,
          element.id,
          element.release_date,
        ),
      );
    });
  });
}

// function createStartupMarkeup() {
//   fetchFilms().then(data => {
//     moviesList.innerHTML = '';
//     data.results.forEach(element )
//   })

// }

function createCard(imgPath, movieTitle, movieId, date) {
  const movieItem = document.createElement('li');
  movieItem.classList.add('main__movieItem');
  movieItem.setAttribute('id', 'js-movieItem');

  const previewImg = document.createElement('img');
  previewImg.classList.add('main__previewImgItem');
  if (imgPath) {
    previewImg.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500/${imgPath}`,
    );
  } else {
    previewImg.setAttribute('src', '../images/plug.jpg');
  }

  const previewImgTitle = document.createElement('h2');
  previewImgTitle.classList.add('main__previewImgTitle');

  const releaseYear = new Date(date).getFullYear();
  if (!Number.isNaN(releaseYear)) {
    previewImgTitle.textContent = `${movieTitle} (${releaseYear})`;
  } else {
    previewImgTitle.textContent = movieTitle;
  }

  movieItem.append(previewImg, previewImgTitle);

  movieItem.addEventListener('click', () => {
    openDetailsPage(movieId);
  });

  return movieItem.outerHTML;
}

// function openDetailsPage(id) {
//   searchField.classList.add('is-hidden');
//   searchField.classList.remove("is-hidden")
// }
