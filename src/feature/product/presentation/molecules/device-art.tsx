import { ProductTone, ProductCategory } from '../../domain/product.entities';
import { Badge } from '../atoms/badge';

interface DeviceArtProps {
    brand: string;
    type: ProductCategory;
    tone: ProductTone;
    color: string;
    tag?: string;
}

export function DeviceArt({ brand, type, tone, color, tag }: DeviceArtProps) {
    const isTablet = type === 'Tablets';
    const isGoogle = brand === 'Google';
    const brandLogo = brand === 'Apple' ? '●' : brand === 'Google' ? 'G' : 'SAMSUNG';

    return (
        <div className={`product-art ${tone}`}>
            {tag && <Badge text={tag} />}

            <div className={`device ${isTablet ? 'tablet' : ''}`}>
                <div className="device-back">
                    <div className={`cameras ${isGoogle ? 'pixel' : ''}`}>
                        <i /><i /><i />
                    </div>
                    <span className="device-brand">{brandLogo}</span>
                </div>
                <div className="device-front">
                    <div className="dynamic-island" />
                    <div className="wallpaper" />
                </div>
            </div>

            <span className="art-caption">{color}</span>
        </div>
    );
}