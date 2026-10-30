import { CreateOrderInput, OrderResult } from "./order.entity";


export interface IOrderRepository {
    createOrder(payload: CreateOrderInput): Promise<OrderResult>;
}