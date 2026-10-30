export interface CreateOrderInput {
    productId: string;
    total: number;
}

export interface OrderResult {
    order_id?: string;
    product_id?: string;
    total?: number;
    status: 'success' | 'insufficient_balance';
}