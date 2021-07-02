import refs from './refs';
import filmCardTpl from '../templates/withoutRating.hbs';

const API__KEY = '44d74a10460e9a32f8546bed31d47780';
const BASE__URL = 'https://api.themoviedb.org/3/discover/';
let n = 1;
let totalPages = 1;

export default class PaginationService {
    constructor() {
        this.n = 1;
    }

    feachMovie(){
        fetch(`${BASE__URL}movie?api_key=${API__KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}&with_watch_monetization_types=flatrate`)
        .then(r => r.json())
        .then( films => {
            
            return films
        })
        .then( ({results, total_pages} ) =>{
            totalPages = total_pages;
            renderMovies(results)
        })
    } 
}

const makePagination = new PaginationService;

first();
function first() {
    if(n === 1){
        refs.btnListPage.classList.add('button-list__page--current')    
    }
}

refs.next.addEventListener('click',e => {
    console.log(e.target)
    
    n += 1;
     if(n > 500){
         n--
         return
     }
     btnCreate()
    return makePagination.feachMovie()
})


refs.fBtn.addEventListener('click',e => {
    console.log(e.target)
    
    n = 1;
    btnCreate();
    return makePagination.feachMovie();
})

refs.lBtn.addEventListener('click',e => {
    console.log(e.target)
    
    n = totalPages;
    btnCreate();
    return makePagination.feachMovie();
})


refs.pr.addEventListener('click', e => {
        if(e.target.nodeName!== 'BUTTON' || refs.input.value !== ''){
        return
    }
    n-=1;
    if(n === 0){
        n++
        return
    }
    btnCreate();
    return makePagination.feachMovie();

})

refs.btnList.addEventListener('click', e => {
    if(e.target.nodeName!== 'BUTTON' || refs.input.value !== ''){
        return
    }
        
    n = e.target.textContent -0;
    btnCreate()

    makePagination.feachMovie()
})

function elBtnCreate(location, n){
	refs.btnList.insertAdjacentHTML(location,`<li class="button-list__item"><button class="button-list__page">${n}</button></li>`)
}

function btnCreate(){
    refs.btnList.innerHTML = '';
    refs.btnList.insertAdjacentHTML('afterbegin',`<li class="button-list__item button-list__item--curretn"><button class="button-list__page button-list__page--current">${n}</button></li>`)
  
    for(let i = 1; i < 3; i++){
      
    if(n+i < 501)
      elBtnCreate('beforeend', n+i);
     if(n-i > 0)
            elBtnCreate('afterbegin', n-i);
    } 
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


function renderMovies(results) {
    // console.log(results);
    fetchGenres()
        .then(genres => {

            results.forEach(result => {
                result.genre_ids = result.genre_ids.slice(0, 3).map(genre => genres[genre])
                result.release_date = result.release_date?.slice(0, 4)
            });

            const markUp = filmCardTpl(results);
            refs.trendContainer.innerHTML = '';
            window.scrollTo({
                top: 1000,
                behavior: "smooth"
            });
            refs.trendContainer.insertAdjacentHTML('beforeend', markUp);   
        })
}


