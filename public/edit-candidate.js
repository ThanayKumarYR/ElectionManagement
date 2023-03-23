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
const backLink = document.getElementById('back-link')
const paramscandi = window.location.search
const idcandi = new URLSearchParams(paramscandi).get('id')
const cid = new URLSearchParams(paramscandi).get('cid')
let tempNamecandi
let tempAgecandi
let tempGendercandi
let tempParty

editFormTitleDOMcandi.textContent = "Edit Candidate";
editIDTitleDOM.textContent = "Candidate ID"
editNameTitleDOMcandi.textContent = "CandidateName";
editDate.style.display = "none";
const showTaskcandi = async () => {

  try {
    const {
      data: { candidate },
    } = await axios.get(`/api/v1/elections/${idcandi}/Candidates/${cid}`)
    const { _id: candidateID, Candidate_name , Candidate_age,Candidate_gender,Party,election_id} = candidate 

    taskIDDOMcandi.textContent = candidateID
    taskNameDOMcandi.value = Candidate_name
    ageInputDOMcandi.value = Candidate_age
    if(Candidate_gender==='M')
      setMaleDom.checked = true;
    else setFemaleDom.checked = true
    partyInputDOMcandi.value = Party
    tempNamecandi = Candidate_name
    tempAgecandi = Candidate_age
    tempGendercandi= Candidate_gender
    tempParty = Party
    backLink.href =`index.html?id=${election_id}&&page=Candidates`
  } catch (error) {
    console.log(error)
  }
}

showTaskcandi()

editFormDOMcandi.addEventListener('submit', async (e) => {
  editBtnDOMcandi.textContent = 'Loading...'
  e.preventDefault()
  try {
    const candidateName = taskNameDOMcandi.value
    const CandidateAge = Number(ageInputDOMcandi.value)
    const genderInputDOMcandi = document.querySelector('input[name="edit-gender"]:checked')
    const CandidateGender = genderInputDOMcandi.value
    const party = partyInputDOMcandi.value
    const {data: {candidate}} = await axios.patch(`/api/v1/elections/${idcandi}/Candidates/${cid}`, {Candidate_name: candidateName,Candidate_age:CandidateAge,Candidate_gender:CandidateGender,Party:party})

    const { _id: candidateID, Candidate_name,Candidate_age,Candidate_gender,Party} = candidate

    taskIDDOMcandi.textContent = candidateID
    taskNameDOMcandi.value = Candidate_name
    ageInputDOMcandi.value = Candidate_age
    if(Candidate_gender==='M')
      setMaleDom.checked = true;
    else setFemaleDom.checked = true
    partyInputDOMcandi.value = Party
    tempNamecandi = Candidate_name
    tempAgecandi = Candidate_age
    tempGendercandi= Candidate_gender
    tempParty = Party
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
