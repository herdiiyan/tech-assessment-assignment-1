
import { IOrderRepository } from './repositories/order-repository.entities';
import { OrderResult } from '../domain/order.entities';
import { Product } from '../../product/domain/product.entities';

export class PurchaseProductUseCase {
    constructor(private readonly orderRepo: IOrderRepository) { }

    async execute(product: Product, userBalance: number): Promise<OrderResult> {
        // 1. Aturan Bisnis 1: Validasi Stok
        if (!product || product.stock < 1) {
            throw new Error('This device is out of stock.');
        }

        // 2. Aturan Bisnis 2: Validasi Saldo Dompet
        if (product.price > userBalance) {
            return {
                status: 'insufficient_balance',
                productId: product.id,
                productName: product.name,
                total: product.price,
                userBalance,
                deficit: product.price - userBalance,
            };
        }

        // 3. Eksekusi Pembuatan Order
        const createdOrder = await this.orderRepo.createOrder(product.id, product.price);

        return {
            status: 'success',
            orderId: createdOrder.orderId,
            productId: product.id,
            productName: product.name,
            total: product.price,
            userBalance,
        };
    }
}