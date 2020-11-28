const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '00c2d56408907405dc1302cb38d24592';

let MOVIE_ID = '';

document.addEventListener('DOMContentLoaded', () => {
     MOVIE_ID = recuperarID().id;
    renderMoviesDetails(MOVIE_ID);
})

const recuperarID = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value){
        vars[key] = value;
    })
    return vars;
}

const getMovieDetails = (movieID) => {
    const URL = `${URL_PATH}/3/movie/${movieID}?api_key=${API_KEY}&language=es-ES`
    return fetch(URL)
        .then(resp => resp.json())
        .then(result => result)
        .catch(e => console.log(e));
}

const getMovies = (movieDB) => {
    const URL = `${URL_PATH}/3/movie/${movieDB}/recommendations?api_key=${API_KEY}&language=es-ES&page=1`;
    return fetch(URL)
        .then(resp => resp.json())
        .then(result => result)
        .catch(e => console.log(e));
}

const renderMoviesDetails = async (movieId) => {
    const movie = await getMovieDetails(movieId)
    const {backdrop_path,poster_path, title, overview, genres,release_date, vote_average,tagline} = movie
    renderBackground(backdrop_path);
    renderPosters(poster_path,title,tagline);
    renderData(title, overview, genres, release_date, vote_average);
    getTeaser(movieId)
    console.log(movie)
}

const renderBackground = (backdrop_path) => {
    const titleImage = 'https://image.tmdb.org/t/p/original' + backdrop_path;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url('${titleImage}')`
}

const renderPosters = (poster_path, title,tagline) => {
    const titleImage = 'https://image.tmdb.org/t/p/original' + poster_path;
    const html = `
        <img src="${titleImage}" alt="${title}" class="img-fluid movie-info__poster-img"/>
        <h4 class="text-white text-center font-weight-light mt-3">${tagline}</h4> 
    `
    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;
}

const renderData = (title, overview,genres, relese_date, vote_average) => {
    const dataSplit = relese_date.split('-');
    let htmlGenres = "";
    genres.forEach(gen => {
        htmlGenres += `<li>${gen.name}</li>`;
    })

    const html = `
        <div class="d-flex justify-content-between">
            <h1>${title} </h1>
            <span class="teaser" data-toggle="modal" data-target="#video-teaser">
                <i class="fas fa-play"></i> Ver trailer
            </span>
        </div>
        <div class="datos row d-flex justify-content-between align-content-center">
        
                <h5>Valoración: <span>${vote_average}</span></h5>
            
                <h5 class="anio">Año: <span class="date-any">${dataSplit[0]}</span></h5>
            
        </div>
        
        <h5>Resumen</h5>
        <p>${overview}</p>
        <h5>Generos</h5>
        <ul>
            ${htmlGenres}
        </ul>
    `
    document.getElementsByClassName('movie-info__data')[0].innerHTML = html;
}

const getTeaser = (idMovie) => {
    const url = `${URL_PATH}/3/movie/${idMovie}/videos?api_key=${API_KEY}&language=es-ES`
    fetch(url)
        .then(resp => resp.json())
        .then(result => {
            renderTeaser(result)
        })
        .catch(e => console.log(e))
}

const renderTeaser = (objVideo) => {
    let keyVideo = '';
    console.log(objVideo)
    objVideo.results.forEach(video => {
        if ((video.type === 'Teaser' || video.type === 'Trailer') && video.site === 'YouTube'){
            keyVideo = video.key;
        }
    });
    let urlIframe = "";
    if(keyVideo !== ''){
        urlIframe = `
            <iframe width="100%" 
                    height="440px" 
                    src="https://www.youtube.com/embed/${keyVideo}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
            ></iframe>
        `
    }else {
        urlIframe = "<div class='no-teaser'>No hay trailer disponible</div>"
    }

    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe;
}
