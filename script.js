const getInfoForm = document.querySelector('#country-info-form')
const getInfoInput = document.querySelector('#country-info-input')

const nameHolder = document.querySelector('#name-container')
const flagHolder = document.querySelector('#flag-container')
const languagesHolder = document.querySelector('#language-container')
const currencyHolder = document.querySelector('#currency-container')
const borderingCountriesHolder = document.querySelector('#bordering-countries-container')


const visitedForm = document.querySelector('#visted-form')
const visitedInputField = document.querySelector('#visited-input-field')
const visitedContainer = document.querySelector('#visted-container')

const wantToForm = document.querySelector('#want-to-form')
const wantToInputField = document.querySelector('#want-to-input-field')
const wantToContainer = document.querySelector('#want-to-container')



getInfoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    countryName = getInfoInput.value
    getOneCountry(countryName)
    e.target.reset()
})

visitedForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let addedVisitedCountry = document.createElement('li')
    addedVisitedCountry.textContent = visitedInputField.value
    visitedContainer.append(addedVisitedCountry)
    e.target.reset()
})

wantToForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let addedWantToCountry = document.createElement('li')
    addedWantToCountry.textContent = wantToInputField.value
    wantToContainer.append(addedWantToCountry)
    e.target.reset()
})

function getOneCountry(countryName) {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(res => res.json())
        .then(countryObj => renderCountryInfo(countryObj))
}

function renderCountryInfo(countryObj) {
    nameHolder.innerHTML = ''
    flagHolder.innerHTML = ''
    languagesHolder.innerHTML = ''
    currencyHolder.innerHTML = ''
    borderingCountriesHolder.innerHTML = ''

    let countryNameH5 = document.createElement('h5')
    let flagImage = document.createElement('img')
    let languagesList = document.createElement('ul')
    let currencyList = document.createElement('ul')

    countryNameH5.textContent = countryObj[0].name
    flagImage.src = countryObj[0].flag
    languagesList.textContent = countryObj[0].languages[0].name
    currencyList.textContent = countryObj[0].currencies[0].name

    nameHolder.append(countryNameH5)
    flagHolder.append(flagImage)
    languagesHolder.append(languagesList)
    currencyHolder.append(currencyList)
    countryObj[0].borders.forEach(element => {
        let borderingCountryLi = document.createElement('li')
        borderingCountryLi.textContent = element
        borderingCountriesHolder.append(borderingCountryLi)
    }
    )
}