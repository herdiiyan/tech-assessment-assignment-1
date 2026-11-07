// Status hasil transaksi yang sah menurut aturan bisnis
export type PurchaseStatus = 'success' | 'insufficient_balance';

// Entitas hasil pemesanan / checkout
export interface OrderResult {
    status: PurchaseStatus;
    orderId?: string;
    productId: string;
    productName: string;
    total: number;
    userBalance: number;
    deficit?: number; // Jumlah kekurangan saldo jika status insufficient_balance
}