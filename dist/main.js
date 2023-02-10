"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const process = require("process");
async function bootstrap() {
    const PORT = process.env.PORT || 4000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.disable('x-powered-by');
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: false,
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 99,
    }));
    app.enableCors({
        allowedHeaders: "*",
        origin: "*",
        methods: 'GET, POST,HEAD,PATCH,',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Clone CRM')
        .setDescription('REST API for Vue.js')
        .setVersion('1.0')
        .addTag('REST API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => console.log(`Server run on PORT = ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map