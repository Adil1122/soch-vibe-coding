export class CreateInquiryDto {
  first_name?: string;
  firstName?: string;
  last_name?: string;
  lastName?: string;
  cnic?: string;
  email?: string;
  active_whatsapp_number?: string;
  whatsapp?: string;
  emergency_contact_name?: string;
  emergencyContactName?: string;
  emergency_contact_phone?: string;
  emergencyContactPhone?: string;
  academic_status?: string;
  academicStatus?: string;
  programming_background?: string;
  programmingBackground?: string;
  referral_code?: string;
  referralCode?: string;
  message?: string;
  payment_status?: 'Paid' | 'Unpaid';
}
