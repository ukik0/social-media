import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoDBConfig } from './config/getMongoDB.config';
import { PostsModule } from './posts/posts.module';


@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoDBConfig
        }),
        ConfigModule.forRoot(),
        PostsModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
