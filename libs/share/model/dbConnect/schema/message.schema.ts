import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { HydratedDocument } from "mongoose";
import { BoxChatDto } from "../../type";


export type MessageDocument = HydratedDocument<BoxChatDto>;

export const MessageSchema = SchemaFactory.createForClass(BoxChatDto);
