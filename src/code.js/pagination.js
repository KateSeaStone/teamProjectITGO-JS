import refs from './refs';

export default class PaginationService {
    currentPage = 1; 
    totalPages = 1;

    setTotalPages(totalPages) {
        this.totalPages = totalPages;
        this.btnCreate();
    }

    setCallback(callback) {
        this.callback = callback;
    }

    nextPage() {
        this.changePage(this.currentPage + 1);
    }

    prevPage() {
        this.changePage(this.currentPage - 1);
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;

        this.currentPage = page;
        this.btnCreate();
        this.callback(page); 
    }

    firstPage() {
       this.changePage(1);
    }

    lastPage() {
       this.changePage(this.totalPages);
    }

    refreshPage() {
        this.callback(this.currentPage);
    }

    setPage(page) {
       this.currentPage = page;
       this.btnCreate();
    }

    elBtnCreate(location, n) {
        refs.btnList.insertAdjacentHTML(location, `<li class="button-list__item"><button class="button-list__page">${n}</button></li>`);
    }

    btnCreate() {
        refs.btnList.innerHTML = '';
        refs.btnList.insertAdjacentHTML('afterbegin', `<li class="button-list__item button-list__item--curretn"><button class="button-list__page button-list__page--current">${this.currentPage}</button></li>`)

        for (let i = 1; i < 3; i++) {
            if (this.currentPage + i < this.totalPages + 1) { this.elBtnCreate('beforeend', this.currentPage + i) };
            if (this.currentPage - i > 0) { this.elBtnCreate('afterbegin', this.currentPage - i) };
        }
    }
}



