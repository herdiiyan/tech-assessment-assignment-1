'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
  LoaderCircle,
  Smartphone,
  Cpu,
  Camera,
  Battery,
  HardDrive,
  Monitor,
} from 'lucide-react';

import { RootState } from '@/shared/store';
import { addOrder } from '@/features/checkout/presentation/state/checkout.slice';
import { productRepository, purchaseDeviceUseCase } from '@/shared/container';
import { Product } from '@/features/products/domain/product.entity';
import { OrderResult } from '@/features/checkout/domain/order.entity';

import { AppHeader } from '@/shared/components/AppHeader';
import { AppFooter } from '@/shared/components/AppFooter';
import { PurchaseModal } from '@/features/checkout/presentation/components/PurchaseModal';

export default function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dispatch = useDispatch();
  const walletBalance = useSelector((state: RootState) => state.checkout.walletBalance);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<OrderResult | null>(null);
  const [err, setErr] = useState('');

  // 1. Fetch data produk dari Repository (Pantry)
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    productRepository
      .getProductById(id)
      .then((data) => {
        if (!mounted) return;
        if (!data) {
          setErr('We couldn’t find that device.');
        } else {
          setProduct(data);
        }
      })
      .catch((e) => {
        if (mounted) setErr(e.message || 'Failed to load device');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  // 2. The Waiter memanggil The Head Chef (Use Case) saat tombol beli diklik
  async function handleBuy() {
    if (busy || done || !product) return;
    setBusy(true);
    setErr('');

    try {
      const result = await purchaseDeviceUseCase.execute({
        product,
        walletBalance,
      });

      if (result.status === 'success') {
        dispatch(addOrder(result));
      }
      setDone(result);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Purchase failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const specs = product
    ? [
      [Monitor, 'Display', product.screen],
      [Cpu, 'Processor', product.chip],
      [Camera, 'Camera', product.camera],
      [Battery, 'Battery', product.battery],
      [HardDrive, 'Storage', product.storage],
      [Smartphone, 'Operating system', product.os],
    ]
    : [];

  return (
    <>
      <AppHeader />

      <main className="detail-main">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} /> Back to discover
        </Link>

        {loading ? (
          <div className="loading">A closer look is on its way…</div>
        ) : !product ? (
          <div className="empty">
            <h1>Device not found.</h1>
            <p role="alert">{err}</p>
            <Link className="primary-button" href="/">
              Back to dashboard <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="detail-grid">
            {/* Visual Ilustrasi Gadget */}
            <div>
              <div className={`detail-art product-art ${product.tone}`}>
                <span className="badge">THE EVERYDAY, REIMAGINED</span>
                <div className={`device ${product.type === 'Tablets' ? 'tablet' : ''}`}>
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
                <span className="art-caption">Designed for your everyday.</span>
              </div>
              <p className="illustration-note">
                Illustrative device preview. Specifications are demo data.
              </p>
            </div>

            {/* Informasi Detail & Tombol Beli */}
            <div className="detail-copy">
              <div className="eyebrow">{product.brand} / {product.type}</div>
              <h1>{product.name}</h1>
              <p className="description">
                A little more possibility in your hands. Beautifully designed, effortlessly powerful,
                and ready for whatever your day brings.
              </p>

              <div className="detail-price">
                ${product.price.toLocaleString('en-US')} <span>USD · One-time payment</span>
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
                {product.storage}
                <Check size={15} />
              </div>

              <h2 className="spec-heading">Small details. Big difference.</h2>
              <div className="specs">
                {specs.map(([Icon, label, value]: any) => (
                  <div key={label}>
                    <Icon size={17} />
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </div>
                ))}
              </div>

              <div className="in-stock">
                <span /> In stock. Ready for your next chapter.
              </div>

              {err && <p role="alert" className="error">{err}</p>}

              <button
                className="primary-button buy"
                disabled={busy || !!done}
                onClick={handleBuy}
              >
                {busy ? (
                  <>
                    <LoaderCircle className="spin" size={18} /> Making it yours…
                  </>
                ) : (
                  <>
                    Make it yours{' '}
                    <span>
                      ${product.price.toLocaleString('en-US')} <ArrowRight size={18} />
                    </span>
                  </>
                )}
              </button>

              <p className="purchase-note">
                Demo purchase · No payment or personal details needed
              </p>

              <div className="detail-perks">
                <span><Truck size={16} /> Free shipping</span>
                <span><ShieldCheck size={16} /> 1-year warranty</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <AppFooter />

      {/* Modal Dialog Transaksi */}
      {product && (
        <PurchaseModal
          result={done}
          product={product}
          walletBalance={walletBalance}
        />
      )}
    </>
  );
}
