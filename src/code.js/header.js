/*Kate SEA меняю стили header*/
import SearchApiTrend from "./apiTrendservice.js";
import trendMovieTpl from "../templates/withoutRating.hbs";
import refs from './refs';
import {renderMovies, fetchGenres} from "./trendMarkUp.js";



const Theme = {
    HOME: 'header__home__theme',
    MYLIBRARY: 'header__ml__theme',
};

function onHomeLinkClick(event) {
    event.preventDefault();
    refs.input.value = '';
    refs.trendContainer.innerHTML = '';
    refs.headerForm.classList.remove('none');
    refs.button.classList.add('none');

    changeHeadersTheme(Theme.HOME);  

    //отрисовываем фильмы на домашней странице
    
SearchApiTrend.fetchtrend().then(results => {
    renderMovies(results)
});
    fetchGenres();
    // отрисовка кнопок пагинации
    refs.paginationButtons.classList.remove('visually-hidden')
}

function onMyLibraryLinkClick(event) {
    event.preventDefault();
    refs.button.classList.remove('none');
    refs.headerForm.classList.add('none');   
    
    changeHeadersTheme(Theme.MYLIBRARY); 
}


function changeHeadersTheme(theme) { 
    if(theme === Theme.HOME) {
        refs.header.classList.remove(Theme.MYLIBRARY);
        refs.header.classList.add(Theme.HOME);
        refs.homeLink.classList.add('nav__item--current');
        refs.libraryLink.classList.remove('nav__item--current');

    }  else {
        refs.header.classList.remove(Theme.HOME);
        refs.header.classList.add(Theme.MYLIBRARY);
        refs.homeLink.classList.remove('nav__item--current');
        refs.libraryLink.classList.add('nav__item--current');
    } 
}

refs.logoLink.addEventListener('click', onHomeLinkClick);
refs.libraryLink.addEventListener('click', onMyLibraryLinkClick);
refs.homeLink.addEventListener('click', onHomeLinkClick);

/*изменяю стили svg*/


// const Color = {
//   FOCUS: 'valid',
//   OUTFOCUS: '#validation-input',
// }


// console.dir(refs.svgRef);

// refs.inputRef.addEventListener('focus', onFocus);
// function onFocus(event) {
//   refs.svgRef.classList.add('valid');
//   // refs.svgRef.classList.remove('invalid');


//   //changeColor(Color.FOCUS);
// }


// function changeColor(color) {
//   if (color === Color.FOCUS) {
//     refs.svgRef.classList.remove('invalid');
//     refs.svgRef.classList.add('valid');


//     // inputRef.classList.add('valid')
//     // // inputRef.className = 'valid';

//   }
//   // else {
//   //   inputRef.classList.remove('valid');
//   //   inputRef.classList.add('invalid')
//   //   // inputRef.className = 'invalid';
//   // }
// }

// const refs = {
//   headerForm: document.querySelector('.header__search__form'), 
//   inputRef: document.querySelector('.header__input'),
//   btnSrchRef: document.querySelector('.search-btn'),
//   svgRef: document.querySelector('.input__icon__svg'),
// };


// refs.inputRef.addEventListener('focus', ((event) => {
 
//   console.log(event);
//   console.log(event.type);
//   console.log(event.currentTarget);

//   console.log(refs.svgRef);

//   const s = document.getElementById("search");
// console.log(s);

//   if (event.type === 'focus') {
//     // inputRef.classList.remove('invalid');
//     // inputRef.classList.add('valid')
//     refs.svgRef.classList.remove('outfocus');
//     refs.svgRef.classList.add('onfocus');    

//   }

//     if (event.type === 'blur') {
//     // inputRef.classList.remove('invalid');
//     // inputRef.classList.add('valid')
//      refs.svgRef.classList.remove('onfocus');
//     refs.svgRef.classList.add('outfocus'); 
//   }
 
// // else{
// //    // inputRef.classList.remove('invalid');
// //     // inputRef.classList.add('valid')
// //     refs.svgRef.classList.remove('onfocus');
// //     refs.svgRef.classList.add('outfocus'); 
// // }

// })
// )