import React from 'react';
import { LayoutGrid, Smartphone, Tablet } from 'lucide-react';
import { ProductCategory } from '../../domain/product.entities';
import { TabButton } from '../atoms/tab-button';
import { SearchInput } from '../atoms/search-input';
import { SortSelect } from '../atoms/sort-select';
import { ProductSortOption } from '../../usecase/dtos/get-products.dto';

interface ProductToolbarProps {
    currentCategory: ProductCategory | 'All devices';
    searchQuery: string;
    sortBy: ProductSortOption;
    onCategoryChange: (category: ProductCategory | 'All devices') => void;
    onSearchChange: (query: string) => void;
    onSortChange: (sort: ProductSortOption) => void;
}

export function ProductToolbar({
    currentCategory,
    searchQuery,
    sortBy,
    onCategoryChange,
    onSearchChange,
    onSortChange,
}: ProductToolbarProps) {
    const categories: Array<{ label: ProductCategory | 'All devices'; icon: typeof LayoutGrid }> = [
        { label: 'All devices', icon: LayoutGrid },
        { label: 'Smartphones', icon: Smartphone },
        { label: 'Tablets', icon: Tablet },
    ];

    return (
        <div className="toolbar">
            {/* Kumpulan Atom TabButton */}
            <div className="tabs">
                {categories.map(({ label, icon }) => (
                    <TabButton
                        key={label}
                        label={label}
                        icon={icon}
                        isActive={currentCategory === label}
                        onClick={() => onCategoryChange(label)}
                    />
                ))}
            </div>

            {/* Kumpulan Atom SearchInput & SortSelect */}
            <div className="tools">
                <SearchInput placeholder='' value={searchQuery} onChange={onSearchChange} />
                <SortSelect value={sortBy} onChange={onSortChange} />
            </div>
        </div>
    );
}