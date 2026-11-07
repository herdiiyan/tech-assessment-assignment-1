import {
    Monitor,
    Cpu,
    Camera,
    Battery,
    HardDrive,
    Smartphone,
} from 'lucide-react';
import { ProductSpecification } from '../../domain/product.entities';

interface SpecListProps {
    specs: ProductSpecification;
}

export function SpecList({ specs }: SpecListProps) {
    const items = [
        { icon: Monitor, label: 'Display', value: specs.screen },
        { icon: Cpu, label: 'Processor', value: specs.chip },
        { icon: Camera, label: 'Camera', value: specs.camera },
        { icon: Battery, label: 'Battery', value: specs.battery },
        { icon: HardDrive, label: 'Storage', value: specs.storage },
        { icon: Smartphone, label: 'Operating system', value: specs.os },
    ];

    return (
        <div className="specs">
            {items.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                    <Icon size={17} />
                    <span>
                        <small>{label}</small>
                        <strong>{value}</strong>
                    </span>
                </div>
            ))}
        </div>
    );
}