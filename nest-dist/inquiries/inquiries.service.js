"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let InquiriesService = class InquiriesService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    getDb() {
        if (!this.db) {
            this.db = this.databaseService.getClient();
        }
        return this.db;
    }
    async create(dto) {
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
            throw new common_1.BadRequestException('First Name, Last Name, CNIC, Email, and WhatsApp Number are required.');
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
            emergency_contact_name: emergencyName,
            emergency_contact_phone: emergencyPhone,
            academic_status: academicStatus,
            programming_background: programmingBackground,
            referral_code: referralCode,
            message,
            payment_status: paymentStatus,
        })
            .select('id')
            .single();
        if (error) {
            throw new common_1.BadRequestException(`Failed to create inquiry: ${error.message}`);
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
    async findAll(query) {
        let qb = this.getDb().from('inquiries').select('*');
        if (query?.status && ['Paid', 'Unpaid'].includes(query.status)) {
            qb = qb.eq('payment_status', query.status);
        }
        if (query?.search && query.search.trim()) {
            const searchTerm = query.search.trim();
            qb = qb.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,cnic.ilike.%${searchTerm}%,active_whatsapp_number.ilike.%${searchTerm}%,referral_code.ilike.%${searchTerm}%`);
        }
        qb = qb.order('created_at', { ascending: false });
        const { data, error } = await qb;
        if (error) {
            throw new common_1.BadRequestException(`Failed to fetch inquiries: ${error.message}`);
        }
        return (data || []);
    }
    async findOne(id) {
        const { data, error } = await this.getDb()
            .from('inquiries')
            .select('*')
            .eq('id', id)
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException(`Inquiry with ID ${id} not found.`);
        }
        return data;
    }
    async updatePaymentStatus(id, status) {
        if (!['Paid', 'Unpaid'].includes(status)) {
            throw new common_1.BadRequestException('Payment status must be either Paid or Unpaid.');
        }
        await this.findOne(id);
        const { error } = await this.getDb()
            .from('inquiries')
            .update({ payment_status: status, updated_at: new Date().toISOString() })
            .eq('id', id);
        if (error) {
            throw new common_1.BadRequestException(`Failed to update payment status: ${error.message}`);
        }
        const updated = await this.findOne(id);
        return {
            success: true,
            message: `Inquiry #${id} payment status updated to ${status}.`,
            data: updated,
        };
    }
    async delete(id) {
        await this.findOne(id);
        const { error } = await this.getDb()
            .from('inquiries')
            .delete()
            .eq('id', id);
        if (error) {
            throw new common_1.BadRequestException(`Failed to delete inquiry: ${error.message}`);
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
            throw new common_1.BadRequestException('Failed to fetch stats.');
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
};
exports.InquiriesService = InquiriesService;
exports.InquiriesService = InquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InquiriesService);
//# sourceMappingURL=inquiries.service.js.map