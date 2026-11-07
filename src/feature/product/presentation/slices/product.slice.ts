import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductCategory } from '../../domain/product.entities';
import { fetchProducts } from '../../../../shared/store/actions/product.action';
import { ProductSortOption } from '../../usecase/dtos/get-products.dto';

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
    category: ProductCategory | 'All devices';
    searchQuery: string;
    sortBy: ProductSortOption;
}

const initialState: ProductState = {
    items: [],
    loading: true,
    error: null,
    category: 'All devices',
    searchQuery: '',
    sortBy: 'featured',
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<ProductCategory | 'All devices'>) => {
            state.category = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSortBy: (state, action: PayloadAction<ProductSortOption>) => {
            state.sortBy = action.payload;
        },
    },
    // Otomatis menangani siklus hidup pengambilan data:
    extraReducers: (builder) => {
        builder
            // 1. Saat proses mulai
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 2. Saat proses berhasil
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            // 3. Saat proses gagal
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { setCategory, setSearchQuery, setSortBy } = productSlice.actions;
export const productReducer = productSlice.reducer;