const Voters = require("../models/Voters");
const Election = require("../models/Election");

const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllVoters = asyncWrapper(async (req, res) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
    const voters = await Voters.find({election_id:electionID});
    res.status(200).json({ voters });
  });


const createVoter = asyncWrapper(async (req, res) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
    req.body.election_id = String(electionID);
    const voters = await Voters.create(req.body);
    res.status(201).json({ voters });
  });


  const getVoter = asyncWrapper(async (req, res, next) => {
    const { id: electionID } = req.params;
    const election = await Election.findOne({ _id: electionID });
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
    const { vid: voterID } = req.params;
    const voter = await Voters.findOne({ _id: voterID});
    if (!voter) {
      return next(createCustomError(`No  voter with id : ${voterID}`, 404));
    }
    res.status(200).json({ voter });
  });


  const deleteVoter = asyncWrapper(async (req, res, next) => {
    const { id: electionID } = req.params;
    const election = await Election.findOne({ _id: electionID });
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
    const { vid: VoterID } = req.params;
    const vote = await Voters.findOneAndDelete({ _id: VoterID });
    if (!vote) {
      return next(createCustomError(`No voter with id : ${VoterID}`, 404));
    }
    res.status(200).json({ vote });
  });
  const updateVoter = asyncWrapper(async (req, res,next) => {
    const { id: electionID} = req.params;
    const election = await Election.findOne({ _id: electionID});
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
    const { vid: VoterID  } = req.params;
    const voter = await Voters.findOneAndUpdate({ _id: VoterID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!voter) {
      return next(createCustomError(`No voter with id : ${VoterID}`,404))
    }
    res.status(200).json({ voter});
  });


module.exports = {getAllVoters,createVoter,getVoter,deleteVoter,updateVoter}