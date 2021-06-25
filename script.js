// WANT TO
const wantToForm = document.querySelector('#want-to-form')
const wantToInputField = document.querySelector('#want-to-input-field')
const wantToContainer = document.querySelector('#want-to-container')

// VISITED
const visitedForm = document.querySelector('#visted-form')
const visitedInputField = document.querySelector('#visited-input-field')
const visitedContainer = document.querySelector('#visted-container')

//GET INFO
const getInfoForm = document.querySelector('#country-info-form')
const getInfoInput = document.querySelector('#country-info-input')

const nameHolder = document.querySelector('#name-container')
const flagHolder = document.querySelector('#flag-container')
const languagesHolder = document.querySelector('#language-container')
const currencyHolder = document.querySelector('#currency-container')
const borderingCountriesHolder = document.querySelector('#bordering-countries-container')


//EVENT LISTENERS
wantToForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newName = wantToInputField.value
    fetch(`http://localhost:3000/want`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newName
        }),
    })
        .then(res => res.json())
        .then(countryObj => {
            let newWantToCountryLi = document.createElement('li')
            newWantToCountryLi.innerHTML = `<span>${countryObj.name.toUpperCase()}</span><button>X</button>`
            wantToContainer.append(newWantToCountryLi)

            let deleteButton = newWantToCountryLi.querySelector('button')
            deleteButton.setAttribute('style', 'background-color:#af4c4c; color: white; font-size: 9px')
            deleteButton.addEventListener('click', () => {
                deleteWantToCountry(countryObj, newWantToCountryLi)
            })
        })
    e.target.reset()
})

getInfoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    countryName = getInfoInput.value
    getOneCountry(countryName)
    e.target.reset()
})

visitedForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newName = visitedInputField.value
    fetch(`http://localhost:3000/visited`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newName
        }),
    }).then(res => res.json())
        .then(countryObj => {
            let newVisitedCountryLi = document.createElement('li')
            newVisitedCountryLi.innerHTML = `<span>${countryObj.name.toUpperCase()}</span><button>X</button>`
            visitedContainer.append(newVisitedCountryLi)

            let deleteButton = newVisitedCountryLi.querySelector('button')
            deleteButton.setAttribute('style', 'background-color:#af4c4c; color: white; font-size: 9px')
            deleteButton.addEventListener('click', () => {
                deleteVisitedCountry(countryObj, newVisitedCountryLi)
            }
            )
        }
        )
    e.target.reset()
})


//GET COUNTRIES
function getWantToCountries() {
    fetch('http://localhost:3000/want')
        .then(res => res.json())
        .then(arrayOfCountries => renderWantToCountries(arrayOfCountries))
}

function getOneCountry(countryName) {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(res => res.json())
        .then(countryObj => renderCountryInfo(countryObj))
}

function getVisitedCountries() {
    fetch('http://localhost:3000/visited')
        .then(res => res.json())
        .then(arrayOfCountries => renderVisitedCountries(arrayOfCountries))
}

//RENDER COUNTRIES
function renderWantToCountries(arrayOfCountries) {
    arrayOfCountries.forEach(countryObj => {
        let wantToCountryLi = document.createElement('li')
        wantToCountryLi.innerHTML = `<span>${countryObj.name.toUpperCase()}</span><button>X</button>`
        wantToContainer.append(wantToCountryLi)

        let deleteButton = wantToCountryLi.querySelector('button')
        deleteButton.setAttribute('style', 'background-color:#af4c4c;color: white;font-size: 9px')
        deleteButton.addEventListener('click', () => {
            deleteWantToCountry(countryObj, wantToCountryLi)
        })
    }
    )
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

function renderVisitedCountries(arrayOfCountries) {
    arrayOfCountries.forEach(countryObj => {
        let visitedCountryLi = document.createElement('li')
        visitedCountryLi.innerHTML = `<span>${countryObj.name.toUpperCase()}</span><button>X</button>`
        visitedContainer.append(visitedCountryLi)

        let deleteButton = visitedCountryLi.querySelector('button')
        deleteButton.setAttribute('style', 'background-color:#af4c4c;color: white;font-size: 9px')
        deleteButton.addEventListener('click', () => {
            deleteVisitedCountry(countryObj, visitedCountryLi)
        })
    }
    )
}

//DELETE COUNTRIES
function deleteWantToCountry(countryObj, wantToCountryLi) {
    fetch(`http://localhost:3000/want/${countryObj.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(wantToCountryLi.remove())
}

function deleteVisitedCountry(countryObj, visitedCountryLi) {
    fetch(`http://localhost:3000/visited/${countryObj.id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(visitedCountryLi.remove())
}

// FUNCTION INVOCATIONS
getWantToCountries()
getVisitedCountries()