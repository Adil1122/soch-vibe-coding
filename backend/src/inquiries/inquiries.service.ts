import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

export interface Inquiry {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  email: string;
  active_whatsapp_number: string;
  phone?: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
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
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateInquiryDto) {
    const firstName = (dto.first_name || dto.firstName || '').trim();
    const lastName = (dto.last_name || dto.lastName || '').trim();
    const cnic = (dto.cnic || '').trim();
    const email = (dto.email || '').trim();
    const whatsapp = (dto.active_whatsapp_number || dto.whatsapp || '').trim();
    const emergencyName = (dto.emergency_contact_name || dto.emergencyContactName || '').trim() || null;
    const emergencyPhone = (dto.emergency_contact_phone || dto.emergencyContactPhone || '').trim() || null;
    const academicStatus = (dto.academic_status || dto.academicStatus || '').trim() || null;
    const programmingBackground = (dto.programming_background || dto.programmingBackground || '').trim() || null;
    const referralCode = (dto.referral_code || dto.referralCode || '').trim() || null;
    const message = (dto.message || '').trim() || null;
    const paymentStatus = dto.payment_status === 'Paid' ? 'Paid' : 'Unpaid';

    if (!firstName || !lastName || !cnic || !email || !whatsapp) {
      throw new BadRequestException('First Name, Last Name, CNIC, Email, and WhatsApp Number are required.');
    }

    const insertSql = `
      INSERT INTO inquiries (
        first_name,
        last_name,
        cnic,
        email,
        active_whatsapp_number,
        phone,
        emergency_contact_name,
        emergency_contact_phone,
        academic_status,
        programming_background,
        referral_code,
        message,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result: any = await this.db.query(insertSql, [
      firstName,
      lastName,
      cnic,
      email,
      whatsapp,
      whatsapp, // also sets legacy phone column to match whatsapp
      emergencyName,
      emergencyPhone,
      academicStatus,
      programmingBackground,
      referralCode,
      message,
      paymentStatus,
    ]);

    const insertedId = result.insertId;
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
        emergencyContactName: emergencyName,
        emergencyContactPhone: emergencyPhone,
        academicStatus,
        programmingBackground,
        referralCode,
        message,
        paymentStatus,
      },
    };
  }

  async findAll(query?: { search?: string; status?: string }): Promise<Inquiry[]> {
    let sql = 'SELECT * FROM inquiries';
    const conditions: string[] = [];
    const params: any[] = [];

    if (query?.status && ['Paid', 'Unpaid'].includes(query.status)) {
      conditions.push('payment_status = ?');
      params.push(query.status);
    }

    if (query?.search && query.search.trim()) {
      const searchTerm = `%${query.search.trim()}%`;
      conditions.push(`(
        first_name LIKE ? OR 
        last_name LIKE ? OR 
        email LIKE ? OR 
        cnic LIKE ? OR 
        active_whatsapp_number LIKE ? OR 
        referral_code LIKE ?
      )`);
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    return this.db.query<Inquiry[]>(sql, params);
  }

  async findOne(id: number): Promise<Inquiry> {
    const rows = await this.db.query<Inquiry[]>('SELECT * FROM inquiries WHERE id = ?', [id]);
    if (!rows || rows.length === 0) {
      throw new NotFoundException(`Inquiry with ID ${id} not found.`);
    }
    return rows[0];
  }

  async updatePaymentStatus(id: number, status: 'Paid' | 'Unpaid') {
    if (!['Paid', 'Unpaid'].includes(status)) {
      throw new BadRequestException('Payment status must be either Paid or Unpaid.');
    }

    // Verify exists
    await this.findOne(id);

    const updateSql = 'UPDATE inquiries SET payment_status = ?, updated_at = NOW() WHERE id = ?';
    await this.db.query(updateSql, [status, id]);

    const updated = await this.findOne(id);
    return {
      success: true,
      message: `Inquiry #${id} payment status updated to ${status}.`,
      data: updated,
    };
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.db.query('DELETE FROM inquiries WHERE id = ?', [id]);
    return {
      success: true,
      message: `Inquiry #${id} deleted successfully.`,
    };
  }

  async getStats() {
    const totalRow = await this.db.query<any[]>('SELECT COUNT(*) as total FROM inquiries');
    const paidRow = await this.db.query<any[]>("SELECT COUNT(*) as paid FROM inquiries WHERE payment_status = 'Paid'");
    const unpaidRow = await this.db.query<any[]>("SELECT COUNT(*) as unpaid FROM inquiries WHERE payment_status = 'Unpaid'");

    const total = totalRow[0]?.total || 0;
    const paid = paidRow[0]?.paid || 0;
    const unpaid = unpaidRow[0]?.unpaid || 0;

    return {
      total,
      paid,
      unpaid,
      paidPercentage: total > 0 ? Math.round((paid / total) * 100) : 0,
    };
  }
}
