const tasksDOMcandi = document.querySelector(".tasks");
const loadingDOMcandi = document.querySelector(".loading-text");
const formDOMcandi = document.querySelector(".task-form");
const taskInputDOMcandi = document.querySelector(".task-input");
const ageInputDOMcandi = document.querySelector(".task-input-age");
const partyInputDOMcandi = document.querySelector(".task-input-party");
const formAlertDOMcandi = document.querySelector(".form-alert");
const titleDOMcandi = document.querySelector(".task-form-title");
const params = window.location.search;
const nameDiv = document.getElementById("task-name");
const ageDiv = document.getElementById("task-age");
const genderDiv = document.getElementById("task-gender");
const partyDiv = document.getElementById("task-party");
const backLink = document.getElementById("back-link");
const submitBtn = document.getElementById("submit-btn");
const idcandi = new URLSearchParams(params).get("id");
const vid = new URLSearchParams(params).get("vid");
// Load tasks from /api/tasks

titleDOMcandi.textContent = "Choose PollingStations";
nameDiv.style.display = "none";
ageDiv.style.display = "none";
genderDiv.style.display = "none";
partyDiv.style.display = "none";
backLink.href = `index.html?id=${idcandi}&&page=Voters`;

const showTaskscandi = async () => {
  loadingDOMcandi.style.visibility = "visible";
  try {
    const {
      data: { pollingStation },
    } = await axios.get(`/api/v1/elections/${idcandi}/Voters/${vid}/Vote`);
    if (pollingStation.length < 1) {
      tasksDOMcandi.innerHTML =
        '<h5 class="empty-list">No pollingStation in your list</h5>';
      loadingDOMcandi.style.visibility = "hidden";
      return;
    }
    const allelections = pollingStation
      .map((candi) => {
        const { _id: pollingStationID, pollingStations_name } = candi;
        return `<div class="single-task ${"task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>PS:${pollingStations_name}</h5>
         <div class="task-links">
          <input type = "radio" name="choosePS" value="${pollingStationID}"/>
         </div>
         </div>`;
      })
      .join("");
    tasksDOMcandi.innerHTML = allelections;
  } catch (error) {
    tasksDOMcandi.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOMcandi.style.visibility = "hidden";
};
const showTaskcandi = async (psID,VoterID,voteID) => {
  loadingDOMcandi.style.visibility = "visible";
  try {
    const {
      data: { pollingStation },
    } = await axios.get(`/api/v1/elections/${idcandi}/Voters/${vid}/Vote`);
    if (pollingStation.length < 1) {
      tasksDOMcandi.innerHTML =
        '<h5 class="empty-list">No pollingStation in your list</h5>';
      loadingDOMcandi.style.visibility = "hidden";
      return;
    }
    const allelections = pollingStation
      .map((candi) => {
        const { _id: pollingStationID, pollingStations_name,election_id } = candi;
        if (psID === pollingStationID){
          return `<div class="single-task ${"task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>PS:${pollingStations_name}</h5>
         <div class="task-links">
         <a href="index.html?id=${election_id}&&vid=${VoterID}&&page=CastVote&&xid=${voteID}">
         <i class='fas fa-vote-yea'></i>
         </a>
         </div>
         </div>`;
        }

      })
      .join("");
    tasksDOMcandi.innerHTML = allelections;
    backLink.style.display = 'none';
    titleDOMcandi.textContent = 'Cast Your Vote';
    submitBtn.style.display = "none";
  } catch (error) {
    tasksDOMcandi.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOMcandi.style.visibility = "hidden";
};

showTaskscandi();

// form

formDOMcandi.addEventListener("submit", async (e) => {
  e.preventDefault();
  const polling_Station_id = document.querySelector(
    'input[name="choosePS"]:checked'
  ).value;
  const election_id = idcandi;
  const voter_id = vid;

  try {
    const {
      data: { vote },
    } = await axios.post(`/api/v1/elections/${idcandi}/Voters/${vid}/Vote`, {
      election_id,
      voter_id,
      polling_Station_id,
    });
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.textContent = `success, task added`;
    formAlertDOMcandi.classList.add("text-success");
    const { _id: voteID } = vote;
    showTaskcandi(polling_Station_id,voter_id,voteID);
  }catch(error){
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOMcandi.style.display = "none";
    formAlertDOMcandi.classList.remove("text-success");
  }, 3000);
});
