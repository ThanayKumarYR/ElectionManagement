const mongoose = require("mongoose");

const VotesSchema = new mongoose.Schema({
  election_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
  },
  voter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Voters",
  },
  polling_Station_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PollingStations",
  },
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidates",
  }
});

module.exports = mongoose.model("Votes", VotesSchema);
