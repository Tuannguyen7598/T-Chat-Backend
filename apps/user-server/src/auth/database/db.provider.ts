import * as crypto from "crypto";
import { UserSchema, dbconfig } from "libs/share/model";
import mongoose from "mongoose";





export const dbProviders = [
  {
    provide: "USER_MODEL",
    useFactory: async () => {
      try {
        const connect = mongoose.connection.readyState
        if (connect === 0 || connect === 3 || connect === 99) {
          console.error('MongoDB is disconect')
          return
        }
        return  mongoose.model("user", UserSchema);
      } catch (error) {
        console.error(error);
      }
    },
    inject: ["DATABASE_CONNECTION_USERSERVICE"],
  },
];

export const hashPasswordProviders = [
  {
    provide: "HASH_PASSWORD",
    useFactory: async () => {
      try {
        const buySalt = (): string => crypto.randomBytes(16).toString("hex");
        const hashPassword = (pass: string, salts: string): string =>
          crypto.pbkdf2Sync(pass, salts, 100, 64, "sha512").toString("hex");
        return {
          buySalt,
          hashPassword,
        };
      } catch (error) {
        console.error(error);
      }
    },
  },
];
