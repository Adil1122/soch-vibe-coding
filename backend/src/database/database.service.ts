import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: mysql.Pool;

  async onModuleInit() {
    const host = process.env.DB_HOST || '127.0.0.1';
    const port = Number(process.env.DB_PORT) || 3306;
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'vibe_coding_db';

    this.logger.log(`Connecting to MySQL database: ${database} on ${host}:${port} as ${user}...`);

    this.pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    try {
      const connection = await this.pool.getConnection();
      this.logger.log('Successfully connected to MySQL database.');
      connection.release();

      await this.ensureTableSchema();
    } catch (err: any) {
      this.logger.error(`Database connection failed: ${err.message}`, err.stack);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log('Database pool destroyed.');
    }
  }

  private async ensureTableSchema() {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        cnic VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        active_whatsapp_number VARCHAR(50) NOT NULL,
        emergency_contact_name VARCHAR(255) NULL,
        emergency_contact_phone VARCHAR(50) NULL,
        academic_status VARCHAR(255) NULL,
        programming_background VARCHAR(255) NULL,
        referral_code VARCHAR(100) NULL,
        message TEXT NULL,
        payment_status ENUM('Paid', 'Unpaid') NOT NULL DEFAULT 'Unpaid',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    try {
      await this.pool.query(createTableSql);
      this.logger.log('Ensured inquiries table exists in database.');
    } catch (err: any) {
      this.logger.warn(`Could not verify table schema: ${err.message}`);
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T> {
    const [results] = await this.pool.query(sql, params);
    return results as T;
  }

  async checkHealth(): Promise<{ status: string; database: string; timestamp: string }> {
    try {
      await this.pool.query('SELECT 1');
      return {
        status: 'UP',
        database: process.env.DB_NAME || 'vibe_coding_db',
        timestamp: new Date().toISOString(),
      };
    } catch (e: any) {
      return {
        status: 'DOWN',
        database: process.env.DB_NAME || 'vibe_coding_db',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
