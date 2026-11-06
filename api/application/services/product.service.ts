import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
import { CreateProductDto } from '../../infrastructure/dto/create-product.dto';
import { UpdateProductDto } from '../../infrastructure/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    if (dto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }

    const existingByName = await this.productRepository.findByName(dto.name);
    if (existingByName) {
      throw new ConflictException('Ya existe un producto con el nombre proporcionado');
    }

    const existingBySku = await this.productRepository.findBySku(dto.sku);
    if (existingBySku) {
      throw new ConflictException('Ya existe un producto con el SKU proporcionado');
    }

    const product = new ProductEntity(
      dto.name,
      dto.description,
      dto.price,
      dto.stock,
      dto.category,
      dto.sku,
    );

    return this.productRepository.create(product);
  }

  async getProduct(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    if (dto.price !== undefined && dto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }

    if (dto.name && dto.name !== existingProduct.name) {
      const existingByName = await this.productRepository.findByName(dto.name);
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException('Ya existe otro producto con el nombre proporcionado');
      }
    }

    if (dto.sku && dto.sku !== existingProduct.sku) {
      const existingBySku = await this.productRepository.findBySku(dto.sku);
      if (existingBySku && existingBySku.id !== id) {
        throw new ConflictException('Ya existe otro producto con el SKU proporcionado');
      }
    }

    const updateData: Partial<ProductEntity> = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.price !== undefined) updateData.price = dto.price;
    if (dto.stock !== undefined) updateData.stock = dto.stock;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.sku !== undefined) updateData.sku = dto.sku;

    return this.productRepository.update(id, updateData);
  }

  async deleteProduct(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    await this.productRepository.delete(id);
  }

  async listProducts(): Promise<ProductEntity[]> {
    return this.productRepository.list();
  }
}