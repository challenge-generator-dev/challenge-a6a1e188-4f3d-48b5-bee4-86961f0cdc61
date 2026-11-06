import { Injectable } from '@nestjs/common';
import { PrismaClient, Product as PrismaProduct } from '@prisma/client';
import { ProductEntity } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class ProductSqlRepository implements ProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          sku: product.sku,
        },
      });
      return this.mapToDomain(createdProduct);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Product with this name or SKU already exists');
      }
      throw new Error('Failed to create product');
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? this.mapToDomain(product) : null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { name },
    });
    return product ? this.mapToDomain(product) : null;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });
    return product ? this.mapToDomain(product) : null;
  }

  async update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity> {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          sku: product.sku,
        },
      });
      return this.mapToDomain(updatedProduct);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Product not found');
      }
      throw new Error('Failed to update product');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Product not found');
      }
      throw new Error('Failed to delete product');
    }
  }

  async list(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany();
    return products.map(this.mapToDomain);
  }

  private mapToDomain(prismaProduct: PrismaProduct): ProductEntity {
    return new ProductEntity(
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.price,
      prismaProduct.stock,
      prismaProduct.category,
      prismaProduct.sku,
      prismaProduct.id
    );
  }
}