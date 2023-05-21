import * as mongoose from "mongoose";
import { async } from "rxjs";
import { dbconfig } from "./dbconfig";

export const databaseUserServerProviders = [
  {
    provide: "DATABASE_CONNECTION_USERSERVICE",
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connect = await mongoose.connect(`${dbconfig.mongo}${dbconfig.dbUserServer}`);
        console.info("connect to monngDB UserServer succesfully");
        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
  
];
export const databaseSocketServerProviders = [
  {
    provide: "DATABASE_CONNECTION_SOCKETSERVICE",
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        const connect = await mongoose.connect(`${dbconfig.mongo}${dbconfig.dbSocketServer}`);
        console.info("connect to monngDB UserServer succesfully");
        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
]