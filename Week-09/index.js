const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files if needed (e.g., CSS/JS)
app.use(express.static(path.join(__dirname, "public")));
// MongoDB URI and Database Name
const uri = "mongodb+srv://<your-username>:<your-password>@<your-cluster>/?retryWrites=true&w=majority";
const dbName = "studentdb";
let db; // To store the database connection
// Main function to start server after DB connection
async function startServer() {
try {
const client = new MongoClient(uri);


// Connect to MongoDB
await client.connect();
db = client.db(dbName);
console.log("Connected to MongoDB");
// Route to show the form
app.get("/", (req, res) => {
res.send('<h1>Student Record Application</h1><form method="POST" action="/"><label>Name: <input type="text" name="name" required></label><br><br><label>Age: <input type="number" name="age" required></label><br><br><label>Email: <input type="email" name="email" required></label><br><br><button type="submit">Add Student</button></form><br><a href="/records">View Student Records</a>');});
// Route to handle form submission
app.post("/", async (req, res) => {
const student = {
name: req.body.name,
age: parseInt(req.body.age),
email: req.body.email,
};
try {
await db.collection("students").insertOne(student);
res.redirect("/records");
} catch (err) {
console.error("Error inserting student record:", err);
res.status(500).send("Error inserting student record");
}
});


// Route to display all student records
app.get("/records", async (req, res) => {
try {
const students = await db.collection("students").find().
toArray();
let html = '<h1>Student Records</h1><a href="/">Add New Student</a><br><br>';
if (students.length === 0) {
html += '<p>No records found.</p>';
} else {
students.forEach((student) => {
html += '<p>Name: ${student.name} | Age: ${student.age} | Email: ${student.email}</p>';
});
}
res.send(html);
} catch (err) {
console.error("Error fetching student records:", err);
res.status(500).send("Error fetching student records");
}
});
// Start server only after DB is connected
app.listen(port, () => {
console.log("Server is running on port " + port);
});
} catch (err) {
console.error("Failed to connect to MongoDB:", err);
process.exit(1);
}
}
startServer();
// Example of Node.js event loop
console.log("Node.js server starting...");
setTimeout(() => {
console.log("This asynchronous message appears after 1 second.");
}, 1000);