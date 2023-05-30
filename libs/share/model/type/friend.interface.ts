import { Prop, Schema } from "@nestjs/mongoose"
import { UserDto } from "t-chatsss";
import { v4 as uuid } from "uuid";



export class Friend {
      @Prop({ type: 'string', default: uuid(), required: true, })
      id: string = ''

      @Prop({ type: 'string', required: true })
      userId: string = ''

      @Prop({ type: 'Array', required: true })
      listFriend: Array<Pick<UserDto,'id' | 'username'>> = []

      static createObj = (src?: Partial<Friend>): Friend => {
            const obj = new Friend();
            return {
                  ...obj,
                  ...src,
            };
      };
}