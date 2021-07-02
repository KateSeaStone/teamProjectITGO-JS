import collectionMovies from '../templates/filmCardTpl.hbs';

export default class markUpMoviesCollection {
    constructor({ selector }) {
        this.refs = this.getRefs(selector);
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.container = document.querySelector('.main__film-list');
        refs.firstButton = document.querySelector('[data-name="show__watched"]');
        refs.secondButton = document.querySelector('[data-name="show__queue"]');
        refs.bgEmptyCollection = document.querySelector('.bg__empty__collection');
        refs.paginationButtons = document.querySelector('.main__button-list');
        return refs;
    }

    fetchPersonsCollectionMovies(moviesCollection) {
        moviesCollection.forEach(movie_id => {
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=44d74a10460e9a32f8546bed31d47780&language=en-US`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                })
                .then(res => {
                    const markUpCollection = collectionMovies([res]);
                    this.refs.container.insertAdjacentHTML('beforeend', markUpCollection);
                })
        })
    }

  

    // отрисовывает фон, когда в списке нету фильмов
    showBackgroundWithoutCollection(name) {
        const background = `<p class="bg__empty__collection">Sorry, but you haven't selected anything to ${name} yet<span class="bg__empty__collection bg__icon">ヽ(°□° )ノ</span></p>`;
        this.refs.container.insertAdjacentHTML('beforeend', background);
    }

    hideBackgroundWithoutCollection() {
        const background = document.querySelector('.bg__empty__collection');
        if (background === null) {
            return
        }
        background.remove();
    }

    // скрытие кнопок пагинации
    hidePaginationButtons(e) {
        if (e === null || e.length <= 9) {
            return this.refs.paginationButtons.classList.add('visually-hidden')
        }
        this.refs.paginationButtons.classList.remove('visually-hidden')
    }

    setActiveBtn(state) {
        if (state) {
            this.refs.button.classList.add('active__btn')
        } else {
            this.refs.button.classList.remove('active__btn')
        }
    }
}