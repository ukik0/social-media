import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {SwaggerModule} from "@nestjs/swagger";
import {config} from "./swagger/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({credentials: true, origin: 'http://localhost:3000'});
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/swagger', app, document, {
        swaggerOptions: {
            persistAuthorization: true
        }
    });

    await app.listen(8001);
}
bootstrap();
