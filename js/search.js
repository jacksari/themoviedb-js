const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '00c2d56408907405dc1302cb38d24592';

const searchMovies = async () => {
    const search = document.getElementById('search-movie').value;
    if(search.length < 3){ return ; }
    const movies = await getMovies(search);

    let html = '';

    movies.forEach(movie => {
        const {id, title, overview, poster_path} = movie;
        const titleImage = 'https://image.tmdb.org/t/p/w500' + poster_path;
        const urlMoreInfo = `../movie.html?id=${id}`

        html += `
            <div class="col-4 custom-card">
                <div class="card card-search">
                    <div class="row no-gutters">
                        <div class="col-md-4 card-imagen d-flex justify-content-center align-content-center">
                            <div class="m-auto card-card">
                                <img src="${titleImage}" class="card-img" alt="${title}">
                            </div>

                        </div>
                        <div class="col-md-8 card-card-text">
                            <div class="card-body">
                                <h5 class="card-title">${title.substr(0,30)}...</h5>
                                <p class="card-text">${overview.substr(0,35)}...</p>
                                <a href="${urlMoreInfo}" class="btn btn-outline-primary btn-sm">Ver Más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const getMovies = (search) => {
    const url = `${URL_PATH}/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${search}&page=1&include_adult=true`;
    return  fetch(url)
        .then(resp => resp.json())
        .then(result => result.results)
        .catch(e => console.log(e));
}
