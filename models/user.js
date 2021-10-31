const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: false,
    // min: 6,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
       {
        type: Schema.Types.ObjectId,
        ref: "tasks",
      },
  ],
});

module.exports = mongoose.model("todo-User", userSchema);
