import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { AdminAuthGuard } from '../auth/auth.guard';
import { DatabaseService } from '../database/database.service';

@Controller('api/inquiries')
export class InquiriesController {
  constructor(
    private readonly inquiriesService: InquiriesService,
    private readonly db: DatabaseService,
  ) {}

  /**
   * Health check endpoint for database & serverless runtime
   */
  @Get('health')
  async health() {
    return this.db.checkHealth();
  }

  /**
   * Public endpoint: User clicks "Apply for Cohort 02" and submits the application form.
   * Data is inserted into `inquiries` table in Supabase.
   */
  @Post()
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiriesService.create(createInquiryDto);
  }

  /**
   * Admin endpoint: Retrieve analytics & aggregate status counts
   */
  @UseGuards(AdminAuthGuard)
  @Get('stats')
  async getStats() {
    return this.inquiriesService.getStats();
  }

  /**
   * Admin endpoint: Get all inquiries with optional search and status filtering
   */
  @UseGuards(AdminAuthGuard)
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.inquiriesService.findAll({ search, status });
    return {
      success: true,
      total: data.length,
      data,
    };
  }

  /**
   * Admin endpoint: Get single inquiry by ID
   */
  @UseGuards(AdminAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.inquiriesService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  /**
   * Admin endpoint: Move payment status to Paid or Unpaid
   */
  @UseGuards(AdminAuthGuard)
  @Patch(':id/payment-status')
  async updatePaymentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePaymentStatusDto,
  ) {
    return this.inquiriesService.updatePaymentStatus(id, body.payment_status);
  }

  /**
   * Admin endpoint: Delete an inquiry
   */
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.inquiriesService.delete(id);
  }
}
