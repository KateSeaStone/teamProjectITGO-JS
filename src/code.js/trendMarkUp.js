import SearchApiTrend from "./apiTrendservice.js";
import trendMovieTpl from "../templates/withoutRating.hbs";
import refs from './refs';

SearchApiTrend.fetchtrend().then(results => {
    
    renderMovies(results)
});

function renderMovies(results) {
   
    // console.log(results);
    fetchGenres()
        .then(genres => {

            results.forEach(result => {            
                result.genre_ids = result.genre_ids.slice(0, 3).map(genre => genres[genre])

                result.release_date = result.release_date.slice(0, 4)
            });
            const markUp = trendMovieTpl(results);    
                refs.trendContainer.insertAdjacentHTML('beforeend', markUp);
             
        })
}

function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
        .then(r => r.json())
        .then(({ genres }) => {
            let temp = {};
            for (let genre of genres) {
                temp[genre.id] = genre.name;
            };
            return temp;
        })
}

export {renderMovies, fetchGenres};
