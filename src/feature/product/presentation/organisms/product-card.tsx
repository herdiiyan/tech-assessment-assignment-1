import Link from 'next/link';
import { Product } from '../../domain/product.entities';
import { ProductPrice } from '../molecules/product-price';
import { DeviceArt } from '../molecules/device-art';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const typeLabel = product.type === 'Tablets' ? 'Tablet' : 'Smartphone';

    return (
        <Link className="product-card" href={`/product/${product.id}`}>
            {/* 1. Bagian Gambar Perangkat (Molecule) */}
            <DeviceArt
                brand={product.brand}
                type={product.type}
                tone={product.tone}
                color={product.color}
                tag={product.tag}
            />

            {/* 2. Bagian Teks & Info Produk */}
            <div className="product-copy">
                <span className="brand">
                    {product.brand} <span> / {typeLabel}</span>
                </span>
                <h3>{product.name}</h3>
                <p>
                    {product.specs.storage} <span>·</span> {product.color}
                </p>

                {/* 3. Bagian Harga (Molecule) */}
                <ProductPrice price={product.price} />
            </div>
        </Link>
    );
}