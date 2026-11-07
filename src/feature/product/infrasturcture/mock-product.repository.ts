import { Product } from "../domain/product.entities";
import { IProductRepository } from "../usecase/repositories/product.repository.interface";
import { MOCK_PRODUCTS } from "./mock-products.data";

export class MockProductRepositoriy implements IProductRepository {
    getAll(): Promise<Product[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_PRODUCTS]);
            }, 750);
        });
    }

    getById(id: string): Promise<Product | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const found = MOCK_PRODUCTS.find((p) => p.id === id);
                resolve(found ? { ...found } : null);
            }, 600)
        });
    }
}