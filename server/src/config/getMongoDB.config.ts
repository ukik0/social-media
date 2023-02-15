import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const getMongoDBConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
    uri: configService.get('MONGO_URL')
})