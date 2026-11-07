'use client';

import { useState, useEffect, useCallback } from 'react';
import { OrderResult } from '../domain/order.entities';
import { PurchaseProductUseCase } from '../usecase/purchase-product.usecase';
import { MockOrderRepository } from '../infrastructure/mock-order.repository';
import { Product } from '../../product/domain/product.entities';

const orderRepository = new MockOrderRepository();
const purchaseUseCase = new PurchaseProductUseCase(orderRepository);

export function useCheckoutController() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fungsi mengeksekusi pembelian
    const buy = useCallback(async (product: Product, userBalance: number) => {
        if (isSubmitting || orderResult) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const result = await purchaseUseCase.execute(product, userBalance);
            setOrderResult(result);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Purchase failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, orderResult]);

    // Fitur Aksesibilitas: Keyboard Focus Trap saat modal muncul (persis kode Orbit asli)
    useEffect(() => {
        if (!orderResult) return;

        const previousElement = document.activeElement as HTMLElement | null;
        const ctaButton = document.getElementById('success-cta');
        ctaButton?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                ctaButton?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previousElement?.focus();
        };
    }, [orderResult]);

    return {
        isSubmitting,
        orderResult,
        error,
        buy,
        reset: () => setOrderResult(null),
    };
}