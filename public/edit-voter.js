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
const editPartyDom = document.getElementById('edit-party')
const formAlertDOMcandi = document.querySelector('.form-alert')
const backLink = document.getElementById('back-link')
const paramscandi = window.location.search
const idcandi = new URLSearchParams(paramscandi).get('id')
const vid = new URLSearchParams(paramscandi).get('vid')
let tempNamecandi
let tempAgecandi
let tempGendercandi


editFormTitleDOMcandi.textContent = "Edit Voters";
editIDTitleDOM.textContent = "Voters ID"
editNameTitleDOMcandi.textContent = "VoterName";
editDate.style.display = "none";
editPartyDom.style.display = "none";
const showTaskcandi = async () => {

  try {
    const {
      data: { voter},
    } = await axios.get(`/api/v1/elections/${idcandi}/Voters/${vid}`)
    const { _id: votersID, Voters_name , Voters_age,Voters_gender,election_id} = voter

    taskIDDOMcandi.textContent = votersID
    taskNameDOMcandi.value =Voters_name 
    ageInputDOMcandi.value =  Voters_age
    if(Voters_gender==='M')
      setMaleDom.checked = true;
    else setFemaleDom.checked = true
    tempNamecandi = Voters_name 
    tempAgecandi = Voters_age
    tempGendercandi= Voters_gender
    backLink.href =`index.html?id=${election_id}&&page=Voters`
  } catch (error) {
    console.log(error)
  }
}

showTaskcandi()

editFormDOMcandi.addEventListener('submit', async (e) => {
  editBtnDOMcandi.textContent = 'Loading...'
  e.preventDefault()
  try {
    const VotersName = taskNameDOMcandi.value
    const VotersAge = Number(ageInputDOMcandi.value)
    const genderInputDOMcandi = document.querySelector('input[name="edit-gender"]:checked')
    const VotersGender = genderInputDOMcandi.value
    const {data: {voter}} = await axios.patch(`/api/v1/elections/${idcandi}/Voters/${vid}`, {Voters_name: VotersName,Voters_age:VotersAge,Voters_gender:VotersGender})

    const { _id: VoterID, Voters_name,Voters_age,Voters_gender} = voter

    taskIDDOMcandi.textContent = VoterID
    taskNameDOMcandi.value = Voters_name
    ageInputDOMcandi.value = Voters_age
    if(Voters_gender==='M')
      setMaleDom.checked = true;
    else setFemaleDom.checked = true
    tempNamecandi = Voters_name
    tempAgecandi = Voters_age
    tempGendercandi= Voters_gender
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
