const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  role: String,
  blockers: [
    {
      body: String,
      session: {
        type: Schema.Types.ObjectId,
        ref: "Session"
      }
    }
  ],
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Session"
    }
  ]
});

module.exports = model("User", userSchema);
