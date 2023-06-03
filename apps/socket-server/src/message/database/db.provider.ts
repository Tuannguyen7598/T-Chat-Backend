import {  BoxChatPersonalSchema, MessageSchema } from "libs/share/model";
import mongoose from "mongoose";


export const dbProviders = [
  {
    provide: "MESSAGE_MODEL",
    useFactory: async () => {
      try {
        return mongoose.model("message", MessageSchema);
      } catch (error) {
        console.error(error);
      }
    },
    inject: ["DATABASE_CONNECTION_SOCKETSERVICE"],
  },
  {
    provide: "BOXCHATPERSIONAL_MODEL",
    useFactory: async () => {
      try {
        return mongoose.model("boxchatpersonal", BoxChatPersonalSchema);
      } catch (error) {
        console.error(error);
      }
    },
    inject: ["DATABASE_CONNECTION_SOCKETSERVICE"],
  },


];
