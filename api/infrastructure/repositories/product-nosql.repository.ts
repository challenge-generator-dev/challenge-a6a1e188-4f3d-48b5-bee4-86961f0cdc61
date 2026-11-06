import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/common';
import { Connection, Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

interface ProductDocument extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ProductNosqlRepository implements ProductRepository, OnModuleInit, OnModuleDestroy {
  private productModel: Model<ProductDocument>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(ProductDocument.name) private readonly productMongooseModel: Model<ProductDocument>,
  ) {
    this.productModel = productMongooseModel;
  }

  async onModuleInit() {
    if (!this.connection.readyState) {
      await this.connection.asPromise();
    }
    console.log('NoSQL Database connection initialized');
  }

  async onModuleDestroy() {
    if (this.connection.readyState) {
      await this.connection.close();
    }
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    const existingProduct = await this.findBySku(product.sku);
    if (existingProduct) {
      throw new Error(`Product with SKU ${product.sku} already exists`);
    }

    const existingName = await this.findByName(product.name);
    if (existingName) {
      throw new Error(`Product with name ${product.name} already exists`);
    }

    const createdProduct = new this.productModel({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      sku: product.sku,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedProduct = await createdProduct.save();
    return this.mapToDomain(savedProduct);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findOne({ id }).exec();
    if (!product) {
      return null;
    }
    return this.mapToDomain(product);
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findOne({ name }).exec();
    if (!product) {
      return null;
    }
    return this.mapToDomain(product);
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findOne({ sku }).exec();
    if (!product) {
      return null;
    }
    return this.mapToDomain(product);
  }

  async update(id: string, productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const existingProduct = await this.findById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    if (productData.sku && productData.sku !== existingProduct.sku) {
      const skuExists = await this.findBySku(productData.sku);
      if (skuExists) {
        throw new Error(`Product with SKU ${productData.sku} already exists`);
      }
    }

    if (productData.name && productData.name !== existingProduct.name) {
      const nameExists = await this.findByName(productData.name);
      if (nameExists) {
        throw new Error(`Product with name ${productData.name} already exists`);
      }
    }

    const updatedProduct = await this.productModel
      .findOneAndUpdate(
        { id },
        {
          $set: {
            ...productData,
            updatedAt: new Date(),
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    return this.mapToDomain(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
  }

  async list(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().exec();
    return products.map((product) => this.mapToDomain(product));
  }

  private mapToDomain(document: ProductDocument): ProductEntity {
    return new ProductEntity(
      document.id,
      document.name,
      document.description,
      document.price,
      document.stock,
      document.category,
      document.sku,
    );
  }
}