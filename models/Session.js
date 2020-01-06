const { model, Schema } = require("mongoose");

const sessionSchema = new Schema({
  date: String,
  attendees: [String],
  comments: {
    body: String,
    username: String,
    createdAt: String
  }
});

module.exports = model("Session", sessionSchema);
