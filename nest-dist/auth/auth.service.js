"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    constructor() {
        this.defaultAdminUser = process.env.ADMIN_USER || 'admin';
        this.defaultAdminPass = process.env.ADMIN_PASS || 'admin123';
        this.secretKey = process.env.JWT_SECRET || 'soch_vibe_coding_secret_key_2026';
    }
    login(username, password) {
        if (!username || !password) {
            throw new common_1.UnauthorizedException('Username and password are required.');
        }
        const cleanUser = username.trim();
        const cleanPass = password.trim();
        if ((cleanUser.toLowerCase() === this.defaultAdminUser.toLowerCase() ||
            cleanUser.toLowerCase() === 'admin@soch.pk' ||
            cleanUser.toLowerCase() === 'admin@vibeacademy.info') &&
            cleanPass === this.defaultAdminPass) {
            const payload = {
                username: cleanUser,
                role: 'admin',
                issuedAt: Date.now(),
            };
            const token = this.generateToken(payload);
            return {
                success: true,
                token,
                user: {
                    username: cleanUser,
                    role: 'admin',
                    displayName: 'SOCH Administrator',
                },
            };
        }
        throw new common_1.UnauthorizedException('Invalid admin credentials.');
    }
    generateToken(payload) {
        const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
        const signature = crypto
            .createHmac('sha256', this.secretKey)
            .update(data)
            .digest('base64url');
        return `${data}.${signature}`;
    }
    verifyToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 2)
                return null;
            const [data, signature] = parts;
            const expectedSig = crypto
                .createHmac('sha256', this.secretKey)
                .update(data)
                .digest('base64url');
            if (signature !== expectedSig)
                return null;
            const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
            return payload;
        }
        catch {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map