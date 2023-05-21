import mongoose, { Connection, ConnectionStates } from "mongoose";
import * as crypto from "crypto";
import { MessageSchema, UserSchema, dbconfig } from "libs/share/model";


export const dbProviders = [
  {
    provide: "MESSAGE_MODEL",
    useFactory: async () => {
      try {
        return  mongoose.model("message", MessageSchema);
      } catch (error) {
        console.error(error);
      }
    },
    inject: ["DATABASE_CONNECTION_SOCKETSERVICE"],
  },
];
