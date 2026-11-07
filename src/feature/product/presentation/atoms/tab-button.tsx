import { LucideIcon } from "lucide-react";

interface TabButtonProps {
    label: string;
    icon: LucideIcon;
    isActive: boolean;
    onClick: () => void;
}

export function TabButton({ label, icon: Icon, isActive, onClick }: TabButtonProps) {
    return (
        <button
            className={isActive ? 'active' : ''}
            onClick={onClick}
            type="button"
        >
            <Icon size={15} />
            {label}
        </button>
    )
}