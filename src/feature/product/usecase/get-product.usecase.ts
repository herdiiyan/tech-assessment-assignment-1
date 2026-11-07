import { Product } from "../domain/product.entities";
import { GetProductInputDTO } from "./dtos/get-products.dto";
import { IProductRepository } from "./repositories/product.repository.interface";

export class GetProductUsecase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(filters?: GetProductInputDTO): Promise<Product[]> {
        const products = await this.productRepo.getAll();
        let result = [...products];

        // Jika tidak ada filter apa pun, langsung kembalikan semua produk
        if (!filters) return products;

        // Logika Bisnis 1: Filter Kategori
        if (filters.category && filters.category !== 'All devices') {
            result.filter((p) => p.type === filters.category);
        }

        // Logika Bisnis 2: Filter Pencarian Kata Kunci (Nama & Brand)
        if (filters.searchQuery && filters.searchQuery.trim() !== '') {
            const query = filters.searchQuery.toLowerCase().trim();
            result = result.filter((p) => {
                (p.name + '' + p.brand).toLowerCase().includes(query);
            })
        }

        // Logika Bisnis 3: Pengurutan Harga (Sort)
        if (filters.sortBy === 'low') {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }

}