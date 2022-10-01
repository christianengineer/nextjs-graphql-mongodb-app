import mongoose from "mongoose";

// connect to mongoDB database
async function dbConnect() {
  return mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  });
}

export default dbConnect;
