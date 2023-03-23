const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  Candidate_name: {
    type: String,
    required: [true, "must provide Candidate name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  Candidate_age: {
    type: Number,
    required: [true, "must provide Candidate age"],
    trim: true,
    maxlength: [2, "age can not be more than 2 digits"],
  },
  Candidate_gender: {
    type: String,
    required: [true, "must provide Candidate Gender"],
    trim: true,
    maxlength: [1, "Gender can be only F or M"],
  },
  Party: {
    type: String,
    required: [true, "must provide Candidate Party name"],
    trim: true,
    maxlength: [20, "Party name can not be more than 20 characters"],
  },
  election_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
  }
});

module.exports = mongoose.model("Candidates", CandidateSchema);

