import { ProductCategory } from "../../domain/product.entities";

export type ProductSortOption = 'featured' | 'low' | 'high';

// Format data filter yang diterima usecase dari controller
export interface GetProductInputDTO {
    category?: ProductCategory | 'All devices';
    searchQuery?: string;
    sortBy?: ProductSortOption;
}