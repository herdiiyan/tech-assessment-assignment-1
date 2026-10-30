'use client';

import { useDispatch, useSelector } from 'react-redux';
import { LayoutGrid, Smartphone, Tablet, Search } from 'lucide-react';
import { RootState } from '@/shared/store';
import { setCategory, setSearch, setSort } from '../state/products.slice';

export function CatalogToolbar() {
    const dispatch = useDispatch();
    const { category, search, sort } = useSelector((state: RootState) => state.products);

    const categories = ['All devices', 'Smartphones', 'Tablets'] as const;
    const icons = [LayoutGrid, Smartphone, Tablet];

    return (
        <div className="toolbar">
            <div className="tabs">
                {categories.map((c, i) => {
                    const Icon = icons[i];
                    return (
                        <button
                            key={c}
                            className={category === c ? 'active' : ''}
                            onClick={() => dispatch(setCategory(c))}
                        >
                            <Icon size={15} />
                            {c}
                        </button>
                    );
                })}
            </div>

            <div className="tools">
                <label className="search">
                    <Search size={16} />
                    <input
                        aria-label="Search devices"
                        placeholder="Search devices…"
                        value={search}
                        onChange={(e) => dispatch(setSearch(e.target.value))}
                    />
                </label>

                <select
                    aria-label="Sort devices"
                    value={sort}
                    onChange={(e) => dispatch(setSort(e.target.value))}
                >
                    <option value="featured">Featured</option>
                    <option value="low">Price: low to high</option>
                    <option value="high">Price: high to low</option>
                </select>
            </div>
        </div>
    );
}
