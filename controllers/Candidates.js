const Candidates = require("../models/Candidates");
const Election = require("../models/Election");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllCandidates = asyncWrapper(async (req, res) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const candidate = await Candidates.find({election_id:electionID});
  res.status(200).json({ candidate });
});

const createCandidates = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  req.body.election_id = String(electionID);
  const candidate = await Candidates.create(req.body);
  res.status(201).json({ candidate });
});

const getCandidate = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { cid: candidateID } = req.params;
  const candidate = await Candidates.findOne({ _id: candidateID});
  if (!candidate) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  res.status(200).json({ candidate });
});

const deleteCandidate = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { cid: candidateID } = req.params;
  const candidate = await Candidates.findOneAndDelete({ _id: candidateID });
  if (!candidate) {
    return next(createCustomError(`No candidate with id : ${candidateID}`, 404));
  }
  res.status(200).json({ candidate });
});

const updateCandidate = asyncWrapper(async (req, res,next) => {
  const { id: electionID} = req.params;
  const election = await Election.findOne({ _id: electionID});
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { cid: candidateID  } = req.params;
  const candidate = await Candidates.findOneAndUpdate({ _id: candidateID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!candidate) {
    return next(createCustomError(`No candidate with id : ${candidateID}`,404))
  }
  res.status(200).json({ candidate });
});

module.exports = { getAllCandidates, createCandidates,getCandidate,deleteCandidate,updateCandidate};
