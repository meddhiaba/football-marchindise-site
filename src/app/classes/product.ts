import { Comment } from './comment';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  comments: Comment[];
  disponible: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    comments: Comment[] = [],
    disponible: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.comments = comments;
    this.disponible = disponible;
  }
}

