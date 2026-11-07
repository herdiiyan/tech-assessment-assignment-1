export type ProductCategory = 'Tablets' | 'Smartphones';
export type ProductTone = 'sand' | 'gray' | 'blue' | 'sage' | 'purple' | 'indigo';

export interface ProductSpecification {
    screen: string;
    chip: string;
    camera: string;
    battery: string;
    os: string;
    storage: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    type: ProductCategory;
    price: number;
    stock: number;
    color: string;
    tone: ProductTone;
    tag?: string;
    specs: ProductSpecification
}