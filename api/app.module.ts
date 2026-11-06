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