import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class ProductEntity {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  constructor(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    sku: string,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.sku = sku;

    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.price <= 0) {
      throw new Error('Price must be positive');
    }
    if (this.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }
    if (!this.sku || this.sku.trim().length === 0) {
      throw new Error('SKU is required');
    }
  }

  updateDetails(updateData: { name?: string; description?: string; price?: number; stock?: number; category?: string; sku?: string }): void {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.description !== undefined) {
      this.description = updateData.description;
    }
    if (updateData.price !== undefined) {
      this.price = updateData.price;
      if (this.price <= 0) {
        throw new Error('Price must be positive');
      }
    }
    if (updateData.stock !== undefined) {
      this.stock = updateData.stock;
      if (this.stock < 0) {
        throw new Error('Stock cannot be negative');
      }
    }
    if (updateData.category !== undefined) {
      this.category = updateData.category;
    }
    if (updateData.sku !== undefined) {
      this.sku = updateData.sku;
    }
  }
}