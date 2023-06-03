import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import { BoxChatPerSonalDto, Message } from "../../type";



export type MessageDocument = HydratedDocument<BoxChatPerSonalDto>;

export const MessageSchema = SchemaFactory.createForClass(Message);
export const BoxChatPersonalSchema = SchemaFactory.createForClass(BoxChatPerSonalDto)