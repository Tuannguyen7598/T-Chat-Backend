import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Query, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import bizSdk from 'facebook-nodejs-business-sdk';
import { async, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';



import { Auth, KeyToCommunicateUserServer, ResultToApiGateWay, UserActonTypeAccount, UserDto } from 'libs/share/model';
import { UserSettingAccountDto } from './dto/user.SettingAccount';
import { FacebookAdsApi } from 'facebook-nodejs-business-sdk';
import { AdAccount } from 'facebook-nodejs-business-sdk';
import { Request } from 'express';
import { AddFriendDto } from './dto/userLogin.dto';



@Controller('')
@ApiTags('login')
@ApiBearerAuth()
export class AuthController {
  constructor(
    @Inject('REDIS_SERVICE') private Redis: ClientProxy,
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) { }
  


  @Get('')
  async tesst2() {
    console.log('heloo');

  }

  @Post('register')
  @ApiResponse({ status: 200, description: 'Register succesfully' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async createUser(@Body() user: UserDto): Promise<any> {
    const result: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.register, user))
    if (result.message === UserActonTypeAccount.registerFalse) {
      return result.message;
    }
    const userRegister = {
      token: this.jwtService.sign(result.payload),
      ...result.payload
    }
    return userRegister
  }


  @Post('login')
  @ApiResponse({ status: 200, description: 'Logged In' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async getUser(@Body() user: UserDto): Promise<any> {
   
    
    const result: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.login, user))
    
    if (result.message === UserActonTypeAccount.loginFalse) {
      return result.message;
    }
    const userLogin = {
      token: this.jwtService.sign(result.payload),
      ...result.payload
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
    const result: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.settingAccount, userSettingAccount))

    if (result.message === UserActonTypeAccount.settingAccountFalse) {
      return result.message;
    }
    const userResult = {
      token: this.jwtService.sign(result.payload),
      ...result.payload
    }
    return userResult
  }

  @Auth('admin', 'user')
  @Delete('delete-account/:id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Logged In' })
  @ApiBadRequestResponse({ status: 400, description: 'Validation Error' })
  async deleteAcount(@Param('id') userId: string): Promise<any> {
    const result: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.deleteAccount, userId))
    return result.message
  }



  @Auth('admin', 'user')
  @Get('get-user')
  async  getUsers(): Promise<any> {
    const result: ResultToApiGateWay<UserDto> = await firstValueFrom(this.Redis.send(KeyToCommunicateUserServer.getUser,''))
    if (result.message === UserActonTypeAccount.getUserFalse) {
      return result.message
    }
   
    
    return Object.values(result.payload)
  }

  
}