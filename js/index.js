const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '00c2d56408907405dc1302cb38d24592';

document.addEventListener('DOMContentLoaded',  () => {
    renderNewsMovies();
    renderMoviesHome('popular','now-playing');
    renderMoviesHome('top_rated','top-rated-playing');
})

const getMovies = (url) => {
    const URL = `${URL_PATH}/3/movie/${url}?api_key=${API_KEY}&language=es-ES&page=1`
    return fetch(URL)
        .then(resp => resp.json())
        .then(result => result.results)
        .catch(e => console.log(e));
}

const renderNewsMovies = async () => {
    const movies = await getMovies('now_playing');
    let html = '';
    movies.forEach((movie, index) => {
        const {id, title, overview, backdrop_path} = movie;
        const titleImage = 'https://image.tmdb.org/t/p/original' + backdrop_path;
        const urlMovie = `  ../movie.html?id=${id}`
        html += `
            <div class="carousel-item ${index === 0 ? 'active': null}" style="background-image: url('${titleImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p class="">${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más información</a>
                </div>
            </div>
        `
    });
    html += `
        <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    `
    document.getElementsByClassName('list-new-movies')[0].innerHTML = html;
}

const renderMoviesHome = async (url, clase) =>{
    const movies = await getMovies(url);
    let html = '';
    movies.forEach((movie,index) => {
        const {id, title, poster_path } = movie;
        const titleImage = 'https://image.tmdb.org/t/p/w500' + poster_path;
        const urlMovie = `../movie.html?id=${id}`
        if(index < 5){
            html += `
                <li class="list-group-item">
                    <div class="imagen-home"><img src="${titleImage}" alt="${title}"></div>
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-outline-primary">Ver Más</a>
                </li>
            `
        }
    });
    document.getElementsByClassName(`${clase}__list`)[0].innerHTML = html;
}
