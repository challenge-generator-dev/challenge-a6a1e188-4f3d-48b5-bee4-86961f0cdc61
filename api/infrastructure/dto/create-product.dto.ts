import { IsString, IsNumber, IsPositive, IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Pro 15',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0.01,
  })
  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  @Type(() => Number)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 50,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'El stock es requerido' })
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónica',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'La categoría es requerida' })
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La categoría no puede exceder los 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  category: string;

  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'Laptop de alta gama con procesador Intel i7',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({
    description: 'SKU del producto (Stock Keeping Unit)',
    example: 'LAP-PRO-15-001',
    minLength: 5,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'El SKU es requerido' })
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MinLength(5, { message: 'El SKU debe tener al menos 5 caracteres' })
  @MaxLength(50, { message: 'El SKU no puede exceder los 50 caracteres' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  sku: string;
}