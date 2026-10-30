import { describe, expect, it } from "vitest";
import { IOrderRepository } from "../domain/order.repository";
import { PurchaseDeviceUseCase } from "./purchase-device.usecase";

describe('purchase-device.usecase', () => {
    const fakeOrderRepository: IOrderRepository = {
        createOrder: async (input) => ({
            order_id: 'ORD-12345678',
            product_id: input.productId,
            total: input.total,
            status: 'success'
        })
    }

    it('should success make order when stock and saldo is sufficient', async () => {
        const useCase = new PurchaseDeviceUseCase(fakeOrderRepository);
        const result = await useCase.execute({
            product: { id: '1', price: 999, stock: 5 },
            walletBalance: 1050,
        });
        expect(result.status).toBe('success');
        expect(result.order_id).toBeDefined();

    })

    it("return status insufficient_balance if price > walletBalance", async () => {
        const usecase = new PurchaseDeviceUseCase(fakeOrderRepository);
        const result = await usecase.execute({
            product: { id: '2', price: 1299, stock: 5 },
            walletBalance: 1050,
        });
        expect(result.status).toBe('insufficient_balance');
    })

    it("throw error when stock is 0 (stock < 1)", async () => {
        const usecase = new PurchaseDeviceUseCase(fakeOrderRepository);
        await expect(
            usecase.execute({
                product: { id: '1', price: 999, stock: 0 },
                walletBalance: 1050
            })
        ).rejects.toThrow('This device is out of stock')
    })
});