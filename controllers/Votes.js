const Election = require("../models/Election");
const Candidates = require("../models/Candidates");
const PollingStations = require("../models/PollingStations");
const Voters = require("../models/Voters");
const Votes = require("../models/Votes");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const choosePollingStation = asyncWrapper(async (req, res) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { vid: voterID } = req.params;
  const voter = await Voters.findOne({ _id: voterID });
  if (!voter) {
    return next(createCustomError(`No voter with id : ${voterID}`, 404));
  }
  req.body.election_id = String(electionID);
  req.body.voter_id = String(voterID);
  const vote = await Votes.create(req.body);
  res.status(201).json({ vote });
});

const getVotingResults = asyncWrapper(async (req, res) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const Votings = await Votes.aggregate().sortByCount("candidate_id");
  const Candidate = await Candidates.find({election_id:electionID}).select("Candidate_name");
  Votings.forEach(element => {
    Candidate.forEach(candi=>{
        if(String(element._id)===String(candi._id)){
            element["candidate"] = candi.Candidate_name;
        }
      })
  });
  
  res.status(200).json({Votings});
});

const castVote = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { vid: voterID } = req.params;
  const voter = await Voters.findOne({ _id: voterID });
  if (!voter) {
    return next(createCustomError(`No voter  with id : ${voterID}`, 404));
  }
  const { xid: votingID } = req.params;
  const vote = await Votes.findOneAndUpdate({ _id: votingID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!vote) {
    return next(createCustomError(`No voting cast with id : ${votingID}`, 404));
  }
  res.status(200).json({ vote });
});

module.exports = { choosePollingStation, castVote, getVotingResults };
