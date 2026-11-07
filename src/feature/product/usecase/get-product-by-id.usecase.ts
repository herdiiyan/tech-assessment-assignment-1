import { Product } from "../domain/product.entities";
import { IProductRepository } from "./repositories/product.repository.interface";

export class GetProductByIdUseCase {
    constructor(private readonly productRepo: IProductRepository) { }

    async execute(productId: string): Promise<Product> {
        // 1. Validasi input
        if (!productId || productId.trim() === '') {
            throw new Error('Product ID is required.');
        }

        // 2. Minta data ke repository
        const product = await this.productRepo.getById(productId);

        // 3. Aturan Bisnis: Jika produk tidak ditemukan, lempar error yang jelas
        if (!product) {
            throw new Error('We couldn’t find that device.');
        }

        return product;
    }
}

