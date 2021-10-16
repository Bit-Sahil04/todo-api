const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// task Schema:
// id
// description <optional>
// createdOn
// updatedOn
// Deadline < optional >
// user_id

const taskSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    priority: { type: String, default: "normal" },
    deadLine: { type: Date, default: null },
    _user: { type: Schema.Types.ObjectId, immutable: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
