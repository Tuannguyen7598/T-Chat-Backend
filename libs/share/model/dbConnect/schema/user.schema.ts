import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import { Friend, UserDto } from "../../type/user.interface";

export type UserDocument = HydratedDocument<UserDto>;

export const UserSchema = SchemaFactory.createForClass(UserDto);
export const FriendSchema = SchemaFactory.createForClass(Friend);