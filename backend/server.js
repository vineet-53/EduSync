const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./configs/db");
const authRoutes = require("./routes/auth.js");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/payment");
const profileRoutes = require("./routes/profile.js");
const rootRoutes = require("./routes/root.js");
const cloudinary = require("./configs/cloudinary.js");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
// db
// cloudinary
cloudinary.connect();
// cookie middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND,
      `http://127.0.0.1:${process.env.FRONTEND_PORT}`,
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
// file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: __dirname + "/tmp/",
    preserveExtension: true,
  }),
);

// routes
app.use("/api/v1", rootRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("STUDY NOTION - server is running");
});
function run() {
  try {
    app.listen(PORT, (err) => {
      if (!err) console.log("Server is running on port ", PORT);
      db.connect();
    });
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
}
run();
