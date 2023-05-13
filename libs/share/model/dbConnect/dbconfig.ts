const develop = {
  mongo: "mongodb://127.0.0.1:27017/",
  db: "authenService",
};
export const dbconfig = {
  mongo: process.env.mongo ?? develop.mongo,
  db: process.env.mongo ?? develop.db,
};
