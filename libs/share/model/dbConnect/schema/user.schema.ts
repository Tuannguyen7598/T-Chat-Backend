import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import {  UserDto } from "../../type/user.interface";
import { Friend } from "../../type/friend.interface";
import { type } from "os";


export const UserSchema = SchemaFactory.createForClass(UserDto);
export const FriendSchema = SchemaFactory.createForClass(Friend);