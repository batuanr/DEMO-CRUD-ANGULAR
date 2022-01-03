import {Category} from './Category';

export class Product {
  id: number;
  name: string;
  category: Category;
  avatar: string;

  constructor(name: string, category: Category, avatar: string) {
    this.name = name;
    this.category = category;
    this.avatar = avatar;
  }
}
