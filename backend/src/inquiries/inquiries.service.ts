import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { SupabaseClient } from '@supabase/supabase-js';

export interface Inquiry {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  email: string;
  active_whatsapp_number: string;
  phone?: string;
  guardian_name: string | null;
  guardian_number: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  selected_timing: string | null;
  academic_status: string | null;
  programming_background: string | null;
  referral_code: string | null;
  message: string | null;
  payment_status: 'Paid' | 'Unpaid';
  created_at: string;
  updated_at: string | null;
}

@Injectable()
export class InquiriesService {
  private db: SupabaseClient;

  constructor(private readonly databaseService: DatabaseService) {}

  private getDb(): SupabaseClient {
    if (!this.db) {
      this.db = this.databaseService.getClient();
    }
    return this.db;
  }

  async create(dto: CreateInquiryDto) {
    const firstName = (dto.first_name || dto.firstName || '').trim();
    const lastName = (dto.last_name || dto.lastName || '').trim();
    const cnic = (dto.cnic || '').trim();
    const email = (dto.email || '').trim();
    const whatsapp = (dto.active_whatsapp_number || dto.whatsapp || '').trim();
    const guardianName = (dto.guardian_name || dto.guardianName || dto.emergency_contact_name || dto.emergencyContactName || '').trim() || null;
    const guardianNumber = (dto.guardian_number || dto.guardianNumber || dto.emergency_contact_phone || dto.emergencyContactPhone || '').trim() || null;
    const selectedTiming = (dto.selected_timing || dto.selectedTiming || dto.timing || '').trim() || null;
    const academicStatus = (dto.academic_status || dto.academicStatus || '').trim() || null;
    const programmingBackground = (dto.programming_background || dto.programmingBackground || '').trim() || null;
    const referralCode = (dto.referral_code || dto.referralCode || '').trim() || null;
    const message = (dto.message || '').trim() || null;
    const paymentStatus = dto.payment_status === 'Paid' ? 'Paid' : 'Unpaid';

    if (!firstName || !lastName || !cnic || !email || !whatsapp) {
      throw new BadRequestException('First Name, Last Name, CNIC, Email, and WhatsApp Number are required.');
    }

    const { data, error } = await this.getDb()
      .from('inquiries')
      .insert({
        first_name: firstName,
        last_name: lastName,
        cnic,
        email,
        active_whatsapp_number: whatsapp,
        phone: whatsapp,
        guardian_name: guardianName,
        guardian_number: guardianNumber,
        emergency_contact_name: guardianName,
        emergency_contact_phone: guardianNumber,
        selected_timing: selectedTiming,
        academic_status: academicStatus,
        programming_background: programmingBackground,
        referral_code: referralCode,
        message,
        payment_status: paymentStatus,
      })
      .select('id')
      .single();

    if (error) {
      throw new BadRequestException(`Failed to create inquiry: ${error.message}`);
    }

    const insertedId = data.id;
    const referenceId = `VB-02-${String(insertedId).padStart(6, '0')}`;

    return {
      success: true,
      message: 'Cohort 02 application submitted successfully.',
      inquiryId: insertedId,
      referenceId,
      data: {
        id: insertedId,
        firstName,
        lastName,
        cnic,
        email,
        whatsapp,
        guardianName,
        guardianNumber,
        emergencyContactName: guardianName,
        emergencyContactPhone: guardianNumber,
        selectedTiming,
        academicStatus,
        programmingBackground,
        referralCode,
        message,
        paymentStatus,
      },
    };
  }

  async findAll(query?: { search?: string; status?: string }): Promise<Inquiry[]> {
    let qb = this.getDb().from('inquiries').select('*');

    if (query?.status && ['Paid', 'Unpaid'].includes(query.status)) {
      qb = qb.eq('payment_status', query.status);
    }

    if (query?.search && query.search.trim()) {
      const searchTerm = query.search.trim();
      qb = qb.or(
        `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,cnic.ilike.%${searchTerm}%,active_whatsapp_number.ilike.%${searchTerm}%,guardian_name.ilike.%${searchTerm}%,guardian_number.ilike.%${searchTerm}%,selected_timing.ilike.%${searchTerm}%,referral_code.ilike.%${searchTerm}%`,
      );
    }

    qb = qb.order('created_at', { ascending: false });

    const { data, error } = await qb;
    if (error) {
      throw new BadRequestException(`Failed to fetch inquiries: ${error.message}`);
    }
    return (data || []) as Inquiry[];
  }

  async findOne(id: number): Promise<Inquiry> {
    const { data, error } = await this.getDb()
      .from('inquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Inquiry with ID ${id} not found.`);
    }
    return data as Inquiry;
  }

  async updatePaymentStatus(id: number, status: 'Paid' | 'Unpaid') {
    if (!['Paid', 'Unpaid'].includes(status)) {
      throw new BadRequestException('Payment status must be either Paid or Unpaid.');
    }

    // Verify exists
    await this.findOne(id);

    const { error } = await this.getDb()
      .from('inquiries')
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new BadRequestException(`Failed to update payment status: ${error.message}`);
    }

    const updated = await this.findOne(id);
    return {
      success: true,
      message: `Inquiry #${id} payment status updated to ${status}.`,
      data: updated,
    };
  }

  async delete(id: number) {
    await this.findOne(id);

    const { error } = await this.getDb()
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BadRequestException(`Failed to delete inquiry: ${error.message}`);
    }

    return {
      success: true,
      message: `Inquiry #${id} deleted successfully.`,
    };
  }

  async getStats() {
    const { count: total, error: e1 } = await this.getDb()
      .from('inquiries')
      .select('*', { count: 'exact', head: true });

    const { count: paid, error: e2 } = await this.getDb()
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'Paid');

    const { count: unpaid, error: e3 } = await this.getDb()
      .from('inquiries')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'Unpaid');

    if (e1 || e2 || e3) {
      throw new BadRequestException('Failed to fetch stats.');
    }

    const totalCount = total || 0;
    const paidCount = paid || 0;
    const unpaidCount = unpaid || 0;

    return {
      total: totalCount,
      paid: paidCount,
      unpaid: unpaidCount,
      paidPercentage: totalCount > 0 ? Math.round((paidCount / totalCount) * 100) : 0,
    };
  }
}

