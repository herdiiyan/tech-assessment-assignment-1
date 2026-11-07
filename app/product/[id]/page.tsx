'use client'

import { use } from 'react';
import { Header } from '../../../src/shared/components/organisms/header';
import { Footer } from '../../../src/shared/components/organisms/footer';
import { ProductDetailTemplate } from '../../../src/feature/product/presentation/templates/product-detail.template';
import { useProductDetailController } from '../../../src/feature/product/controller/use-product-detail.controller';
import { useUserProfileController } from '../../../src/feature/user/controller/use-user-profile.controller';
import { useCheckoutController } from '../../../src/feature/order/controller/use-checkout.controller';
import { PurchaseModal } from '../../../src/feature/order/presentation/organisms/purchase-modal';

export default function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // 1. Controller Produk (Data gadget)                                                                                                                                                                     
  const { product, loading, error } = useProductDetailController(id);

  // 2. Controller User (Ambil saldo wallet user $1,050)
  const { user } = useUserProfileController();

  // 3. Controller Checkout (Proses beli)
  const { buy, isSubmitting, orderResult, error: checkoutError } = useCheckoutController();

  const handleBuy = () => {
    if (!product) return;
    const balance = user?.walletBalance ?? 1050;
    buy(product, balance);
  };

  return (
    <>
      <Header userInitials={user?.initials} />

      <ProductDetailTemplate
        product={product}
        loading={loading}
        error={error || checkoutError}
        onBuy={handleBuy}
        isBuying={isSubmitting}
      />

      <Footer />

      {/* Tampilkan Modal jika orderResult sudah ada */}
      {orderResult && <PurchaseModal orderResult={orderResult} />}
    </>
  );
}