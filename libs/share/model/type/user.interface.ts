
import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { v4 as uuid } from "uuid";
export enum UserRole {
      admin = "admin",
      user = "user",
}

export class Credentials {
      @ApiProperty({ required: true })
      @IsNotEmpty()
      password: string

      @ApiProperty({ required: true })
      @IsOptional()
      salt: string
      static createObj = (src?: Partial<Credentials>): Credentials => {
            const obj = new Credentials();
            return {
                  ...obj,
                  ...src,
            };
      };
};
@Schema()
export class UserDto {
      @Prop({ type: 'string', default: uuid(), required: true, })
      @IsOptional()
      @ApiProperty({ required: true })
      id: string = uuid()

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @IsString()
      username: string = ""

      @Prop({ required: true, type: () => Credentials })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @ValidateNested()
      credentials: Credentials

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true, enum: ['admin | user'] })
      @IsNotEmpty()
      @IsEnum({ a: 'user', b: 'admin' })
      role: UserRole = UserRole.user;

      @Prop({ type: 'Date', default: new Date(), required: true, })
      @IsOptional()
      @ApiProperty()
      createAt: Date = new Date()

      @Prop({ type: 'Date', default: new Date(), required: true, })
      @IsOptional()
      @ApiProperty()
      deleteAt: Date = new Date()

      @Prop({ type: 'Date', default: new Date(), required: true, })
      @IsOptional()
      @IsNotEmpty()
      @ApiProperty()
      updateAt: Date = new Date()


      static createObj = (src?: Partial<UserDto>): UserDto => {
            const obj = new UserDto();
            return {
                  ...obj,
                  ...src,
            };
      };
}

@Schema()
export class Friend {
      @Prop({ type: 'string', default: uuid(), required: true, })
      id: string

      @Prop({ type: 'string', required: true })
      userId: string

      @Prop({ type: 'Array', required: true })
      listFriend: Array<UserDto>
}


export enum UserActonTypeAccount {
      loginSuccess = "Login Success",
      loginFalse = "Login False",
      registerSuccess = "Register Succsess",
      registerFalse = "Register False",
      settingAccountFalse = "Setting Account False",
      settingAccountSuccess = "Setting Account Success",
      deleteAccountFalse = "Delete Acconnt False",
      deleteAccountSuccess = "Delete Account Success"
}
export enum KeyToCommunicateUserServer {
      login = "Login",
      register = "Register",
      settingAccount = "Setting Account",
      deleteAccount = "Delete Accont",
      getFriends = "Get-Friends"
}