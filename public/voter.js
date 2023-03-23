const tasksDOMcandi = document.querySelector(".tasks");
const loadingDOMcandi = document.querySelector(".loading-text");
const formDOMcandi = document.querySelector(".task-form");
const taskInputDOMcandi = document.querySelector(".task-input");
const ageInputDOMcandi = document.querySelector(".task-input-age");
const partyInputDOMcandi = document.querySelector(".task-input-party");
const formAlertDOMcandi = document.querySelector(".form-alert");
const titleDOMcandi = document.querySelector(".task-form-title");
const partyDiv = document.getElementById("task-party");
const backLink = document.getElementById("back-link");
const params = window.location.search;
const idcandi = new URLSearchParams(params).get("id");
// Load tasks from /api/tasks

titleDOMcandi.textContent = "Voters Inputs";
taskInputDOMcandi.placeholder = "e.g. Sujan A T";
partyDiv.style.display = "none";

backLink.href = "index.html"
const showTaskscandi = async () => {
  loadingDOMcandi.style.visibility = "visible";
  try {
    const {
      data: { voters },
    } = await axios.get(`/api/v1/elections/${idcandi}/Voters`);
    if (voters.length < 1) {
      tasksDOMcandi.innerHTML =
        '<h5 class="empty-list">No Voters in your list</h5>';
      loadingDOMcandi.style.visibility = "hidden";
      return;
    }
    const allelections = voters
      .map((voter) => {
        const {
          _id: VoterID,
          Voters_name,
          Voters_age,
          Voters_gender,
          election_id,
          CheckVoting,
        } = voter;
        if (CheckVoting) {
          return `<div class="single-task ${"task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>Name:${Voters_name},  Age:${Voters_age}, Gender:${Voters_gender}</h5>
         <div class="task-links">
         <i class="fab fa-angellist"></i>
        </div>
        </div>`;
        } else {
          return `<div class="single-task ${"task-completed"}">
          <h5><span><i class="far fa-check-circle"></i></span>Name:${Voters_name},  Age:${Voters_age}, Gender:${Voters_gender}</h5>
         <div class="task-links">
         <a href="index.html?id=${election_id}&&vid=${VoterID}&&page=Vote">
          <i class="fab fa-palfed"></i>
          </a>
         <!-- edit link -->
        <a href="task.html?id=${election_id}&&page=Voters&&vid=${VoterID}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
         <!-- delete btn -->
        <button type="button" class="delete-btn" data-vid="${VoterID}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>`;
        }
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

// delete task /api/tasks/:id

tasksDOMcandi.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOMcandi.style.visibility = "visible";
    const vid = el.parentElement.dataset.vid;
    try {
      await axios.delete(`/api/v1/elections/${idcandi}/Voters/${vid}`);
      showTaskscandi();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOMcandi.style.visibility = "hidden";
});

// form

formDOMcandi.addEventListener("submit", async (e) => {
  e.preventDefault();
  const Voters_name = taskInputDOMcandi.value;
  const Voters_age = Number(ageInputDOMcandi.value);
  const genderInputDOMcandi = document.querySelector(
    'input[name="gender"]:checked'
  );
  const Voters_gender = genderInputDOMcandi.value;
  const election_id = idcandi;

  try {
    await axios.post(`/api/v1/elections/${idcandi}/Voters`, {
      Voters_name,
      Voters_age,
      Voters_gender,
      election_id,
    });
    showTaskscandi();
    taskInputDOMcandi.value = "";
    ageInputDOMcandi.value = "";
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.textContent = `success, task added`;
    formAlertDOMcandi.classList.add("text-success");
  } catch (error) {
    formAlertDOMcandi.style.display = "block";
    formAlertDOMcandi.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOMcandi.style.display = "none";
    formAlertDOMcandi.classList.remove("text-success");
  }, 3000);
});
