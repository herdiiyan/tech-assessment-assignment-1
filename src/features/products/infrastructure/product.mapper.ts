import { Product } from '../domain/product.entity';
import { ApiProductDto } from './product.dto';

export class ProductMapper {
  static toDomain(raw: ApiProductDto): Product {
    return {
      id: String(raw.id),
      name: raw.name,
      brand: raw.brand,
      type: ProductMapper.mapType(raw.type),
      price: Number(raw.price),
      color: raw.color,
      tone: raw.tone || 'gray',
      tag: raw.tag || '',
      storage: raw.storage,
      screen: raw.screen,
      chip: raw.chip,
      camera: raw.camera,
      battery: raw.battery,
      os: raw.os,
      stock: raw.stock ?? 0,
    };
  }

  static toDomainList(rawList: ApiProductDto[]): Product[] {
    return rawList.map((item) => ProductMapper.toDomain(item));
  }

  private static mapType(rawType: string): 'Smartphones' | 'Tablets' {
    if (rawType.toLowerCase().includes('tablet')) {
      return 'Tablets';
    }
    return 'Smartphones';
  }
}
