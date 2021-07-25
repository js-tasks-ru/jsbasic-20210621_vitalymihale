export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  //Добавление товара в массив
  addProduct(product) {
    if (product === null || !product) return;
    let array = [];

    //Увеличение количества товара, если он уже есть в массиве
    this.cartItems.forEach(item => {
      if (item.product.name === product.name) {
        item.count++;
        this.onProductUpdate(item);
        array.push(item);
      }
    });

    //Добавление товара, если его не было в массиве
    if (!array.length) {
      this.cartItems.push({product: product, count: 1});
      this.onProductUpdate({product: product, count: 1});
    }
  }

  //Изменение количества товара
  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        if (amount === 1) {
          item.count++;
        } else if (amount === -1) {
          item.count--;
        }
        if (item.count === 0) {
          this.cartItems.splice(index, 1);
        }
      }
      this.onProductUpdate(item);
    });
  }

  //Пустой ли массив
  isEmpty() {
    return !this.cartItems.length;
  }

  //Общее количество товаров в массиве
  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum + item.count, 0);
  }

  //Общая сумма товаров в массиве
  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

