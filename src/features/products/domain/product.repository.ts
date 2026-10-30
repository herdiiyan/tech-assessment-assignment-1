import { Product } from "./product.entity";

export interface IProductRepository {
    getProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
}
