import { IProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product.entity';

interface FilterParams {
    category?: string;
    search?: string;
    sort?: string;
}

export class GetCatalogUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute({ category = 'All devices', search = '', sort = 'featured' }: FilterParams): Promise<Product[]> {
        const all = await this.productRepo.getProducts();

        let filtered = all.filter((p) => {
            const matchCat = category === 'All devices' || p.type === category;
            const matchSearch = (p.name + ' ' + p.brand).toLowerCase().includes(search.toLowerCase());
            return matchCat && matchSearch;
        });

        if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
        if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);

        return filtered;
    }
}
