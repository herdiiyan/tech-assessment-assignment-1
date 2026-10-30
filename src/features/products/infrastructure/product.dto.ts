export interface ApiProductDto {
  id: string | number;
  name: string;
  brand: string;
  type: string;
  price: number;
  color: string;
  tone?: string;
  tag?: string;
  storage: string;
  screen: string;
  chip: string;
  camera: string;
  battery: string;
  os: string;
  stock?: number;
}
