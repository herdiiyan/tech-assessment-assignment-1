import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../domain/product.entity';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const isTablet = product.type === 'Tablets';

    return (
        <Link className="product-card" href={`/product/${product.id}`}>
            <div className={`product-art ${product.tone}`}>
                {product.tag && (
                    <span className={`badge ${product.tag === 'NEW ARRIVAL' ? 'green' : ''}`}>
                        {product.tag}
                    </span>
                )}
                <div className={`device ${isTablet ? 'tablet' : ''}`}>
                    <div className="device-back">
                        <div className={`cameras ${product.brand === 'Google' ? 'pixel' : ''}`}>
                            <i /><i /><i />
                        </div>
                        <span className="device-brand">
                            {product.brand === 'Apple' ? '●' : product.brand === 'Google' ? 'G' : 'SAMSUNG'}
                        </span>
                    </div>
                    <div className="device-front">
                        <div className="dynamic-island" />
                        <div className="wallpaper" />
                    </div>
                </div>
                <span className="art-caption">{product.color}</span>
            </div>

            <div className="product-copy">
                <span className="brand">
                    {product.brand} <span> / {isTablet ? 'Tablet' : 'Smartphone'}</span>
                </span>
                <h3>{product.name}</h3>
                <p>
                    {product.storage} <span>·</span> {product.color}
                </p>
                <div className="product-bottom">
                    <strong>${product.price.toLocaleString('en-US')}<small> USD</small></strong>
                    <span className="circle-arrow">
                        <ArrowUpRight size={19} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
