import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //  !!! Need to make refactoring code with this method!!!!!!!
  _generateMarkupButton(way = 'next') {
    const curPage = this._data.page;

    if (way === 'next') {
      return `
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton('next');

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev');

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton('prev')}${this._generateMarkupButton(
        'next'
      )}
      `;
    }

    // Page 1 and no other pages
    return '';
  }
}

export default new PaginationView();
