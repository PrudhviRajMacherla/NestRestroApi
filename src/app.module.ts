import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:['.env'],
      cache:true,//it will help in loading it multiple times
      expandVariables:true,  // we can use variables with ${VARIBALBE_NAME} inside env files also
      isGlobal:true,// with this there is no requirement of importing configModule
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
