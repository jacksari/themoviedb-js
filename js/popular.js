const URL_PATH = 'https://api.themoviedb.org';
const API_KEY = '00c2d56408907405dc1302cb38d24592';

document.addEventListener('DOMContentLoaded', () =>{
    let { page = 1 } = getUrl();
    renderPopularMovies(page);
    rendercontrols(page);
})

const getUrl = () => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m,key,value){
        vars[key] = value;
    })
    return vars;
}

const getPopularMovies = (page) => {
    const URL = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
    return fetch(URL)
        .then(resp => resp.json())
        .then(result => result.results)
        .catch(e => console.log(e));
}

const renderPopularMovies = async (page) => {
    const movies = await getPopularMovies(page);
    let html = '';
    movies.forEach(movie => {
        const {id, title, poster_path, vote_average} = movie;
        const titleImage = 'https://image.tmdb.org/t/p/w500' + poster_path;
        const urlMoreInfo = `../movie.html?id=${id}`
        html += `
            <div class="col-3 col-custom">
                <a href="${urlMoreInfo}" class="card custom-card">
                    <img src="${titleImage}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title text-center m-0">${title}</h5>
                    </div>
                </a>
            </div>
        `

    });
    document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const rendercontrols = async (page) => {
    const urlBase = '../popular.html?page=';
    const pageNumber = parseInt(page)
    let html = '';
    const previuos = pageNumber -1;
    const next = pageNumber +1;

    if(pageNumber == 1){
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a href="#" class="page-link"><i class="fas fa-chevron-left"></i></a>
                </li>
                <li class="page-item active">
                    <a href="${urlBase +'1'}" class="page-link">1</a>
                </li>
                <li class="page-item">
                    <a href="${urlBase +'2'}" class="page-link">2</a>
                </li>
                <li class="page-item">
                    <a href="${urlBase +'3'}" class="page-link">3</a>
                </li>
                <li class="page-item">
                    <a href="${urlBase + '2'}" class="page-link">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `
    }else {
        html = `
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a href="${urlBase + previuos}" class="page-link"><i class="fas fa-chevron-left"></i></a>
                </li>
                <li class="page-item">
                    <a href="${urlBase + previuos}" class="page-link">${previuos}</a>
                </li>
                <li class="page-item active">
                    <a href="${urlBase + pageNumber}" class="page-link">${pageNumber}</a>
                </li>
                <li class="page-item">
                    <a href="${urlBase + next}" class="page-link">${next}</a>
                </li>
                <li class="page-item">
                    <a href="${urlBase + next}" class="page-link">
                        <i class="fas fa-chevron-right"></i>
                    </a>
                </li>
            </ul>
        `
    }
    document.getElementsByClassName('navigation')[0].innerHTML = html;
}
