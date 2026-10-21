
require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")

const authRoutes = require("./routes/authRoutes")

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Testing");
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log("MongoDB connection error:", error);
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
})

