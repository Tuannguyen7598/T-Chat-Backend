
import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform, plainToClass } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
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
      @IsNotEmpty()
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
      @Prop({ required: true, type: 'string', default: uuid() })
      @IsOptional()
      @ApiProperty({ required: true })
      id: string = uuid()

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @IsString()
      username: string = ""

      @Prop({ type: () => Credentials })
      @ApiProperty({ required: true })
      @IsNotEmpty()
      @ValidateNested()
      credentials: Credentials // ??????

      @Prop({ required: true, type: 'string' })
      @ApiProperty({ required: true, enum: ['admin | user'] })
      @IsNotEmpty()
      @IsEnum({ a: 'user', b: 'admin' })
      role: UserRole = UserRole.user;

      @Prop({ required: true, type: 'Date', default: new Date() })
      @IsNotEmpty()
      createAt: Date = new Date()

      @Prop({ required: true, type: 'Date', default: new Date() })
      @IsNotEmpty()
      @ApiProperty()
      deleteAt: Date = new Date()

      @Prop({ required: true, type: 'Date', default: new Date() })
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

