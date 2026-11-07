import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { productReducer } from '../../feature/product/presentation/slices/product.slice';

export const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

// Type Safety untuk RootState dan AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks yang sudah bertipe data ketat
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;