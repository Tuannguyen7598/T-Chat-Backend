import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'REDIS_SERVICE',
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      }
    },
  ]),
  JwtModule.register({
    secret: "tuan",
    signOptions: {
      expiresIn: 7 * 60 * 60 * 60,
    },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
