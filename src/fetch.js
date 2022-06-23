export function fetchCountryByName() {}

const BASE_URL = 'https://restcountries.com/v3.1'

function fetchCountryByName(countryName) {
    const url = `${BASE_URL}/name/${countryName}`
    return fetch(url).then(response => {
        if (response.ok) {
           return response.json()
        } else {
            throw new Error()
        }
    }).catch(err => [])
}