import { ProductTone, ProductCategory } from '../../domain/product.entities';

interface DetailArtProps {
    brand: string;
    type: ProductCategory;
    tone: ProductTone;
}

export function DetailArt({ brand, type, tone }: DetailArtProps) {
    const isTablet = type === 'Tablets';
    const isGoogle = brand === 'Google';
    const brandLogo = brand === 'Apple' ? '●' : brand === 'Google' ? 'G' : 'SAMSUNG';

    return (
        <div>
            <div className={`detail-art product-art ${tone}`}>
                <span className="badge">THE EVERYDAY, REIMAGINED</span>

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

                <span className="art-caption">Designed for your everyday.</span>
            </div>

            <p className="illustration-note">
                Illustrative device preview. Specifications are demo data.
            </p>
        </div>
    );
}