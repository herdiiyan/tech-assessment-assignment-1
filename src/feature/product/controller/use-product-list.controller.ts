'use client';

import { useEffect } from 'react';
import { ProductCategory } from '../domain/product.entities';
import { ProductSortOption } from '../usecase/dtos/get-products.dto';
import { useAppDispatch, useAppSelector } from '../../../shared/store';
import { setCategory, setSearchQuery, setSortBy } from '../presentation/slices/product.slice';
import { fetchProducts } from '../../../shared/store/actions/product.action';

export function useProductListController() {
    const dispatch = useAppDispatch();

    // 1. Ambil data dari Redux
    const { items: products, loading, error, category, searchQuery, sortBy } = useAppSelector(
        (state) => state.product
    );

    // 2. Cukup panggil thunk saat filter berubah!
    useEffect(() => {
        dispatch(fetchProducts({ category, searchQuery, sortBy }));
    }, [category, searchQuery, sortBy, dispatch]);

    // 3. Kembalikan ke View
    return {
        products,
        loading,
        error,
        category,
        searchQuery,
        sortBy,
        setCategory: (cat: ProductCategory | 'All devices') => dispatch(setCategory(cat)),
        setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
        setSortBy: (sort: ProductSortOption) => dispatch(setSortBy(sort)),
        refresh: () => dispatch(fetchProducts({ category, searchQuery, sortBy })),
    };
}