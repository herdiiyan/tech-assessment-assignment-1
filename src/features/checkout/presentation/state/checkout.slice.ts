import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderResult } from '../../domain/order.entity';

interface CheckoutState {
    walletBalance: number;
    orders: OrderResult[];
}

const initialState: CheckoutState = {
    walletBalance: 1050,
    orders: [],
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderResult>) => {
            state.orders.push(action.payload);
        },
    },
});

export const { addOrder } = checkoutSlice.actions;
