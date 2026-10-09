import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  private supabase: SupabaseClient;

  async onModuleInit() {
    const projectUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!projectUrl || !serviceRoleKey) {
      this.logger.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables.');
      throw new Error('Missing Supabase configuration.');
    }

    this.logger.log(`Connecting to Supabase: ${projectUrl}`);

    this.supabase = createClient(projectUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify connection
    try {
      const { error } = await this.supabase.from('inquiries').select('id').limit(1);
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        this.logger.warn(`Supabase connection check warning: ${error.message}`);
      } else {
        this.logger.log('Successfully connected to Supabase.');
      }
    } catch (err: any) {
      this.logger.warn(`Could not verify Supabase connection: ${err.message}`);
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async checkHealth(): Promise<{ status: string; database: string; timestamp: string }> {
    try {
      const { error } = await this.supabase.from('inquiries').select('id').limit(1);
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        throw new Error(error.message);
      }
      return {
        status: 'UP',
        database: process.env.SUPABASE_URL || 'supabase',
        timestamp: new Date().toISOString(),
      };
    } catch (e: any) {
      return {
        status: 'DOWN',
        database: process.env.SUPABASE_URL || 'supabase',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
