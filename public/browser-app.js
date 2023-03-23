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
// Load tasks from /api/tasks

titleDOM.textContent = "Election Manager";
taskInputDOM.placeholder = "e.g. State Election";
ageDiv.style.display = "none";
genderDiv.style.display = "none";
partyDiv.style.display = "none";

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { elections },
    } = await axios.get('/api/v1/elections')
    if (elections.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No elections in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allelections = elections
      .map((election) => {
        const {  _id: electionID, election_name } = election
        return `<div class="single-task ${ 'task-completed'}">
<h5><span>
<a href="index.html?id=${electionID}&&page=Result" title="Result">
<i class="fas fa-chess" style="color:green"></i>
</a>
</span>${election_name}</h5>
<div class="task-links">
<!-- edit link -->
<a href="index.html?id=${electionID}&&page=Candidates" title="Candidates">
<i class="fab fa-cuttlefish"></i>
</a>
<a href="index.html?id=${electionID}&&page=pollingStation" title="pollingStation">
<i class="fab fa-palfed"></i>
</a>
<a href="index.html?id=${electionID}&&page=Voters" title="Voters">
<i class="fab fa-angellist"></i>
</a>
<a href="task.html?id=${electionID}" class="edit-link" title="edit">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${electionID}" title="delete">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
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

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/elections/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const election_name = taskInputDOM.value

  try {
    await axios.post('/api/v1/elections', { election_name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})


