const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// task Schema:
// id
// description <optional>
// createdOn
// updatedOn
// Deadline < optional >
// user_id

const taskSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  priority: { type: String, default: "normal" },
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
  deadLine: { type: Date , default: null},
  _user: { type: Schema.Types.ObjectId, immutable: true },
});

module.exports = mongoose.model("tasks", taskSchema);
