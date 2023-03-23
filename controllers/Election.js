const Election = require("../models/Election");
const Candidates = require("../models/Candidates");
const PollingStations = require("../models/PollingStations");
const Voters = require("../models/Voters");
const Votes = require("../models/Votes");

const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllElections = asyncWrapper(async (req, res) => {
  const elections = await Election.find({});
  res.status(200).json({ elections });
});

const createElection = asyncWrapper(async (req, res) => {
  const election = await Election.create(req.body);
  res.status(201).json({ election });
});

const getElection = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  res.status(200).json({ election });
});

const deleteElection = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOneAndDelete({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const candidate = await Candidates.deleteMany({
    election_id: electionID,
  });
  const pollingStation = await PollingStations.deleteMany({
    election_id: electionID,
  });
  const voter = await Voters.deleteMany({ election_id: electionID });
  const votes = await Votes.deleteMany({ election_id: electionID });
  res.status(200).json({ election, candidate, pollingStation, voter, votes });
});

const updateElection = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOneAndUpdate({ _id: electionID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  res.status(200).json({ election});
});

module.exports = {
  getAllElections,
  createElection,
  getElection,
  deleteElection,
  updateElection,
};
