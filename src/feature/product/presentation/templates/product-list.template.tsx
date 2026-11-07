import { Product, ProductCategory } from '../../domain/product.entities';
import { ProductToolbar } from '../organisms/product-toolbar';
import { ProductCard } from '../organisms/product-card';
import { LoadingState } from '../atoms/loading-state';
import { ProductSortOption } from '../../usecase/dtos/get-products.dto';

interface ProductListTemplateProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    category: ProductCategory | 'All devices';
    searchQuery: string;
    sortBy: ProductSortOption;
    onCategoryChange: (category: ProductCategory | 'All devices') => void;
    onSearchChange: (query: string) => void;
    onSortChange: (sort: ProductSortOption) => void;
}

export function ProductListTemplate({
    products,
    loading,
    error,
    category,
    searchQuery,
    sortBy,
    onCategoryChange,
    onSearchChange,
    onSortChange,
}: ProductListTemplateProps) {
    return (
        <>
            {/* 1. Heading Koleksi */}
            <section className="collection-heading" id="devices">
                <div className="eyebrow">THE COLLECTION</div>
                <h2>Your next everyday essential.</h2>
                <p>Big ideas. Beautiful screens. Meet your next upgrade.</p>
            </section>

            {/* 2. Organism Toolbar (Filter, Search, Sort) */}
            <ProductToolbar
                currentCategory={category}
                searchQuery={searchQuery}
                sortBy={sortBy}
                onCategoryChange={onCategoryChange}
                onSearchChange={onSearchChange}
                onSortChange={onSortChange}
            />

            {/* 3. Tampilan Kondisional: Error, Loading, atau Grid Produk */}
            {error ? (
                <p role="alert">{error}</p>
            ) : loading ? (
                <LoadingState message="Getting your next favorites ready" />
            ) : (
                <>
                    <div className="result-count">
                        {products.length} devices, endless possibilities
                    </div>

                    <section className="product-grid" aria-label="Product list">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </section>

                    {products.length === 0 && (
                        <LoadingState message="No devices found. Try another search." />
                    )}
                </>
            )}
        </>
    );
}