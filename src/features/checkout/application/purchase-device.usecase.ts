import { OrderResult } from "../domain/order.entity";
import { IOrderRepository } from "../domain/order.repository";

interface ExecuteParams {
    product: {
        id: string;
        price: number;
        stock?: number
    },
    walletBalance: number;
}

export class PurchaseDeviceUseCase {
    constructor(
        private readonly orderRespository: IOrderRepository
    ) { }

    async execute({ product, walletBalance }: ExecuteParams): Promise<OrderResult> {
        if ((product.stock ?? 0) < 1) {
            throw new Error('This device is out of stock')
        }

        if (product.price > walletBalance) {
            return { status: 'insufficient_balance' }
        }

        return this.orderRespository.createOrder({
            productId: product.id,
            total: product.price
        })
    }
}