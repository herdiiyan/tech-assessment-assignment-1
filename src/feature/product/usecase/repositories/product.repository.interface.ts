import { Product } from "../../domain/product.entities";

export interface IProductRepository {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
}