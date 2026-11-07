import Link from 'next/link';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Truck,
    ShieldCheck,
    LoaderCircle,
} from 'lucide-react';
import { Product } from '../../domain/product.entities';
import { DetailArt } from '../molecules/detail-art';
import { SpecList } from '../molecules/spec-list';

interface ProductDetailTemplateProps {
    product: Product | null;
    loading: boolean;
    error: string | null;
    onBuy?: () => void;
    isBuying?: boolean;
}

export function ProductDetailTemplate({
    product,
    loading,
    error,
    onBuy,
    isBuying = false,
}: ProductDetailTemplateProps) {
    return (
        <main className="detail-main">
            {/* Tombol Kembali ke Dashboard */}
            <Link className="back-link" href="/">
                <ArrowLeft size={16} /> Back to discover
            </Link>

            {/* 1. Status Loading */}
            {loading ? (
                <div className="loading">A closer look is on its way…</div>
            ) : !product ? (
                /* 2. Status Perangkat Tidak Ditemukan */
                <div className="empty">
                    <h1>Device not found.</h1>
                    <p role="alert">{error || 'We couldn’t find that device.'}</p>
                    <Link className="primary-button" href="/">
                        Back to dashboard <ArrowRight size={17} />
                    </Link>
                </div>
            ) : (
                /* 3. Grid Tampilan Detail Produk */
                <div className="detail-grid">
                    {/* Kolom Kiri: Ilustrasi Gadget Besar (Molecule) */}
                    <DetailArt
                        brand={product.brand}
                        type={product.type}
                        tone={product.tone}
                    />

                    {/* Kolom Kanan: Detail Informasi & Spesifikasi */}
                    <div className="detail-copy">
                        <div className="eyebrow">
                            {product.brand} / {product.type}
                        </div>
                        <h1>{product.name}</h1>
                        <p className="description">
                            A little more possibility in your hands. Beautifully designed,
                            effortlessly powerful, and ready for whatever your day brings.
                        </p>

                        <div className="detail-price">
                            ${product.price.toLocaleString('en-US')}{' '}
                            <span>USD · One-time payment</span>
                        </div>

                        <div className="divider" />

                        <div className="option-label">
                            COLOR <strong>{product.color}</strong>
                        </div>
                        <div className={`color-swatch ${product.tone}`}>
                            <Check size={16} />
                        </div>

                        <div className="option-label">STORAGE</div>
                        <div className="storage-option">
                            {product.specs.storage}
                            <Check size={15} />
                        </div>

                        <h2 className="spec-heading">Small details. Big difference.</h2>
                        {/* Molecule Daftar Spesifikasi */}
                        <SpecList specs={product.specs} />

                        <div className="in-stock">
                            <span /> In stock. Ready for your next chapter.
                        </div>

                        {error && <p role="alert" className="error">{error}</p>}

                        {/* Tombol Beli */}
                        <button
                            className="primary-button buy"
                            disabled={isBuying}
                            onClick={onBuy}
                            type="button"
                        >
                            {isBuying ? (
                                <>
                                    <LoaderCircle className="spin" size={18} /> Making it yours…
                                </>
                            ) : (
                                <>
                                    Make it yours{' '}
                                    <span>
                                        ${product.price.toLocaleString('en-US')}{' '}
                                        <ArrowRight size={18} />
                                    </span>
                                </>
                            )}
                        </button>

                        <p className="purchase-note">
                            Demo purchase · No payment or personal details needed
                        </p>

                        <div className="detail-perks">
                            <span>
                                <Truck size={16} /> Free shipping
                            </span>
                            <span>
                                <ShieldCheck size={16} /> 1-year warranty
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}