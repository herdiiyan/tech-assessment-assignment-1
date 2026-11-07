'use client'

import { useEffect, useState } from "react";
import { MockProductRepositoriy } from "../infrasturcture/mock-product.repository";
import { GetProductByIdUseCase } from "../usecase/get-product-by-id.usecase";
import { Product } from "../domain/product.entities";

const productRepository = new MockProductRepositoriy();
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);

export function useProductDetailController(productId: string) {
    //buat state data dan status UI
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //buat fungsi memanggil usecase 
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        getProductByIdUseCase.execute(productId).then((data) => {
            if (isMounted) setProduct(data);
        }).catch((err: unknown) => {
            if (isMounted) {
                setError(err instanceof Error ? err.message : 'Failed to load device details.');
            }
        }).finally(() => {
            if (isMounted) setLoading(false);
        })

        return () => {
            isMounted = false;
        };
    }, [productId])

    //kembalikan data dan handler ke View
    return {
        product,
        loading,
        error
    };
} 