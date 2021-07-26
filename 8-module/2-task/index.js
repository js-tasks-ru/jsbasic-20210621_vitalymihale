import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this._renderProductGrid();
  }

  //Получаем список отсортированных карточек
  _renderProductGrid() {
    this.elem = createElement(`<div class="products-grid">
                                        <div class="products-grid__inner"></div>
                                    </div>`);
    this._appendCardsToGrid();
  }

  //Сортируем карточки и добавляем их в this.elem
  _appendCardsToGrid() {
    const div = this.elem.querySelector('.products-grid__inner');
    div.innerHTML = '';

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (product.spiciness > this.filters.maxSpiciness && this.filters.maxSpiciness !== undefined) continue;
      if (this.filters.category !== product.category && this.filters.category !== undefined && this.filters.category !== '') continue;

      let card = new ProductCard(product);
      div.append(card.elem);
    }
  }

  //Обновляем фильтры, при этом остаются предыдущие значения this.filters
  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this._appendCardsToGrid();
  }
}


