const mongoose = require("mongoose");
// const pusher = require("../config/pusher");

const connectDB = async () => {
  await mongoose.connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log("Database connected");
};

// const db = mongoose.connection;

// db.once("open", () => {
// console.log("something is happening in the restaurant");
// console.log("db is here", db.collection("users"));
// const ordersCollection = db.collection("orders");
// const changeStream = ordersCollection.watch();
// changeStream.on("change", (change) => {
//   // console.log("there is some change in somewhere", change);
//   // console.log("full document: ", change.fullDocument);
//   pusher.trigger("hello_61261e08b394081bb085b31d", "inserted", {
//     message: "hello world",
//     msg: change.fullDocument,
//   });
// });
// });

module.exports = connectDB;
