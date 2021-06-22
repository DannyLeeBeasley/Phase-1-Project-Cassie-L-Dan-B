fetch('https://restcountries.eu/rest/v2/name/italy')
.then(res => res.json())
.then(console.log)