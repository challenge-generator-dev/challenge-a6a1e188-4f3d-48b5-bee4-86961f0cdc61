import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from '../../application/services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo producto en el inventario' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o violación de restricciones' })
  @ApiResponse({ status: 409, description: 'Conflicto: nombre o SKU duplicado' })
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su identificador único' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: ProductEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'id', description: 'Identificador único del producto (UUID)', type: String })
  async getProduct(@Param('id', ParseUUIDPipe) id: string): Promise<ProductEntity | null> {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un producto existente' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductEntity })
  @ApiResponse({ status: 400, description: 'Datos de actualización inválidos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Conflicto: nombre o SKU duplicado' })
  @ApiParam({ name: 'id', description: 'Identificador único del producto (UUID)', type: String })
  @ApiBody({ type: UpdateProductDto })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto del inventario' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiParam({ name: 'id', description: 'Identificador único del producto (UUID)', type: String })
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos del inventario' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ProductEntity] })
  async listProducts(): Promise<ProductEntity[]> {
    return this.productService.listProducts();
  }
}