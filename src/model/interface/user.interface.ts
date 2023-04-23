
import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { v4 as uuid } from "uuid";

export enum UserRole {
      admin = "admin",
      user = "user",
}

export class Credentials {
      password = '';
      salt = '';
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
      @Prop({ required: true, type: 'string', default: uuid() })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      id = uuid()

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @IsString()
      username = ""

      @Prop({ type: () => Credentials })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      credentials = Credentials.createObj()

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @IsString()
      role = UserRole.user;

      @Prop({ required: true, type: 'Date', default: new Date() })
      @IsNotEmpty()
      @IsDate()
      createAt = new Date()

      @Prop({ required: true, type: 'Date', default: new Date() })
      @IsNotEmpty()
      @IsDate()
      deleteAt = new Date()

      @Prop({ required: true, type: 'Date', default: new Date() })
      @IsNotEmpty()
      @IsDate()
      updateAt = new Date()

      static createObj = (src?: Partial<UserDto>): UserDto => {
            const obj = new UserDto();
            return {
                  ...obj,
                  ...src,
            };
      };
}

