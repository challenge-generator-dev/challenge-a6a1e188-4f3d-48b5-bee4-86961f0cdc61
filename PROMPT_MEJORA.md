# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`
- `client` expone http:
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `GET /products`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261106154443210), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de Operaciones CRUD en Bases de Datos SQL y NoSQL
- Tiempo estimado: 6 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación de Operaciones CRUD en Base de Datos SQL — objetivo: Implementar operaciones CRUD en una base de datos SQL para gestionar productos. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos SQL para productos.
- Fase 2: Implementación de Operaciones CRUD en Base de Datos NoSQL — objetivo: Implementar operaciones CRUD en una base de datos NoSQL para gestionar productos. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos NoSQL para productos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Product Inventory API')
    .setDescription('API for managing products in SQL and NoSQL databases')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();

// === ARCHIVO: api/package.json ===
{
  "name": "product-inventory-api",
  "version": "1.0.0",
  "description": "API for managing products in SQL and NoSQL databases",
  "main": "dist/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.577.0",
    "@aws-sdk/lib-dynamodb": "^3.577.0",
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "@prisma/client": "^5.14.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongoose": "^8.4.0",
    "prisma": "^5.14.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.12.7",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-loader": "^9.5.1",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.4.5"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "esModuleInterop": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "paths": {
      "@app/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/domain/entities/product.entity.ts ===
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

// === ARCHIVO: api/domain/repositories/product.repository.ts ===
export interface ProductRepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findByName(name: string): Promise<ProductEntity | null>;
  findBySku(sku: string): Promise<ProductEntity | null>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity>;
  delete(id: string): Promise<void>;
  list(): Promise<ProductEntity[]>;
}

// === ARCHIVO: api/infrastructure/repositories/product-sql.repository.ts ===
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

// === ARCHIVO: api/infrastructure/repositories/product-nosql.repository.ts ===
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

// === ARCHIVO: api/infrastructure/dto/create-product.dto.ts ===
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

// === ARCHIVO: api/infrastructure/dto/update-product.dto.ts ===
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

// === ARCHIVO: api/infrastructure/controllers/product.controller.ts ===
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

// === ARCHIVO: api/infrastructure/config/database.config.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { ConnectOptions } from 'mongoose';

@Injectable()
export class DatabaseConfig implements OnModuleInit, OnModuleDestroy {
  private prismaClient: PrismaClient;
  private readonly sqlConfig: SqlConnectionConfig;
  private readonly nosqlConfig: NosqlConnectionConfig;
  private readonly dynamodbConfig: DynamodbConnectionConfig;

  constructor(private readonly configService: ConfigService) {
    this.sqlConfig = this.buildSqlConfiguration();
    this.nosqlConfig = this.buildNosqlConfiguration();
    this.dynamodbConfig = this.buildDynamodbConfiguration();
  }

  async onModuleInit() {
    await this.initializePrismaClient();
  }

  async onModuleDestroy() {
    await this.disconnectPrismaClient();
  }

  private buildSqlConfiguration(): SqlConnectionConfig {
    const host = this.configService.get<string>('DATABASE_HOST', 'localhost');
    const port = this.configService.get<number>('DATABASE_PORT', 5432);
    const username = this.configService.get<string>('DATABASE_USERNAME', 'postgres');
    const password = this.configService.get<string>('DATABASE_PASSWORD', 'postgres');
    const database = this.configService.get<string>('DATABASE_NAME', 'product_inventory');
    const ssl = this.configService.get<boolean>('DATABASE_SSL', false);

    return {
      host,
      port,
      username,
      password,
      database,
      ssl,
      connectionString: `postgresql://${username}:${password}@${host}:${port}/${database}`,
    };
  }

  private buildNosqlConfiguration(): NosqlConnectionConfig {
    const host = this.configService.get<string>('MONGODB_HOST', 'localhost');
    const port = this.configService.get<number>('MONGODB_PORT', 27017);
    const database = this.configService.get<string>('MONGODB_DATABASE', 'product_inventory');
    const username = this.configService.get<string>('MONGODB_USERNAME', '');
    const password = this.configService.get<string>('MONGODB_PASSWORD', '');

    const hasCredentials = username && password;
    const connectionString = hasCredentials
      ? `mongodb://${username}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`;

    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    return {
      host,
      port,
      database,
      username,
      password,
      connectionString,
      options,
    };
  }

  private buildDynamodbConfiguration(): DynamodbConnectionConfig {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('AWS_DYNAMODB_ENDPOINT', '');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID', '');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY', '');
    const tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'products');

    return {
      region,
      endpoint: endpoint || undefined,
      credentials: accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined,
      tableName,
    };
  }

  private async initializePrismaClient(): Promise<void> {
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: this.sqlConfig.connectionString,
        },
      },
      log: ['query', 'info', 'warn', 'error'],
    });

    try {
      await this.prismaClient.$connect();
      console.log('Conexión a base de datos SQL establecida exitosamente');
    } catch (error) {
      console.error('Error al conectar con la base de datos SQL:', error);
      throw error;
    }
  }

  private async disconnectPrismaClient(): Promise<void> {
    if (this.prismaClient) {
      await this.prismaClient.$disconnect();
      console.log('Conexión a base de datos SQL cerrada');
    }
  }

  getPrismaClient(): PrismaClient {
    if (!this.prismaClient) {
      throw new Error('Prisma client no inicializado. Asegúrate de que onModuleInit fue llamado.');
    }
    return this.prismaClient;
  }

  getSqlConfig(): SqlConnectionConfig {
    return this.sqlConfig;
  }

  getNosqlConfig(): NosqlConnectionConfig {
    return this.nosqlConfig;
  }

  getDynamodbConfig(): DynamodbConnectionConfig {
    return this.dynamodbConfig;
  }
}

