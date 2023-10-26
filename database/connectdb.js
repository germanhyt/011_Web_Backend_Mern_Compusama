import mongoose from "mongoose";

const connectDatabase = async () => {
  const { MONGO_URL, MONGO_URL_TEST, NODE_ENV } = process.env;
  const connectionString = NODE_ENV === "test" ? MONGO_URL_TEST : MONGO_URL;

  try {
    const conn = await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
