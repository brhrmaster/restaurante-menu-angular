export class Product {
  id: number = 0;
  categoryId: number = 0;
  imageLink: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  promo: number = 0;
  qtd:number = 1;
};

export class Category {
  id: number = 0;
  name: string = '';
};

export class ResponseData {
  categories: Category[] = [];
  products: Product[] = [];
}
