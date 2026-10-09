"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("reflect-metadata");
const serverless_express_1 = require("@codegenie/serverless-express");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
let cachedHandler;
async function bootstrapServer() {
    const expressApp = (0, express_1.default)();
    const adapter = new platform_express_1.ExpressAdapter(expressApp);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await app.init();
    return (0, serverless_express_1.configure)({ app: expressApp });
}
const handler = async (event, context, callback) => {
    if (!cachedHandler) {
        cachedHandler = await bootstrapServer();
    }
    return cachedHandler(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map