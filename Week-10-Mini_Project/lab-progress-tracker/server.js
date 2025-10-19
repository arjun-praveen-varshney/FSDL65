// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const labRoutes = require("./routes/labRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => { console.error(err); process.exit(1); });
app.use("/api/users", userRoutes);
app.use("/api/labs", labRoutes);
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: "Server Error", error: err.message
});


});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
);