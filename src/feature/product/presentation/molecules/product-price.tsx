
import { ArrowUpRight } from 'lucide-react';

interface ProductPriceProps {
    price: number;
}

export function ProductPrice({ price }: ProductPriceProps) {
    const formattedPrice = `$${price.toLocaleString('en-US')}`;

    return (
        <div className="product-bottom">
            <strong>
                {formattedPrice}
                <small> USD</small>
            </strong>
            <span className="circle-arrow">
                <ArrowUpRight size={19} />
            </span>
        </div>
    );
}