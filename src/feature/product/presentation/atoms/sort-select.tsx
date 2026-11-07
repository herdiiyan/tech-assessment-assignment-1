import { ProductSortOption } from "../../usecase/dtos/get-products.dto";

interface SortSelectProps {
    value: ProductSortOption;
    onChange: (value: ProductSortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
    return (
        <select
            aria-label="Sort devices"
            value={value}
            onChange={(e) => onChange(e.target.value as ProductSortOption)}
        >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
        </select>
    );
}