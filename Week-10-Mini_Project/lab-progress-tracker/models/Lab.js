// models/Lab.js
const mongoose = require("mongoose");
const labSchema = new mongoose.Schema({
name: { type:String, required:true, trim:true },
description: { type:String, required:true },
teacher: { type:mongoose.Schema.Types.ObjectId, ref:"User",
required:true },
department: { type:String, required:true },
semester: { type:Number, required:true },
experiments: [ /* ... */ ],
resources: [ /* ... */ ],
assignments: [ /* ... */ ],
progress: [ /* ... */ ],
discussions: [ /* ... */ ],
createdAt: { type:Date, default:Date.now }
});
module.exports = mongoose.model("Lab", labSchema);