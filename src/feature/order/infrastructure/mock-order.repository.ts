import { CreatedOrderData, IOrderRepository } from "../usecase/repositories/order-repository.entities";


export class MockOrderRepository implements IOrderRepository {
    async createOrder(productId: string, total: number): Promise<CreatedOrderData> {
        return new Promise((resolve) => {
            // Simulasi jeda network transaksi 1100ms persis seperti kode asli Orbit
            setTimeout(() => {
                resolve({
                    orderId: 'ORB-' + Date.now().toString().slice(-8),
                });
            }, 1100);
        });
    }
}
