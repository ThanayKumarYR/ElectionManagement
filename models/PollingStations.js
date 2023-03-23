const mongoose = require("mongoose");

const PollingStationsSchema = new mongoose.Schema({
    pollingStations_name: {
      type: String,
      required: [true, "must provide Candidate name"],
      trim: true,
      maxlength: [20, "name can not be more than 20 characters"],
    },
    election_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election"
    }
  });

  module.exports = mongoose.model("PollingStation", PollingStationsSchema)

  