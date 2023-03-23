const PollingStations = require("../models/PollingStations");
const Election = require("../models/Election");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");


const getAllPollingStations = asyncWrapper(async (req, res) => {
    const { id: electionID } = req.params;
    const election = await Election.findOne({ _id: electionID });
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
    const pollingStation = await PollingStations.find({election_id:electionID});
    res.status(200).json({ pollingStation });
  });

  
  const createPollingStations = asyncWrapper(async (req, res) => {
    const { id: electionID } = req.params;
    const election = await Election.findOne({ _id: electionID });
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
    req.body.election_id = String(electionID);
    const pollingStation = await PollingStations.create(req.body);
    res.status(201).json({ pollingStation });
  });

  const getPollingStation = asyncWrapper(async (req, res, next) => {
    const { id: electionID } = req.params;
    const election = await Election.findOne({ _id: electionID });
    if (!election) {
      return next(createCustomError(`No election with id : ${electionID}`, 404));
    }
   const { pid: pollingID } = req.params;
   const pollingStation = await PollingStations.findOne({ _pid:  pollingID});
    if (!pollingStation) {
      return next(createCustomError(`No polling station with id : ${pollingID}`, 404));
   }
    res.status(200).json({ pollingStation });
  });


  const deletePollingStation = asyncWrapper(async (req, res, next) => {
  const { id: electionID } = req.params;
  const election = await Election.findOne({ _id: electionID });
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { pid: pollingID } = req.params;
  const pollingStation= await PollingStations.findOneAndDelete({ _id: pollingID });
  if (!pollingStation) {
    return next(createCustomError(`No polling station with id : ${pollingID}`, 404));
  }
  res.status(200).json({ pollingStation });
});
const updatePollingStation = asyncWrapper(async (req, res,next) => {
  const { id: electionID} = req.params;
  const election = await Election.findOne({ _id: electionID});
  if (!election) {
    return next(createCustomError(`No election with id : ${electionID}`, 404));
  }
  const { pid: pollingID  } = req.params;
  const pollingStation= await PollingStations.findOneAndUpdate({ _id: pollingID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pollingStation) {
    return next(createCustomError(`No polling station with id : ${pollingID}`,404))
  }
  res.status(200).json({ pollingStation });
});

  module.exports = {createPollingStations,getAllPollingStations,getPollingStation,updatePollingStation,deletePollingStation}