'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles } from 'lucide-react';
import { RootState } from '@/shared/store';
import { setProducts } from '@/features/products/presentation/state/products.slice';
import { getCatalogUseCase } from '@/shared/container';
import { AppHeader } from '@/shared/components/AppHeader';
import { AppFooter } from '@/shared/components/AppFooter';
import { CatalogToolbar } from '@/features/products/presentation/components/CatalogToolbar';
import { ProductGrid } from '@/features/products/presentation/components/ProductGrid';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, search, category, sort } = useSelector((s: RootState) => s.products);
  const walletBalance = useSelector((s: RootState) => s.checkout?.walletBalance ?? 1050);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCatalogUseCase.execute({ search, category, sort })
      .then((data) => dispatch(setProducts(data)))
      .finally(() => setLoading(false));
  }, [search, category, sort, dispatch]);

  return (
    <>
      <AppHeader />
      <main>
        {/* 1. Welcome Section (3 Kolom: User, Membership, Points) */}
        <section className="welcome" aria-label="User information">
          <div className="welcome-user">
            <div className="avatar">AM</div>
            <div>
              <div className="welcome-label">YOUR PERSONAL SPACE</div>
              <h2>Welcome back, Dilan <span className="wave">✳</span></h2>
              <p>dilan.1995@email.com</p>
            </div>
          </div>
          <div className="member">
            <span className="plus"><Sparkles size={13} /> Orbit Plus</span>
            <p>A little extra, just for you.</p>
          </div>
          <div className="points">
            <span>YOUR WALLET BALANCE</span>
            <strong>${walletBalance.toLocaleString('en-US')} <small>USD</small></strong>
            <p>Ready for your next upgrade.</p>
          </div>
        </section>

        {/* 2. Collection Heading (Tepat di atas toolbar) */}
        <section className="collection-heading" id="devices">
          <div className="eyebrow">THE COLLECTION</div>
          <h2>Your next everyday essential.</h2>
          <p>Big ideas. Beautiful screens. Meet your next upgrade.</p>
        </section>

        {/* 3. Filter & Search Toolbar */}
        <CatalogToolbar />

        {/* 4. Product Grid & Benefits */}
        <ProductGrid items={items} loading={loading} />
      </main>
      <AppFooter />
    </>
  );
}
