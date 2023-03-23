const express = require("express");
const router = express.Router();
const {
  getAllElections,
  createElection,
  getElection,
  deleteElection,
  updateElection
} = require("../controllers/Election");
const {
  getAllCandidates,
  createCandidates,
  getCandidate,
  updateCandidate,
  deleteCandidate
} = require("../controllers/Candidates");
const { 
  getAllVoters, 
  createVoter,
  getVoter,
  deleteVoter,
  updateVoter } = require("../controllers/Voters");
const {
  getAllPollingStations,
  createPollingStations,
  deletePollingStation,
  updatePollingStation,
  getPollingStation
} = require("../controllers/PollingStations");
const {
  castVote,
  getVotingResults,
  choosePollingStation
} = require("../controllers/Votes");


router.route("/").get(getAllElections).post(createElection);
router.route("/:id").get(getElection).delete(deleteElection).patch(updateElection);
router.route("/:id/Candidates").get(getAllCandidates).post(createCandidates);
router.route("/:id/Candidates/:cid").get(getCandidate).delete(deleteCandidate).patch(updateCandidate);
router.route("/:id/PollingStation").get(getAllPollingStations).post(createPollingStations);
router.route("/:id/PollingStation/:pid").get(getPollingStation).delete(deletePollingStation).patch(updatePollingStation)
router.route("/:id/Voters").get(getAllVoters).post(createVoter);
router.route("/:id/Voters/:vid").get(getVoter).delete(deleteVoter).patch(updateVoter);
router.route("/:id/Voters/:vid/Vote").post(choosePollingStation).get(getAllPollingStations);
router.route("/:id/Voters/:vid/Vote/:xid").patch(castVote).get(getAllCandidates);
router.route("/:id/Result").get(getVotingResults);

module.exports = router;

