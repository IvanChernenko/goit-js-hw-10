import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountryByName } from './fetch.js'

const DEBOUNCE_DELAY = 300;

 const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  list: document.querySelector('.country-list')
 }

function isEmpty(str) {
    return str.trim() === ''
 }
let prevValue = '';
refs.input.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY))
function countryName(e) {
    refs.countryInfo.innerHTML = '';
    refs.list.innerHTML = '' 
    const countryToFind = e.target.value;
    if (prevValue.length > countryToFind.length) {
        fetchCountryByName(countryToFind) 
    }
    prevValue = countryToFind;
    if (isEmpty(countryToFind)) {
        return
    }else{
    fetchCountryByName(countryToFind)
    
      .then(r => {
        
        if (r.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');            
        } else if (r.length > 1) {
          r.map(el => {
            const li = document.createElement('li')
            li.innerHTML = `<img src="${el.flags.svg}" alt="" class="flag" width=50px> ${el.name.official}`
            refs.list.append(li)
          })
        } else if (r.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        else {
          
          const markup = renderCountryCard(r[0])
          addLiToList(markup)
            }
        
    })
    }
}
function renderCountryCard({flags: {svg}, name: {official}, capital, population, languages}) {
    const language = Object.values(languages)
    const cap = capital.join('')
  return `
  <div class="card">
      <div class="wrapper">
          <img src="${svg}" alt="" class="flag" width=50px>
          <h1 class="country">${official} </h1>
      </div>
      <p class="capital">Capital: ${cap}</p>
      <p class="population">Population: ${population}</p>
      <p class="language">Language: ${language}</p>
  </div>
   `
}
const addLiToList = (markdown) => {
  refs.countryInfo.insertAdjacentHTML('beforeend', markdown)
}