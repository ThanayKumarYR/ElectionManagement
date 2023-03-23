const taskIDDOMcandi = document.querySelector('.task-edit-id')
const taskDateDOMcandi = document.querySelector('.task-edit-date')
const taskNameDOMcandi = document.querySelector('.task-edit-name')
const ageInputDOMcandi = document.querySelector('.task-edit-age')
const genderInputDOMcandi = document.querySelector('input[name=gender]:checked')
const partyInputDOMcandi = document.querySelector('.task-edit-party')
const taskCompletedDOMcandi = document.querySelector('.task-edit-completed')
const editFormDOMcandi = document.querySelector('.single-task-form')
const editFormTitleDOMcandi = document.querySelector('.single-task-form-title')
const editIDTitleDOM = document.querySelector('.task-edit-id-title')
const editNameTitleDOMcandi = document.querySelector('.task-edit-name-title')
const editBtnDOMcandi = document.querySelector('.task-edit-btn')
const editDate =  document.getElementById('edit-date');
const setMaleDom = document.getElementById('genderMale')
const setFemaleDom = document.getElementById('genderFemale')
const formAlertDOMcandi = document.querySelector('.form-alert')
const editAge = document.getElementById('edit-age')
const editGenderMale = document.getElementById('edit-genderMale')
const editGenderFemale = document.getElementById('edit-genderFemale')
const editParty = document.getElementById('edit-party')
const editdate = document.getElementById('edit-date')
const backLink = document.getElementById('back-link')
const paramscandi = window.location.search
const idcandi = new URLSearchParams(paramscandi).get('id')
const pid = new URLSearchParams(paramscandi).get('pid')
let tempNamecandi

editFormTitleDOMcandi.textContent = "Edit PollingStation";
editIDTitleDOM.textContent = "PollingID"
editNameTitleDOMcandi.textContent = "StationName";
editDate.style.display = "none";
editAge.style.display = "none"
editGenderMale.style.display = "none"
editGenderFemale.style.display = "none"
editParty.style.display = "none"
const showTaskcandi = async () => {
  try {
    const {
      data: { pollingStation },
    } = await axios.get(`/api/v1/elections/${idcandi}/pollingStation/${pid}`)
    const { _id: pollingStationID, pollingStations_name,election_id} = pollingStation 

    taskIDDOMcandi.textContent = pollingStationID
    taskNameDOMcandi.value = pollingStations_name
    tempNamecandi = pollingStations_name
    backLink.href =`index.html?id=${election_id}&&page=pollingStation`
  } catch (error) {
    console.log(error)
  }
}

showTaskcandi()

editFormDOMcandi.addEventListener('submit', async (e) => {
  editBtnDOMcandi.textContent = 'Loading...'
  e.preventDefault()
  try {
    const pollingStationName = taskNameDOMcandi.value
    const {data: {pollingStation}} = await axios.patch(`/api/v1/elections/${idcandi}/pollingStation/${pid}`, {pollingStations_name: pollingStationName})

    const { _id: pollingStationID, pollingStations_name} = pollingStation

    taskIDDOMcandi.textContent = pollingStationID
    taskNameDOMcandi.value = pollingStations_name
    tempNamecandi = pollingStations_name
    formAlertDOMcandi.style.display = 'block'
    formAlertDOMcandi.textContent = `success, edited election`
    formAlertDOMcandi.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOMcandi.value = tempNamecandi
    formAlertDOMcandi.style.display = 'block'
    formAlertDOMcandi.innerHTML = `error, please try again`
  }
  editBtnDOMcandi.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOMcandi.style.display = 'none'
    formAlertDOMcandi.classList.remove('text-success')
  }, 3000)
})
