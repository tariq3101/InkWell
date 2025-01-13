const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const commentRoute = require("./routes/comments");
const summerization = require("./routes/summarize")
const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully"))
.catch((err) => console.log(err));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Blogging", 
        allowed_formats: ["jpg", "png", "jpeg", "mp4"], 
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file); 
    res.status(200).json({
        message: "File uploaded successfully",
        url: req.file.path, 
    });
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);
app.use("/comments", commentRoute);
app.use("/summarize", summerization);

app.listen(process.env.PORT, () => {
    console.log("Backend is running successfully");
});

app.get("/", (req, res) =>{
    res.send("Hello");
});