import {DocumentBuilder} from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Social-Media')
    .setDescription('Social-Media Api')
    .addTag('Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


