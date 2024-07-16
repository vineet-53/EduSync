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
require("dotenv").config();
const PORT = process.env.PORT || 8000;
// db
db.connect();
// cloudinary
cloudinary.connect();
// cookie middleware
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
app.listen(PORT, (err) => {
  if (!err) console.log("Server is running on port ", PORT);
});
