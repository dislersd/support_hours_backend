const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  role: String,
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "sessions"
    }
  ],
  blockers: [
    {
      body: String,
      forSession: String
    }
  ]
});

module.exports = model("User", userSchema, "users");
