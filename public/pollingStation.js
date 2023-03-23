const tasksDOMcandi = document.querySelector('.tasks')
const loadingDOMcandi = document.querySelector('.loading-text')
const formDOMcandi = document.querySelector('.task-form')
const taskInputDOMcandi = document.querySelector('.task-input')
const ageInputDOMcandi = document.querySelector('.task-input-age')
const partyInputDOMcandi = document.querySelector('.task-input-party')
const formAlertDOMcandi = document.querySelector('.form-alert')
const titleDOMcandi =  document.querySelector('.task-form-title')
const params = window.location.search
const ageDiv =  document.getElementById('task-age')
const genderDiv =  document.getElementById('task-gender')
const partyDiv =  document.getElementById('task-party')
const backLink = document.getElementById('back-link');
const idcandi = new URLSearchParams(params).get('id');
// Load tasks from /api/tasks

titleDOMcandi.textContent = "PollingStations Inputs";
taskInputDOMcandi.placeholder = "e.g. RR Nagar";
ageDiv.style.display = "none";
genderDiv.style.display = "none";
partyDiv.style.display = "none";
backLink.href = "index.html"

const showTaskscandi = async () => {
  loadingDOMcandi.style.visibility = 'visible'
  try {
    const {
      data: { pollingStation},
    } = await axios.get(`/api/v1/elections/${idcandi}/pollingStation`)
    if (pollingStation.length < 1) {
      tasksDOMcandi.innerHTML = '<h5 class="empty-list">No pollingStation in your list</h5>'
      loadingDOMcandi.style.visibility = 'hidden'
      return
    }
    const allelections = pollingStation
      .map((candi) => {
        const {  _id: pollingStationID, pollingStations_name, election_id} = candi
        return `<div class="single-task ${ 'task-completed'}">
          <h5><span><i class="far fa-check-circle"></i></span>PS:${pollingStations_name}</h5>
         <div class="task-links">
         <!-- edit link -->
        <a href="task.html?id=${election_id}&&page=pollingStation&&pid=${pollingStationID}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
         <!-- delete btn -->
<button type="button" class="delete-btn" data-pid="${pollingStationID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOMcandi.innerHTML = allelections
  } catch (error) {
    tasksDOMcandi.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOMcandi.style.visibility = 'hidden'
}

showTaskscandi()

// delete task /api/tasks/:id

tasksDOMcandi.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOMcandi.style.visibility = 'visible'
    const pid = el.parentElement.dataset.pid
    try {
      await axios.delete(`/api/v1/elections/${idcandi}/pollingStation/${pid}`)
      showTaskscandi()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOMcandi.style.visibility = 'hidden'
})

// form

formDOMcandi.addEventListener('submit', async (e) => {
  e.preventDefault()
  const pollingStations_name = taskInputDOMcandi.value
  const election_id = idcandi
  
  try {
    await axios.post(`/api/v1/elections/${idcandi}/pollingStation`,{pollingStations_name,election_id})
    showTaskscandi()
    taskInputDOMcandi.value = ''
    ageInputDOMcandi.value = ''
    partyInputDOMcandi.value = ''
    formAlertDOMcandi.style.display = 'block'
    formAlertDOMcandi.textContent = `success, task added`
    formAlertDOMcandi.classList.add('text-success')
  } catch (error){
    formAlertDOMcandi.style.display = 'block'
    formAlertDOMcandi.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOMcandi.style.display = 'none'
    formAlertDOMcandi.classList.remove('text-success')
  }, 3000)
})
