import { Product } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository';
import { MOCK_PRODUCT } from './product.mock';
import { ProductMapper } from './product.mapper';
import { ApiProductDto } from './product.dto';

export class HttpProductRepository implements IProductRepository {
    private readonly baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

    async getProducts(): Promise<Product[]> {
        if (this.baseURL) {
            const res = await fetch(`${this.baseURL}/products`);
            if (!res.ok) throw new Error('Failed to fetch products.');
            const raw: ApiProductDto[] = await res.json();
            return ProductMapper.toDomainList(raw);
        }

        await new Promise((r) => setTimeout(r, 750));
        return ProductMapper.toDomainList(MOCK_PRODUCT as ApiProductDto[]);
    }

    async getProductById(id: string): Promise<Product | null> {
        if (this.baseURL) {
            const res = await fetch(`${this.baseURL}/products/${id}`);
            if (!res.ok) return null;
            const raw: ApiProductDto = await res.json();
            return ProductMapper.toDomain(raw);
        }

        await new Promise((r) => setTimeout(r, 600));
        const found = (MOCK_PRODUCT as ApiProductDto[]).find((p) => String(p.id) === id);
        return found ? ProductMapper.toDomain(found) : null;
    }
}
