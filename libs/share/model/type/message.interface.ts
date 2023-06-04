
import { Prop, Schema } from "@nestjs/mongoose";
import { v4 as uuid } from "uuid";


export enum TypeMessage {
    Text = "Text",
    Image = " Image",
    video = "Video",
    File = "File"

}
export enum TypeReaction {
    Love = "Love",
    Like = "Like",
    HaHa = "HaHa",
    Boring = "Boring"
}
export interface Reaction {
    type: TypeReaction,
    total: number
}
@Schema()
export class Message {
    @Prop({required: true, default: uuid()})
    id: string = uuid() 

    @Prop({required: true})
    boxChatId: string

    @Prop({required: true})
    from:string

    @Prop({required: true})
    to:string

    @Prop({required: true})
    type: TypeMessage = TypeMessage.Text

    @Prop({required: true})
    content : string = ''

    @Prop({required: true})
    reaction: Array<Reaction> = []

    @Prop({required: true})
    createAt : Date = new Date()

    @Prop({required: true})
    isDelete: boolean = false

    @Prop({required: true})
    isSeen: boolean = false

    static createObj = (src?: Partial<Message>): Message => {
        const obj = new Message();
        return {
              ...obj,
              ...src,
        };
  };
}