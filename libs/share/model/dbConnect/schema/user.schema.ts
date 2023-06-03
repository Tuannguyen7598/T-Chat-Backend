import { SchemaFactory } from "@nestjs/mongoose";
import { UserDto } from "../../type/user.interface";


export const UserSchema = SchemaFactory.createForClass(UserDto);
