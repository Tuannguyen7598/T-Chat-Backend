import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';



import { UserSettingAccountDto } from './dto/user.SettingAccount';
import { Auth, KeyToCommunicateUserServer, ResultToApiGateWay, UserActonTypeAccount, UserDto } from 'libs/share/model';



@Controller('login')
@ApiTags('login')
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject('REDIS_SERVICE') private Redis: ClientProxy,
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) { }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Register succesfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async createUser(@Body() user: UserDto): Promise<any> {
    const resul: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.register, user))
    if (resul.message === UserActonTypeAccount.registerFalse) {
      return resul.message;
    }
    const userRegister = {
      token: this.jwtService.sign(resul.payload),
      ...resul.payload
    }
    return userRegister
  }


  @Post('login')
  @ApiResponse({ status: 200, description: 'Logged In' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async getUser(@Body() user: UserDto): Promise<any> {
    const resul: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.login, user))
    if (resul.message === UserActonTypeAccount.loginFalse) {
      return resul.message;
    }
    const userLogin = {
      token: this.jwtService.sign(resul.payload),
      ...resul.payload
    }
    return userLogin
  }

  @Auth('admin', 'user')
  @Put('setting-account/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Logged In' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async settingAcount(@Param('id') id: string, @Body() user: UserSettingAccountDto): Promise<any> {
    const userSettingAccount = {
      ...user,
      id: id
    }
    const resul: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.settingAccount, userSettingAccount))

    if (UserActonTypeAccount.settingAccountFalse) {
      return resul.message;
    }
    const userResult = {
      token: this.jwtService.sign(resul.payload),
      ...resul.payload
    }
    return userResult
  }
}