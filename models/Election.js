const mongoose = require("mongoose");
const ElectionSchema = new mongoose.Schema({
  election_name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [30, "name can not be more than 30 characters"],
  },
  election_date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Election", ElectionSchema);

 