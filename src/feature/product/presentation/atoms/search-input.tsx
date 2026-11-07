import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search devices...' }: SearchInputProps) {
    return (
        <label htmlFor="" className="search">
            <Search size='16' />
            <input type="text" aria-label="Search devices" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        </label>
    )
}