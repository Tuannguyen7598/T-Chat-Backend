const develop = {
  mongo: "mongodb://127.0.0.1:27017/",
  dbUserServer: "authenService",
  dbSocketServer: "socketService"
};
export const dbconfig = {
  mongo: process.env.mongoPort ?? develop.mongo,
  dbUserServer: process.env.mongoDBUser ?? develop.dbUserServer,
  dbSocketServer: process.env.mongoDBSocket ?? develop.dbSocketServer,
};
