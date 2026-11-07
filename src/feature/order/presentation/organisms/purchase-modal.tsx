import Link from 'next/link';
import { Check, CircleAlert, ArrowRight } from 'lucide-react';
import { OrderResult } from '../../domain/order.entities';

interface PurchaseModalProps {
    orderResult: OrderResult;
}

export function PurchaseModal({ orderResult }: PurchaseModalProps) {
    const isSuccess = orderResult.status === 'success';

    return (
        <div className="modal-overlay">
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-title"
                aria-describedby="success-description"
            >
                {/* 1. Icon Status */}
                <div className="success-icon">
                    {isSuccess ? <Check size={32} /> : <CircleAlert size={32} />}
                </div>

                {/* 2. Eyebrow */}
                <div className="eyebrow">
                    {isSuccess ? 'GOOD THINGS ARE ON THEIR WAY' : 'A LITTLE SHORT THIS TIME'}
                </div>

                {/* 3. Judul Modal */}
                <h2 id="success-title">
                    {isSuccess ? 'It’s officially in your orbit.' : 'Insufficient balance'}
                </h2>

                {/* 4. Deskripsi */}
                <p id="success-description">
                    {isSuccess ? (
                        <>Your {orderResult.productName} is one step closer to being your new everyday essential.</>
                    ) : (
                        <>
                            Your wallet balance is ${orderResult.userBalance.toLocaleString('en-US')} USD. You need $
                            {(orderResult.deficit ?? 0).toLocaleString('en-US')} USD more to purchase this {orderResult.productName}.
                        </>
                    )}
                </p>

                {/* 5. Info Order / Harga */}
                <div className="order-info">
                    <span>{isSuccess ? 'Order reference' : 'Device price'}</span>
                    <strong>
                        {isSuccess ? orderResult.orderId : `$${orderResult.total.toLocaleString('en-US')} USD`}
                    </strong>
                </div>

                {/* 6. Tombol Kembali ke Dashboard */}
                <Link id="success-cta" className="primary-button" href="/">
                    Back to dashboard <ArrowRight size={18} />
                </Link>

                <small>This is a simulated purchase. No charge was made.</small>
            </div>
        </div>
    );
}