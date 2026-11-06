import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Nombre del producto',
    example: 'Laptop Pro 15 Actualizado',
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  name?: string;

  @ApiPropertyOptional({
    description: 'Precio del producto',
    example: 1399.99,
    minimum: 0.01,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un valor positivo' })
  @Type(() => Number)
  @Transform(({ value }) => value !== undefined ? parseFloat(value) : undefined)
  price?: number;

  @ApiPropertyOptional({
    description: 'Cantidad en stock',
    example: 75,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Type(() => Number)
  @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : undefined)
  stock?: number;

  @ApiPropertyOptional({
    description: 'Categoría del producto',
    example: 'Computación',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'La categoría debe ser una cadena de texto' })
  @MaxLength(50, { message: 'La categoría no puede exceder los 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  category?: string;

  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'Laptop de alta gama actualizada con mejores especificaciones',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'SKU del producto (Stock Keeping Unit)',
    example: 'LAP-PRO-15-002',
    minLength: 5,
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'El SKU debe ser una cadena de texto' })
  @MinLength(5, { message: 'El SKU debe tener al menos 5 caracteres' })
  @MaxLength(50, { message: 'El SKU no puede exceder los 50 caracteres' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  sku?: string;
}