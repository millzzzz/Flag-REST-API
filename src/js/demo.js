/* eslint-disable */
function shuffle(array) {
  let i = array.length;
  let j = 0;
  let temp;

  // eslint-disable-next-line no-plusplus
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }
  return array;
}

function createElements(data) {
  for (obj of data) {
    const url = obj.flag;
    const country = obj.name;
    const population = obj.population;
    const { region } = obj;
    const capital = obj.capital;
    const flexChild = document.createElement('div');
    flexChild.className = 'main__flags--child';
    flexChild.innerHTML = `
          <div class="flag-div"><img class="flag-img" src="${url}" width="100%" height="100%" alt="flag">
          </div>
           <div class="content">
           <h1 style="padding: 15px 0;" class="search-country">${country}</h1>
          <p>Population: ${population}</p>
          <p>Region: ${region}</p>
          <p>Capital: ${capital}</p>
          </div>`;
    // eslint-disable-next-line no-undef
    document.querySelector('div.main__flags').appendChild(flexChild);
  }
}

function fetchData(urlLink) {
  // eslint-disable-next-line no-undef
  fetch(urlLink)
    .then((res) => res.json())
    .then((data) => {
      // eslint-disable-next-line no-param-reassign
      data = shuffle(data);
      // eslint-disable-next-line no-use-before-define
      createElements(data);
    })
    .catch((error) => console.error(error));
}

function refreshcCountries() {
  const elements = document.getElementsByClassName(
    'main__flags--child',
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// function searchByCountryName() {
//   let txtValue;
//   let filter = input.value.toUpperCase();
//   let elements = document.querySelectorAll('.content');

//   //I gotta loop through flexchild items actually
//   for (i = 0; i < elements.length; i++) {
//     h1 = elements[i].getElementsByTagName('h1')[0];
//     txtValue = h1.textContent || h1.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = '';
//     } else {
//       li[i].style.display = 'none';
//     }
//   }
// }
const dropDown = document.querySelector('.main__dropdown');
dropDown.addEventListener(
  'change',
  function () {
    refreshcCountries();
    if (this.value === '') {
      fetchData(
        'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
      );
    } else if (this.value === 'africa') {
      fetchData('https://restcountries.eu/rest/v2/region/africa');
    } else if (this.value === 'americas') {
      fetchData('https://restcountries.eu/rest/v2/region/americas');
    } else if (this.value === 'asia') {
      fetchData('https://restcountries.eu/rest/v2/region/asia');
    } else if (this.value === 'europe') {
      fetchData('https://restcountries.eu/rest/v2/region/europe');
    } else if (this.value === 'oceania') {
      fetchData('https://restcountries.eu/rest/v2/region/oceania');
    }
  },
  false,
);

// eslint-disable-next-line no-undef
window.onload = fetchData(
  'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
);

/** *
 * !: Is it an issue to keep the same display of the countries or random is fine?
 * TODO: Loading
 */
