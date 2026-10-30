import { Truck, ShieldCheck, Package } from 'lucide-react';
import { Product } from '../../domain/product.entity';
import { ProductCard } from './../../components/ProductCard';

interface ProductGridProps {
    items: Product[];
    loading?: boolean;
    error?: string;
}

export function ProductGrid({ items, loading, error }: ProductGridProps) {
    return (
        <>
            {error ? (
                <p role="alert">{error}</p>
            ) : loading ? (
                <div className="loading">
                    Getting your next favorites ready<span>…</span>
                </div>
            ) : (
                <>
                    <div className="result-count">
                        {items.length} devices, endless possibilities
                    </div>

                    <section className="product-grid" aria-label="Product list">
                        {items.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </section>

                    {!items.length && (
                        <div className="loading">No devices found. Try another search.</div>
                    )}
                </>
            )}

            {/* Bagian Benefit Layanan di Bawah Grid */}
            <section className="benefits">
                <div>
                    <Truck />
                    <span>
                        <strong>On its way, on us.</strong>
                        <small>Free shipping on every device</small>
                    </span>
                </div>
                <div>
                    <ShieldCheck />
                    <span>
                        <strong>Peace of mind included.</strong>
                        <small>1-year warranty on all devices</small>
                    </span>
                </div>
                <div>
                    <Package />
                    <span>
                        <strong>Find your perfect fit.</strong>
                        <small>Easy returns within 14 days</small>
                    </span>
                </div>
            </section>
        </>
    );
}
