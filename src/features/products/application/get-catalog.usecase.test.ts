import { describe, it, expect } from "vitest";
import { Product } from "../domain/product.entity";
import { IProductRepository } from "../domain/product.repository";
import { GetCatalogUseCase } from "./get-catalog.usecase";

describe("Get catalog useCase", () => {
    const dummyProduct: Product[] = [
        { id: '1', name: 'iPhone 16 Pro', brand: '', type: 'Smartphones', price: 999, color: 'Desert Titanium', tone: 'sand', tag: 'POPULAR', storage: '128 GB', screen: '6.3-inch', chip: 'A18 Pro', camera: '48 MP', battery: 'Up to 27 hours', os: 'iOS 18', stock: 5 },
        { id: '2', name: 'Galaxy S25 Ultra', brand: '', type: 'Smartphones', price: 1299, color: 'Titanium Gray', tone: 'gray', tag: 'NEW ARRIVAL', storage: '256 GB', screen: '6.9-inch', chip: 'Snapdragon 8 Elite', camera: '200 MP', battery: '5,000 mAh', os: 'Android 15' },
        { id: '3', name: 'iPad Air', brand: 'Apple', type: 'Tablets', price: 599, color: 'Sky Blue', tone: 'blue', tag: '', storage: '128 GB', screen: '11-inch', chip: 'Apple M3', camera: '12 MP', battery: 'Up to 10 hours', os: 'iPadOS 18' }
    ]

    const fakeRepository: IProductRepository = {
        getProducts: () => Promise.resolve(dummyProduct),
        getProductById: async (id: string) => dummyProduct.find((p) => p.id === id) || null
    }

    it('get all product by default', async () => {
        const useCase = new GetCatalogUseCase(fakeRepository);
        const result = await useCase.execute({});
        expect(result.length).toBe(3);
    })

    it('should filter product by category Tablets', async () => {
        const useCase = new GetCatalogUseCase(fakeRepository)
        const result = await useCase.execute({ category: 'Tablets' })
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('iPad Air');
    })

    it('should filter by keys search', async () => {
        const useCase = new GetCatalogUseCase(fakeRepository);
        const result = await useCase.execute({ search: 'Galaxy' })
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Galaxy S25 Ultra');
    })

    it('should sort product by price low to high (low)', async () => {
        const useCase = new GetCatalogUseCase(fakeRepository)
        const result = await useCase.execute({ sort: 'low' });
        expect(result[0].price).toBe(599);
        expect(result[2].price).toBe(1299);
    });
})