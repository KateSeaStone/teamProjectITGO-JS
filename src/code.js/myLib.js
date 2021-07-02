import refs from './refs';
// импорт функционала для отрисовки списков фильмов
import markUpMoviesCollection from './markUpMoviesCollection.js';
import {PAGE_SIZE} from './constants.js';


// добавляет функционал на кнопки списков
const showWatched = new markUpMoviesCollection({
    selector: '[data-name="show__watched"]',
});

const showQueue = new markUpMoviesCollection({
    selector: '[data-name="show__queue"]',
});

let paginationService;
let collectionName = 'watched';


function libraryInit(service) {
    paginationService = service; 
    paginationService.setCallback(fetchMoviesFromLocalStorage);
    paginationService.firstPage();
}

export function fetchMoviesFromLocalStorage(page) {
    const collection = JSON.parse(localStorage.getItem(collectionName));
    
    const pages = Math.ceil(collection.length / PAGE_SIZE);
    paginationService.setTotalPages(pages);
    if (page > pages) {
        page -= 1;
        paginationService.setPage(page); 
    }
    const result = collection.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    if (collectionName === 'watched') {
        showWatchedCollection(result);
    } else {
        showQueueCollection(result);
    }

}

function showWatchedCollection(watchedCollection) {
    refs.input.value = '';
    showWatched.hideBackgroundWithoutCollection()
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    
    if (watchedCollection === null || watchedCollection.length === 0) {
        showWatched.refs.button.disabled = true
        showQueue.refs.secondButton.disabled = false
        showWatched.hidePaginationButtons(watchedCollection)
        return showWatched.showBackgroundWithoutCollection('watched')
    }

    //showWatched.hidePaginationButtons(watchedCollection);
    showWatched.fetchPersonsCollectionMovies(watchedCollection);
    showWatched.refs.button.disabled = true;
    showQueue.refs.secondButton.disabled = false;
}

function showQueueCollection(queueCollection) {
    showQueue.hideBackgroundWithoutCollection()
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    
    if (queueCollection === null || queueCollection.length === 0) {
        showQueue.refs.button.disabled = true
        showWatched.refs.firstButton.disabled = false
        return showWatched.showBackgroundWithoutCollection('queue')
    }

    //showQueue.hidePaginationButtons(queueCollection)
    showQueue.fetchPersonsCollectionMovies(queueCollection);
    showQueue.refs.button.disabled = true;
    showWatched.refs.firstButton.disabled = false;
}

showWatched.refs.button.addEventListener('click', () => {
    collectionName = 'watched';
    paginationService.firstPage();
    showQueue.setActiveBtn(false)
    showWatched.setActiveBtn(true);
});

showQueue.refs.button.addEventListener('click', () => {
    collectionName = 'queue';
    paginationService.firstPage();
    showQueue.setActiveBtn(true);
    showWatched.setActiveBtn(false);
});


export default libraryInit;
