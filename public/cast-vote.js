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
const backLink = document.getElementById("back-link").style.display = "none";
const idcandi = new URLSearchParams(params).get("id");
const vid = new URLSearchParams(params).get("vid");
const xid = new URLSearchParams(params).get("xid");
// Load tasks from /api/tasks

titleDOMcandi.textContent = "Cast Your Voting";
nameDiv.style.display = "none";
ageDiv.style.display = "none";
genderDiv.style.display = "none";
partyDiv.style.display = "none";
// backLink.href = `index.html?id=${idcandi}&&page=Voters`;

const showTaskscandi = async () => {
  loadingDOMcandi.style.visibility = "visible";
  try {
    const {
      data: { candidate },
    } = await axios.get(`/api/v1/elections/${idcandi}/Voters/${vid}/Vote/${xid}`);
    if (candidate.length < 1) {
      tasksDOMcandi.innerHTML =
        '<h5 class="empty-list">No Candidates in your list</h5>';
      loadingDOMcandi.style.visibility = "hidden";
      return;
    }
    const allelections = candidate
      .map((candi) => {
        const {
          _id: CandidateID,
          Candidate_name,
          Candidate_age,
          Candidate_gender,
          Party
        } = candi;
        return `<div class="single-task ${"task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>Name:${Candidate_name},  Age:${Candidate_age}, Gender:${Candidate_gender}, Party:${Party} </h5>
           <div class="task-links">
           <input type = "radio" name="chooseCandi" value="${CandidateID}"/>
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

showTaskscandi();

// form

formDOMcandi.addEventListener("submit", async (e) => {
  e.preventDefault();
  const Candidate_id = document.querySelector(
    'input[name="chooseCandi"]:checked'
  ).value;

  try {
   await axios.patch(`/api/v1/elections/${idcandi}/Voters/${vid}/Vote/${xid}`,{candidate_id:Candidate_id})
   await axios.patch(`/api/v1/elections/${idcandi}/Voters/${vid}`,{CheckVoting:true})
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.textContent = `success, task added`;
    formAlertDOMcandi.classList.add("text-success");
    window.location.href = `index.html?id=${idcandi}&&page=Voters`;
  } catch (error) {
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOMcandi.style.display = "none";
    formAlertDOMcandi.classList.remove("text-success");
  }, 3000);
});
