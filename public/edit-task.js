const taskIDDOM = document.querySelector('.task-edit-id')
const taskDateDOM = document.querySelector('.task-edit-date')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editFormTitleDOM = document.querySelector('.single-task-form-title')
const editIDTitleDOM = document.querySelector('.task-edit-id-title')
const editNameTitleDOM = document.querySelector('.task-edit-name-title')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const editName = document.getElementById('edit-name')
const editAge = document.getElementById('edit-age')
const editGenderMale = document.getElementById('edit-genderMale')
const editGenderFemale = document.getElementById('edit-genderFemale')
const editParty = document.getElementById('edit-party')
const editdate = document.getElementById('edit-date')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

editFormTitleDOM.textContent = "Edit Election";
editIDTitleDOM.textContent = "Election ID"
editNameTitleDOM.textContent = "Election Name"
editAge.style.display = "none"
editGenderMale.style.display = "none"
editGenderFemale.style.display = "none"
editParty.style.display = "none"

const showTask = async () => {
  try {
    const {
      data: { election },
    } = await axios.get(`/api/v1/elections/${id}`)
    const { _id: electionID, election_name , election_date} = election

    taskIDDOM.textContent = electionID
    taskNameDOM.value = election_name
    const date = new Date(election_date).toUTCString();
    taskDateDOM.textContent = date
    tempName = election_name
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const electionName = taskNameDOM.value
    const {data: { election }} = await axios.patch(`/api/v1/elections/${id}`, {election_name: electionName})

    const { _id: electionID, election_name} = election

    taskIDDOM.textContent = electionID
    taskNameDOM.value = election_name
    tempName = election_name
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited election`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
