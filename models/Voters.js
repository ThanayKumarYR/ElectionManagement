const mongoose = require("mongoose");

const VotersSchema = new mongoose.Schema({
    Voters_name: {
      type: String,
      required: [true, "must provide Voters name"],
      trim: true,
      maxlength: [20, "name can not be more than 20 characters"],
    },
    Voters_age: {
      type: Number,
      required: [true, "must provide Voters age"],
      trim: true,
      maxlength: [2, "age can not be more than 2 digits"],
    },
    Voters_gender: {
      type: String,
      required: [true, "must provide Voters Gender"],
      trim: true,
      maxlength: [1, "Gender can be only F or M"],
    },
    election_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
    },
    CheckVoting:{
      type:Boolean,
      default:false
    }
  });

  module.exports = mongoose.model("Voters",VotersSchema);
  