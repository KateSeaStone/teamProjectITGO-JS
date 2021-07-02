
const refs = {
   // ссылка на основной контейнер
   trendContainer: document.querySelector('.main__film-list'), 
   // ссылка на контейнер пагинации
   btnListPage: document.querySelector('.button-list__page'),
   // ссылка на кнопку след. в пагинации
   next: document.querySelector('.js-btn-next'),
   // ссылка на кнопку предыдущ. в пагинации
   pr: document.querySelector('.js-btn-pr'),
   // ссылка на контейнер для номеров страниц
   btnList: document.querySelector('.button-list__container'),
   // ссылка на кнопку Home
   homeBtn: document.querySelector('.home-js'),
   // ссылка на кнопку My Library
   libraryBtn: document.querySelector('.library-js'),
   // ссылка на рейтинг в карточке фильма
   genreInfo: document.querySelector('.film__details-vote'),
   rate: document.querySelector('p[data-action="data-rate"]'),
   // ссылка на логотип
   logo: document.querySelector('.logo-js'),
   // кнопки Watched Queue в my Lib
   myLibButton: document.querySelector('.header__button__list'),
   // ссылка на форму-поисковик
   searchForm: document.querySelector('.header__search__form'),
   searchForm: document.querySelector('#search-form'),
   spanRef: document.querySelector('.notification'),
   modalFilm: document.querySelector('.modal'),
   backdrop: document.querySelector('.backdrop'),
   close: document.querySelector('.modal__close'),
   btn__watched: document.querySelector('.btn__watched'),
   btn__queue: document.querySelector('.btn__queue'),
   // добавляет loader
   loader: document.querySelector('.loader'),

     /*ссылки для header Kate SEA*/
   header: document.querySelector('header'),
   homeLink: document.querySelector('.home-js'),
   libraryLink: document.querySelector('.library-js'),
   headerForm: document.querySelector('.header__search__form'), 
   button: document.querySelector('.header__button__list'),
   logoLink: document.querySelector('.logo'),

   /*ссылки для формы поиска на хедере*/
   headerForm: document.querySelector('.header__search__form'), 
   inputRef: document.querySelector('.header__input'),
   btnSrchRef: document.querySelector('.search-btn'),
   svgRef: document.querySelector('.input__icon__svg'),

  //  ссылки для футера
   modal: document.querySelector('#modal'),
   footerBtnCls: document.querySelector('.footer__btn'),
   footerCrossCls: document.querySelector('.button__styles--close'),

   // кнопки пагинации
   paginationButtons: document.querySelector('.main__button-list'),

  //  пагинация
    input : document.querySelector('.js-input'),
    filmList : document.querySelector('.js-list'),
    nextBtn : document.querySelector('.js-btn-next'),
    prevBtn : document.querySelector('.js-btn-pr'),
    btnList : document.querySelector('.button-list__container'),
    firstElBtn : document.querySelector('.js-btn__first'),
    lastElBtn :document.querySelector('.js-btn__last'),
    btnListPage: document.querySelector('.button-list__page'),

  //from KateSEA
  lBtn :document.querySelector('.js-btn-l'),
  fBtn : document.querySelector('.js-btn-f'),

    
  //стрелка вверх
    arrow: document.querySelector('.back_to_top'),

}

export default refs;
