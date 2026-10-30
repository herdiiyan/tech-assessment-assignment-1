export interface Product {
    id: string;
    name: string;
    brand: string;
    type: 'Smartphones' | 'Tablets';
    price: number;
    color: string;
    tone: string;
    tag: string;
    storage: string;
    screen: string;
    chip: string;
    camera: string;
    battery: string;
    os: string;
    stock?: number;
}