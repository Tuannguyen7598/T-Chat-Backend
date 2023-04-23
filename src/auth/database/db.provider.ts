import mongoose from "mongoose";
import { UserSchema } from "../../model/dbConnect/schema/user.schema";
import * as crypto from "crypto";

export const dbProviders = [
  {
    provide: "USER_MODEL",
    useFactory: async () => {
      try {
        return await mongoose.model("user", UserSchema);
      } catch (error) {
        console.error(error);
      }
    },
    inject: ["DATABASE_CONNECTION"],
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
