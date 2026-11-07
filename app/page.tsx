'use client'

import { Header } from '../src/shared/components/organisms/header';
import { Footer } from '../src/shared/components/organisms/footer';
import { Benefits } from '../src/shared/components/organisms/benefits';
import { ProductListTemplate } from '../src/feature/product/presentation/templates/product-list.template';
import { useUserProfileController } from '../src/feature/user/controller/use-user-profile.controller';
import { useProductListController } from '../src/feature/product/controller/use-product-list.controller';
import { WelcomeBanner } from '../src/feature/user/presentation/organisms/welcome-banner';

export default function Dashboard() {
  const userProfile = useUserProfileController();
  const productCatalog = useProductListController();

  return (
    <>
      {/* 1. Shared Header */}
      <Header userInitials="AM" />

      {/* 2. Main Container (Membungkus halaman dengan CSS 1320px & padding) */}
      <main>
        {/* Placeholder User (akan kita gantikan saat membuat feature/user) */}
        <WelcomeBanner user={userProfile.user} loading={userProfile.loading} />

        {/* 3. Template Katalog Produk Baru Kita */}
        <ProductListTemplate
          products={productCatalog.products}
          loading={productCatalog.loading}
          error={productCatalog.error}
          category={productCatalog.category}
          searchQuery={productCatalog.searchQuery}
          sortBy={productCatalog.sortBy}
          onCategoryChange={productCatalog.setCategory}
          onSearchChange={productCatalog.setSearchQuery}
          onSortChange={productCatalog.setSortBy}
        />

        {/* 4. Shared Benefits */}
        <Benefits />
      </main>

      {/* 5. Shared Footer */}
      <Footer />
    </>
  );
}
