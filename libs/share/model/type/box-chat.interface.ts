
import { Prop, Schema } from "@nestjs/mongoose";

import { v4 as uuid } from "uuid";
import { UserDto } from "./user.interface";
import { PickType } from "@nestjs/mapped-types";



@Schema()
export class BoxChatPerSonalDto {
    @Prop({ default: uuid(), require: true })
    id: string = uuid()

    @Prop({ required: true, type:  PickType(UserDto,['id','username'])})
    userOne: Pick<UserDto, 'id' | 'username'> = { id: '', username: '' }

    @Prop({ required: true, type:  PickType(UserDto,['id','username'])})
    userTwo: Pick<UserDto, 'id' | 'username'> = { id: '', username: '' }

    @Prop({ required: true })
    createAt: Date = new Date()

    static createObj = (src?: Partial<BoxChatPerSonalDto>): BoxChatPerSonalDto => {
        const obj = new BoxChatPerSonalDto();
        return {
            ...obj,
            ...src,
        };
    };
}


