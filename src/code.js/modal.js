import refs from './refs';
import modalTpl from '../templates/modal.hbs'
// импорт функционала для добавления фильмов
import addMoviesToCollection from './addMoviesToCollection.js';


refs.backdrop.addEventListener('click',onBackDropClick)
refs.trendContainer.addEventListener('click', (e) => {
    if(e.target.nodeName !=='IMG'){
      return
    }
    const filmId = e.target.id;
    fetchtrend(filmId)
    refs.arrow.classList.add('visually-hidden')
})



const API_KEY = '61153224aaaa08b03f5d3b14add082d2';
const BASE_URL = 'https://api.themoviedb.org/3';




function fetchtrend(filmId) {
    return fetch(`${BASE_URL}/movie/${filmId}?api_key=${API_KEY}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
    
    })
    .then(r => {

        renderMovies(r)
        })
}
    

function renderMovies(r) {
  r.a = localStorage.queue && localStorage.queue.includes(r.id) ? false : true;
  r.b = localStorage.watched && localStorage.watched.includes(r.id) ? false : true;
    const markUp = modalTpl(r);
   
    refs.close.addEventListener('click', onBtnClose)
    window.addEventListener('keydown', onEscPress)

    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    if (refs.modalFilm.children[1]) {
        refs.modalFilm.children[1].remove();
    }
    
    refs.modalFilm.insertAdjacentHTML('beforeend', markUp);
    refs.backdrop.classList.add('is-open')

    document.body.classList.add('backdrop-scroll')

  // подключает функционал для добавления фильмов в списки
    const addWatched = new addMoviesToCollection({
        selector: '[data-name="add__watched"]',
    });
  
    const addQueue = new addMoviesToCollection({
        selector: '[data-name="add__queue"]',
    });

  // попытка изменять текс кнопок
  function changeWatchedButton() {
    const watchedList = localStorage.getItem('watched')

    if (watchedList === null || [] || !watchedList.includes(JSON.stringify(r.id))) {
      refs.btn__watched.textContent = 'add to watched'
      refs.btn__watched.classList.remove('button-is__active')
    }
    if (watchedList.includes(JSON.stringify(r.id))) {
      refs.btn__watched.classList.add('button-is__active')
      console.log(watchedList.includes(JSON.stringify(r.id)))
      refs.btn__watched.textContent = 'remove from watched'
    }
    console.log('watched', refs.btn__watched)
  }

  function changeQueueButton() {
    const queueList = localStorage.getItem('queue')

    if (queueList === null || [] || !queueList.includes(JSON.stringify(r.id))) {
      refs.btn__queue.textContent = 'add to queue'
      refs.btn__queue.classList.remove('button-is__active')
    }
    if (queueList.includes(JSON.stringify(r.id))) {
      console.log(queueList.includes(JSON.stringify(r.id)))
      refs.btn__queue.classList.add('button-is__active')
      refs.btn__queue.textContent = 'remove from queue'
    }
    console.log('queue', refs.btn__queue)
  }

  changeWatchedButton()
  changeQueueButton()
    
    addWatched.refs.button.addEventListener('click', e => {
        addWatched.addMovies('watched', r.id)
    })

    addQueue.refs.button.addEventListener('click', e => {
        addQueue.addMovies('queue', r.id)
    })
}


function onBtnClose() {
    refs.arrow.classList.remove('visually-hidden')
    refs.backdrop.classList.remove('is-open')

    document.body.classList.remove('backdrop-scroll')

    window.removeEventListener('keydown', onEscPress)
    refs.modal.insertAdjacentHTML('beforeend', ' <ul class="modal__btn-list"><li class="btn-list__item"><button class="btn__watched">add to Watched</button></li><li class="btn-list__item"><button class="btn__watched btn__queue">add to queue</button></li></ul>');
}


  function onEscPress(evt){
    if(evt.code === 'Escape'){
      onBtnClose();
    }
}
  function onBackDropClick(evt){
    if(evt.currentTarget === evt.target){
      onBtnClose();
    }
}

