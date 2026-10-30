import { describe, it, expect } from 'vitest';
import { ProductMapper } from './product.mapper';
import { ApiProductDto } from './product.dto';

describe('ProductMapper (Anti-Corruption Layer)', () => {
  it('correctly maps raw DTO to Domain Entity with proper normalization', () => {
    const rawDto: ApiProductDto = {
      id: 1, // numeric ID from external API
      name: 'Test Device',
      brand: 'TestBrand',
      type: 'tablets_edition',
      price: 499,
      color: 'Silver',
      storage: '64 GB',
      screen: '10-inch',
      chip: 'M1',
      camera: '12 MP',
      battery: '8000 mAh',
      os: 'Android',
    };

    const domainEntity = ProductMapper.toDomain(rawDto);

    expect(domainEntity.id).toBe('1');
    expect(domainEntity.type).toBe('Tablets');
    expect(domainEntity.tone).toBe('gray'); // default fallback
    expect(domainEntity.tag).toBe(''); // default fallback
    expect(domainEntity.stock).toBe(0); // default fallback
  });

  it('correctly maps a list of raw DTOs to Domain Entities', () => {
    const rawList: ApiProductDto[] = [
      {
        id: '1',
        name: 'Phone A',
        brand: 'Brand A',
        type: 'smartphones',
        price: 999,
        color: 'Black',
        storage: '128 GB',
        screen: '6.1-inch',
        chip: 'Chip A',
        camera: '48 MP',
        battery: '4000 mAh',
        os: 'OS 1',
        stock: 5,
      },
    ];

    const domainList = ProductMapper.toDomainList(rawList);
    expect(domainList.length).toBe(1);
    expect(domainList[0].type).toBe('Smartphones');
    expect(domainList[0].stock).toBe(5);
  });
});
