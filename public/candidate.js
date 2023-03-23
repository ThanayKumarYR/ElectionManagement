const tasksDOMcandi = document.querySelector('.tasks')
const loadingDOMcandi = document.querySelector('.loading-text')
const formDOMcandi = document.querySelector('.task-form')
const taskInputDOMcandi = document.querySelector('.task-input')
const ageInputDOMcandi = document.querySelector('.task-input-age')
const partyInputDOMcandi = document.querySelector('.task-input-party')
const formAlertDOMcandi = document.querySelector('.form-alert')
const titleDOMcandi =  document.querySelector('.task-form-title')
const backLink = document.getElementById('back-link');
const params = window.location.search
const idcandi = new URLSearchParams(params).get('id');
// Load tasks from /api/tasks

titleDOMcandi.textContent = "Candidate Inputs";
taskInputDOMcandi.placeholder = "e.g. Sujan A T";
backLink.href = "index.html"

const showTaskscandi = async () => {
  loadingDOMcandi.style.visibility = 'visible'
  try {
    const {
      data: { candidate },
    } = await axios.get(`/api/v1/elections/${idcandi}/Candidates`)
    if (candidate.length < 1) {
      tasksDOMcandi.innerHTML = '<h5 class="empty-list">No Candidates in your list</h5>'
      loadingDOMcandi.style.visibility = 'hidden'
      return
    }
    const allelections = candidate
      .map((candi) => {
        const {  _id: CandidateID, Candidate_name,Candidate_age,Candidate_gender,Party, election_id} = candi
        return `<div class="single-task ${ 'task-completed'}">
          <h5><span><i class="far fa-check-circle"></i></span>Name:${Candidate_name},  Age:${Candidate_age}, Gender:${Candidate_gender}, Party:${Party} </h5>
         <div class="task-links">
         <!-- edit link -->
        <a href="task.html?id=${election_id}&&page=Candidates&&cid=${CandidateID}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
         <!-- delete btn -->
        <button type="button" class="delete-btn" data-cid="${CandidateID}">
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
    const cid = el.parentElement.dataset.cid
    try {
      await axios.delete(`/api/v1/elections/${idcandi}/Candidates/${cid}`)
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
  const Candidate_name = taskInputDOMcandi.value
  const Candidate_age = Number(ageInputDOMcandi.value)
  const genderInputDOMcandi = document.querySelector('input[name="gender"]:checked')
  const Candidate_gender = genderInputDOMcandi.value
  const Party = partyInputDOMcandi.value
  const election_id = idcandi
  
  try {
    await axios.post(`/api/v1/elections/${idcandi}/Candidates`,{Candidate_name,Candidate_age,Candidate_gender,Party,election_id})
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
