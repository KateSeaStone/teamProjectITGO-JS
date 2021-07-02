import refs from './refs';
import SearchApiTrend from "./apiTrendservice.js";
import filmCardTpl from '../templates/withoutRating.hbs';
import fetchGenres from "./apiGenres.js";

const debounce = require('lodash.debounce');


let searchQuery = '';
let page = 1;
let totalPages = 1
const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';


// SearchApiTrend.fetchtrend().then(results => {
//     renderMovies(results)
// });

refs.inputRef.addEventListener('blur', e => {
    
    if(e.currentTarget.value === ''){
        const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
        const BASE_URL = 'https://api.themoviedb.org/3';
        fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(r => r.json)
        .then(({results}) => {
            refs.trendContainer.innerHTML = '';
            SearchApiTrend.fetchtrend().then(results => {
                totalPages=Math.ceil(results.length / 20);
                renderMovies(results);
        
          });
       
            return results
        })
    }
})


refs.lastElBtn.addEventListener('click', e => {
    page = totalPages;
     const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.trendContainer.innerHTML = '';
        renderMovies(results)
        totalPages=Math.ceil(results.length / 20);
        return results; 
    })
     btnCreate()
})


refs.firstElBtn.addEventListener('click', e => {
   console.log(page, totalPages);
      page += 1;
     if(page > totalPages){
        page -= 1;
         return
     }
     const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.trendContainer.innerHTML = '';
        renderMovies(results)
        return results; 
    })
     btnCreate()
})


refs.nextBtn.addEventListener('click', e => {
   
    page += 1;
     if(page > totalPages){
        page -= 1;
         return
     }
     const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.trendContainer.innerHTML = '';
        renderMovies(results)
        return results; 
    })
     btnCreate()
})

refs.prevBtn.addEventListener('click', e => {
    page-=1;
    if(page === 0){
        page += 1;
        return
    }
    const film = fetchFilm(searchQuery,page)
    film.then(({ results }) => {
        console.log(results)
        refs.trendContainer.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate();

})

refs.btnList.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON' || refs.input.value === '' ){
        return 
    }
    page = e.target.textContent - 0;
    const film =  fetchFilm(searchQuery,page)
    film.then(({results}) => {
        // console.log(results)
        refs.trendContainer.innerHTML = '';
        renderMovies(results)
        return results; 
    })
    btnCreate()
})


function elBtnCreate(location, page){
	refs.btnList.insertAdjacentHTML(location,`<li class="button-list__item"><button class="button-list__page">${page}</button></li>`)
}

refs.input.addEventListener('input', e => {
    e.preventDefault();
    page = 1;
    refs.trendContainer.innerHTML = '';

    searchQuery = e.currentTarget.value.trim();

    clearArticlesConteiner();
    if(searchQuery === ''){
        return
    }

    const film = fetchFilm(searchQuery, page)
    film.then(({ total_pages }) => {
       (total_pages/19)%2 === 0?totalPages = total_pages - 4:totalPages = total_pages;
        refs.lastElBtn.textContent = totalPages;
        return total_pages; 
    })
    film.then(({ results }) => {
        renderMovies(results)
        return results; 
    })

})



function clearArticlesConteiner() {
    refs.trendContainer.innerHTML = '';
  }

function btnCreate(){
    refs.btnList.innerHTML = '';
    refs.btnList.insertAdjacentHTML('afterbegin',`<li class="button-list__item button-list__item--curretn"><button class="button-list__page button-list__page--current">${page}</button></li>`)
  
    for(let i = 1; i < 3; i++){
      
    if(page+i < totalPages)
      elBtnCreate('beforeend', page+i);
     if(page-i > 0)
            elBtnCreate('afterbegin', page-i);
    } 
}



function fetchFilm(searchQuery, page) {
//     if (!searchQuery) {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${searchQuery}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
})
    .then((film) => {
        console.log(film)
    return film; 
})
    .catch(error => console.log(error))
}


function renderMovies(results) {
    console.log(results)
    // console.log(results);
    fetchGenres()
        .then(genres => {

            results.forEach(result => {
                result.genre_ids = result.genre_ids.slice(0, 3).map(genre => genres[genre])
                result.release_date = result.release_date.slice(0, 4)
            });
                const galleryListMarkup = filmCardTpl (results);
                refs.trendContainer.insertAdjacentHTML('beforeend', galleryListMarkup)
             
        })
}





// function focusOff(e) {
//     e.preventDefault();
//     refs.trendContainer.innerHTML = '';
//     function clear() {
//               refs.inputRef.value = '';
              
//           }
//     SearchApiTrend.fetchtrend().then(results => {
//       renderMovies(results)
//   });
//       fetchGenres();
//     clear()
//   }