interface SqlConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
  connectionString: string;
}

interface NosqlConnectionConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  connectionString: string;
  options: ConnectOptions;
}

interface DynamodbConnectionConfig {
  region: string;
  endpoint?: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  tableName: string;
}

// === ARCHIVO: api/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductSqlRepository } from './infrastructure/repositories/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/product-nosql.repository';
import { DatabaseConfig } from './infrastructure/config/database.config';
import configuration from './infrastructure/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    DatabaseConfig,
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
    {
      provide: 'NOSQL_REPOSITORY',
      useClass: ProductNosqlRepository,
    },
  ],
  exports: [ProductRepository, 'NOSQL_REPOSITORY', DatabaseConfig],
})
export class AppModule {}

// === ARCHIVO: api/application/services/product.service.ts ===
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

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest"
  },
  "dependencies": {
    "axios": "^1.6.8",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.51.3",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^15.0.2",
    "@types/react": "^18.2.79",
    "@types/react-dom": "^18.2.25",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5",
    "vite": "^5.2.0",
    "vitest": "^1.5.0"
  }
}


// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProductService } from './main';
import ProductList from '@/pages/ProductList';
import { ProductForm } from '@/components/ProductForm';

// Componente raíz con manejo de rutas y estado global
const App: React.FC = () => {
  const productService = useProductService();
  const [products, setProducts] = React.useState<ProductEntity[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // Cargar productos al montar el componente
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.listProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos. Intente nuevamente.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productService]);

  // Manejo de operaciones CRUD
  const handleCreate = async (product: CreateProductDto): Promise<void> => {
    try {
      const newProduct = await productService.createProduct(product);
      setProducts([...products, newProduct]);
    } catch (err) {
      setError('Error al crear producto. Verifique los datos.');
      console.error('Error creating product:', err);
    }
  };

  const handleUpdate = async (id: string, updates: UpdateProductDto): Promise<void> => {
    try {
      const updatedProduct = await productService.updateProduct(id, updates);
      setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
    } catch (err) {
      setError('Error al actualizar producto.');
      console.error('Error updating product:', err);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar producto.');
      console.error('Error deleting product:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <Routes>
        <Route
          path="/"
          element={<ProductList products={products} onDelete={handleDelete} />}
        />
        <Route
          path="/new"
          element={<ProductForm onSubmit={handleCreate} />}
        />
        <Route
          path="/edit/:id"
          element={<ProductForm products={products} onSubmit={handleUpdate} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de inventario de tienda en línea - CRUD de productos" />
    <meta name="keywords" content="inventario, productos, CRUD, gestión" />
    <meta name="author" content="Equipo de Desarrollo" />
    <meta name="robots" content="index, follow" />
    <title>Gestión de Inventario - Productos</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/pages/ProductList.tsx ===
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductForm } from '../components/ProductForm';

interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function ProductList() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ProductEntity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<ProductEntity[]>(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      const message = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Error al cargar productos'
        : 'Error desconocido al cargar productos';
      setError(message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (data: CreateProductDto): Promise<void> => {
    try {
      setError(null);
      const response = await axios.post<ProductEntity>(`${API_BASE_URL}/products`, data);
      setProducts(prev => [...prev, response.data]);
      setShowForm(false);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al crear producto'
        : 'Error desconocido al crear producto';
      setError(message);
      throw err;
    }
  };

  const handleUpdate = async (id: string, data: UpdateProductDto): Promise<void> => {
    try {
      setError(null);
      const response = await axios.put<ProductEntity>(`${API_BASE_URL}/products/${id}`, data);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al actualizar producto'
        : 'Error desconocido al actualizar producto';
      setError(message);
      throw err;
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al eliminar producto'
        : 'Error desconocido al eliminar producto';
      setError(message);
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (product: ProductEntity): void => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = (): void => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmitForm = async (data: CreateProductDto | UpdateProductDto): Promise<void> => {
    if (editingProduct) {
      await handleUpdate(editingProduct.id, data as UpdateProductDto);
    } else {
      await handleCreate(data as CreateProductDto);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Inventario</h1>
        <p className="text-gray-600">Administra los productos de tu tienda en línea</p>
      </header>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Editar Producto' : 'Crear Producto'}
          </h2>
          <ProductForm
            initialData={editingProduct || undefined}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No hay productos registrados. ¡Crea el primero!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${product.stock < 10 ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>
                      {product.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                    >
                      Editar
                    </button>
                    {deleteConfirm === product.id ? (
                      <span className="inline-flex items-center">
                        <span className="text-red-600 mr-2">¿Confirmar?</span>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-800 mr-2 font-semibold"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          No
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total de productos: {products.length}
      </div>
    </div>
  );
}

// === ARCHIVO: client/src/components/ProductForm.tsx ===
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface ProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
}

interface ProductFormProps {
  product?: ProductEntity;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

export function ProductForm({ product, onSuccess, onError }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    defaultValues: product ? {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
    } : undefined,
  });

  const validateForm = (data: CreateProductDto): string | null => {
    if (!data.name || data.name.trim().length === 0) {
      return 'El nombre es obligatorio';
    }
    if (data.name.length > 100) {
      return 'El nombre no puede exceder 100 caracteres';
    }
    if (data.price === undefined || data.price === null) {
      return 'El precio es obligatorio';
    }
    if (data.price < 0) {
      return 'El precio no puede ser negativo';
    }
    if (data.stock === undefined || data.stock === null) {
      return 'El stock es obligatorio';
    }
    if (data.stock < 0) {
      return 'El stock no puede ser negativo';
    }
    if (!data.category || data.category.trim().length === 0) {
      return 'La categoría es obligatoria';
    }
    return null;
  };

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    const validationError = validateForm(data);
    if (validationError) {
      onError?.(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && product) {
        await axios.put<UpdateProductDto, { data: ProductEntity }>(
          `${API_BASE_URL}/products/${product.id}`,
          data
        );
      } else {
        await axios.post<CreateProductDto, { data: ProductEntity }>(
          `${API_BASE_URL}/products`,
          data
        );
      }
      reset();
      onSuccess?.();
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Error al guardar el producto'
        : 'Error al guardar el producto';
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Editar Producto' : 'Crear Producto'}
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register('name', {
            required: 'El nombre es obligatorio',
            maxLength: { value: 100, message: 'Máximo 100 caracteres' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Precio
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'El precio es obligatorio',
            min: { value: 0, message: 'El precio no puede ser negativo' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          {...register('stock', {
            required: 'El stock es obligatorio',
            min: { value: 0, message: 'El stock no puede ser negativo' },
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <input
          id="category"
          type="text"
          {...register('category', {
            required: 'La categoría es obligatoria',
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
