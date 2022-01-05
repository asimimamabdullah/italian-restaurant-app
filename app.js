// if (process.env.NODE_ENV != "production") {
require("dotenv").config();
// }
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const compression = require("compression");

// const path = require("path");
// const fs = require("fs");
// //joining path of directory
// const directoryPath = path.join("F:/");
// console.log("dirname: ", __dirname);
// //passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//   //handling error
//   if (err) {
//     return console.log("Unable to scan directory: " + err);
//   }
//   //listing all files using forEach
//   files.forEach(function (file) {
//     // Do whatever you want to do with the file
//     console.log(file);
//   });
// });

// Database
connectDB();

// middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
	})
);
app.use(compression());

app.use("/api/user", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/ProductRoute"));
app.use("/api", require("./routes/CategoryRoute"));
app.use("/api", require("./routes/Reservoir"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/PostalCode"));
app.use("/api", require("./routes/reports"));
app.use("/api", require("./routes/findOrder"));

app.use(express.static("client/build"));
// if (process.env.NODE_ENV === "production") {
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// }
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`));
// mongo_uri=mongodb+srv://asimimam:marvelnet@practice-cluster.ysjju.mongodb.net/restaurant-app?retryWrites=true&w=majority
// mongo_uri=mongodb://localhost:27017/restaurant-app
// mongo_uri=mongodb+srv://shahiristorante:shahiuser@shahiristorante.gqmln.mongodb.net/shahiristorante?retryWrites=true&w=majority
