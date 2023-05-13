import * as mongoose from "mongoose";
import { async } from "rxjs";
import { dbconfig } from "./dbconfig";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async (): Promise<typeof mongoose> => {
      try {
        await mongoose.connect(`${dbconfig.mongo}${dbconfig.db}`);
        console.info("connect to monngDB succesfully");
        return;
      } catch (error) {
        console.error(error);
      }
    },
  },
];
