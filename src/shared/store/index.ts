import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from '@/features/products/presentation/state/products.slice';
import { checkoutSlice } from '@/features/checkout/presentation/state/checkout.slice';

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        checkout: checkoutSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
