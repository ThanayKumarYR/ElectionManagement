const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const titleDOM =  document.querySelector('.task-form-title')
const nameDiv =  document.getElementById('task-name')
const ageDiv =  document.getElementById('task-age')
const genderDiv =  document.getElementById('task-gender')
const partyDiv =  document.getElementById('task-party')
const backLink = document.getElementById('back-link').style.display = "none"
const submitBtn = document.getElementById("submit-btn").style.display = "none"
const params = window.location.search
const idcandi = new URLSearchParams(params).get('id');
// Load tasks from /api/tasks

titleDOM.textContent = "Results";
taskInputDOM.placeholder = "e.g. State Election";
nameDiv.style.display = "none";
ageDiv.style.display = "none";
genderDiv.style.display = "none";
partyDiv.style.display = "none";


const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { Votings },
    } = await axios.get(`/api/v1/elections/${idcandi}/Result`)
    if (Votings.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No elections in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    let i = 1 
    const allelections = Votings
      .map((voting) => {
        const { count, candidate} = voting
        if(i===1){
          return `<div class="single-task" style="background:#65e565;font-weight:900">
          <h5 style="font-weight:900" ><span>${i++})</span>${candidate}</h5>
          <div class="task-links">
            votes: ${count}
          </div>
          </div>`
        }else{
          return `<div class="single-task" style="background:#d76060;font-weight:400">
          <h5 style="font-weight:400"><span>${i++})</span>${candidate}</h5>
          <div class="task-links">
            votes: ${count}
          </div>
          </div>`
        }
      })
      .join('')
    tasksDOM.innerHTML = allelections
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()




