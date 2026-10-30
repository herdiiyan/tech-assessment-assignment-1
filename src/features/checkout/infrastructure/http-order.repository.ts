import { CreateOrderInput, OrderResult } from "../domain/order.entity";

export class HttpOrderRepository {
    private readonly baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

    async createOrder(payload: CreateOrderInput): Promise<OrderResult> {
        if (this.baseURL) {
            const res = await fetch(`${this.baseURL}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Failed to create order.");
            return res.json();
        }
        await new Promise((r) => setTimeout(r, 1000));
        return {
            order_id: 'ORB-' + Date.now().toString().slice(-8),
            product_id: payload.productId,
            total: payload.total,
            status: 'success'
        };
    }
}