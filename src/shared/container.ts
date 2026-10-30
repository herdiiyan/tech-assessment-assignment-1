import { HttpProductRepository } from '@/features/products/infrastructure/http-product.repository';
import { HttpOrderRepository } from '@/features/checkout/infrastructure/http-order.repository';
import { GetCatalogUseCase } from '@/features/products/application/get-catalog.usecase';
import { PurchaseDeviceUseCase } from '@/features/checkout/application/purchase-device.usecase';

// Supplier
export const productRepository = new HttpProductRepository();
export const orderRepository = new HttpOrderRepository();

// Head Chef
export const getCatalogUseCase = new GetCatalogUseCase(productRepository);
export const purchaseDeviceUseCase = new PurchaseDeviceUseCase(orderRepository);
