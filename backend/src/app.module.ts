import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    InquiriesModule,
  ],
})
export class AppModule {}
