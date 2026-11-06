export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  findBySku(sku: string): Promise<ProductEntity | null>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<ProductEntity[]>;
}