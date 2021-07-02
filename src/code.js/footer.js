import refs from './refs';

refs.footerBtnCls.addEventListener('click', onCloseModal);
refs.footerCrossCls.addEventListener('click', onCloseModal);

function onCloseModal (e) {
  window.removeEventListener('keydown', onEscClose);
  
  document.body.style.overflow = ''; 
  refs.modal.style.display = ''; 
}

function onEscClose(event) {

  if(event.code === 'Escape') {
    onCloseModal();
    }
  }

let modal = document.querySelector('#modal'), 

  ModalContentBlock = refs.modal.querySelector('.footer-modal__block'), 
  ModalContent;

  document.querySelector('.footer').addEventListener('click', function(e) {
    if(e.target.tagName === 'A') { 
    ModalContent = document.querySelector(e.target.getAttribute('href')) || false; 

    window.addEventListener('keydown', onEscClose);

    if(ModalContent !== false 
    && ModalContent.classList.contains('footer-modal__content')) {
      e.preventDefault(); 
    

      document.body.style.overflow = 'hidden'; 
      ModalContentBlock.append(...ModalContent.children);
      refs.modal.style.display = 'block'; 
  

    } else ModalContent = '';
  }

});
