export interface CreatedOrderData {
    orderId: string;
}

export interface IOrderRepository {
    createOrder(productId: string, total: number): Promise<CreatedOrderData>;
}