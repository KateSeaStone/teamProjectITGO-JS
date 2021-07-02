import refs from './refs';
// импорт функционала для отрисовки списков фильмов
import markUpMoviesCollection from './markUpMoviesCollection.js';

refs.libraryBtn.addEventListener('click', showWatchedCollection);

// добавляет функционал на кнопки списков
const showWatched = new markUpMoviesCollection({
    selector: '[data-name="show__watched"]',
});

const showQueue = new markUpMoviesCollection({
    selector: '[data-name="show__queue"]',
});

function showWatchedCollection() {
    refs.input.value = '';
    showWatched.hideBackgroundWithoutCollection()
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const watchedCollection = JSON.parse(localStorage.getItem('watched'))
    if (watchedCollection === null || watchedCollection.length === 0) {
            showWatched.refs.button.disabled = true
            showQueue.refs.secondButton.disabled = false
            showWatched.hidePaginationButtons(watchedCollection)
        return showWatched.showBackgroundWithoutCollection('watched')
    }
    showWatched.hidePaginationButtons(watchedCollection)
    showWatched.fetchPersonsCollectionMovies(watchedCollection)
    showWatched.refs.button.disabled = true
    showQueue.refs.secondButton.disabled = false
}

function showQueueCollection() {
    showQueue.hideBackgroundWithoutCollection()
    document.querySelectorAll('.film__list__item').forEach(li => li.remove())
    const queueCollection = JSON.parse(localStorage.getItem('queue'))
    if (queueCollection === null || queueCollection.length === 0) {
            showQueue.refs.button.disabled = true
            showWatched.refs.firstButton.disabled = false
        return showWatched.showBackgroundWithoutCollection('queue')
    }
    showQueue.hidePaginationButtons(queueCollection)
    showQueue.fetchPersonsCollectionMovies(queueCollection)
    showQueue.refs.button.disabled = true
    showWatched.refs.firstButton.disabled = false
}

showWatched.refs.button.addEventListener('click', showWatchedCollection);

showQueue.refs.button.addEventListener('click', showQueueCollection);