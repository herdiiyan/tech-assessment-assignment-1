import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../domain/product.entity';

interface ProductsState {
    items: Product[];
    search: string;
    category: string;
    sort: string;
}

const initialState: ProductsState = {
    items: [],
    search: '',
    category: 'All devices',
    sort: 'featured',
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
    },
});

export const { setProducts, setSearch, setCategory, setSort } = productsSlice.actions;
