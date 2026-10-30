import { Product } from "../domain/product.entity";
import { IProductRepository } from "../domain/product.repository";
import { MOCK_PRODUCT } from "./product.mock";


export class HttpProductRepository implements IProductRepository {
    private readonly baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""

    async getProducts(): Promise<Product[]> {
        if (this.baseURL) {
            const res = await fetch(`${this.baseURL}/products`)
            if (!res.ok) throw new Error("Failed to fetch products.");
            return res.json()
        }

        await new Promise((r) => setTimeout(r, 750));
        return MOCK_PRODUCT;
    }

    async getProductById(id: string): Promise<Product | null> {
        if (this.baseURL) {
            const res = await fetch(`${this.baseURL}/products/${id}`)
            if (!res.ok) return null;
            return res.json()
        }

        await new Promise((r) => setTimeout(r, 600));
        return MOCK_PRODUCT.find((p) => p.id === id) || null;
    }
}
