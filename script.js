const visitedForm = document.querySelector('#visted-form')
const wantToForm = document.querySelector('#want-to-form')
const visitedContainer = document.querySelector('#visted-container')
const wantToContainer = document.querySelector('#want-to-container')
const visitedInputField = document.querySelector('#visited-input-field')
const wantToInputField = document.querySelector('#want-to-input-field')

visitedForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let addedVisitedCountry = document.createElement('li')
    addedVisitedCountry.textContent = visitedInputField.value
    visitedContainer.append(addedVisitedCountry)
})

wantToForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let addedWantToCountry = document.createElement('li')
    addedWantToCountry.textContent = wantToInputField.value
    wantToContainer.append(addedWantToCountry)
})

function getAllCountries(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(arrayOfCountries => console.log(arrayOfCountries))
}

// function getOneCountry(){
//     fetch('https://restcountries.eu/rest/v2/all')
//     .then(res => res.json())
//     .then(arrayOfCountries => arrayOfCountries.forEach(
//         countryObj => 
//     )))
// }

// function filterByLanguage(countryObj){
//     if (countryObj.languages.name === "English"){
//         const languageFilterContainer = document.querySelector('#language-filter-container')
//         languageFilterContainer.append(countryObj.name)
//     }
// }

// getAllCountries()