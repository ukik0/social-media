import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoDBConfig } from './config/getMongoDB.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { MediaModule } from './media/media.module';


@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoDBConfig
        }),
        ConfigModule.forRoot(),
        PostsModule,
        UsersModule,
        AuthModule,
        LikesModule,
        CommentsModule,
        MediaModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
