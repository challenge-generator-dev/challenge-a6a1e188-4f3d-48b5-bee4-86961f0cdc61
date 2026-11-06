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