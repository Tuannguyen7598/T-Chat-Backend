
import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { v4 as uuid } from "uuid";

export class Message {
    userId: string = ''
    content: string = ''
    file: string = ''
    image: string = ''
    time: Date = new Date()
    isSeen: boolean = false
    static createObj = (src?: Partial<Message>): Message => {
        const obj = new Message();
        return {
            ...obj,
            ...src,
        };
    };
}

@Schema()
export class BoxChatDto {
    @Prop({ default: uuid(), require: true })
    id: string = uuid()

    @Prop({ required: true, })
    userAdminId: string = '12345'

    @Prop({ required: true, })
    boxMessage: Array<Message> = []

    @Prop({ required: true, })
    file: Array<string> = []

    @Prop({ required: true, })
    image: Array<string> = []

    static createObj = (src?: Partial<BoxChatDto>): BoxChatDto => {
        const obj = new BoxChatDto();
        return {
            ...obj,
            ...src,
        };
    };
}


