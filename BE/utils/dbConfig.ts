import { connect } from "mongoose";

const URL = "mongodb://localhost:27017/cronJobDB";

export const dbConfig = async () => {
  try {
    return await connect(URL).then(() => {
      console.log("Database successfully Connected");
    });
  } catch (error) {
    return error;
  }
};
