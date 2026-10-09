"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor() {
        this.logger = new common_1.Logger(DatabaseService_1.name);
    }
    async onModuleInit() {
        const projectUrl = process.env.SUPABASE_URL;
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!projectUrl || !serviceRoleKey) {
            this.logger.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables.');
            throw new Error('Missing Supabase configuration.');
        }
        this.logger.log(`Connecting to Supabase: ${projectUrl}`);
        this.supabase = (0, supabase_js_1.createClient)(projectUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
        try {
            const { error } = await this.supabase.from('inquiries').select('id').limit(1);
            if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
                this.logger.warn(`Supabase connection check warning: ${error.message}`);
            }
            else {
                this.logger.log('Successfully connected to Supabase.');
            }
        }
        catch (err) {
            this.logger.warn(`Could not verify Supabase connection: ${err.message}`);
        }
    }
    getClient() {
        return this.supabase;
    }
    async checkHealth() {
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
        }
        catch (e) {
            return {
                status: 'DOWN',
                database: process.env.SUPABASE_URL || 'supabase',
                timestamp: new Date().toISOString(),
            };
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map