function shuffle(array) {
  let i = array.length;
  let j = 0;
  let temp;
  // eslint-disable-next-line no-cond-assign
  while ((i -= 1)) {
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
  data.forEach((obj) => {
    const url = obj.flag;
    const country = obj.name;
    const { population } = obj;
    const { region } = obj;
    const { capital } = obj;
    const flexChild = document.createElement('div');
    flexChild.className = 'main__flags--child';
    flexChild.innerHTML = `
          <div class="flag-div"><img class="flag-img" src="${url}" width="100%" height="100%" alt="flag">
          </div>
           <div class="content">
           <h1 class="search-country">${country}</h1>
          <p>Population: <span>${population}</span></p>
          <p>Region: <span>${region}</span></p>
          <p>Capital: <span>${capital}</span></p>
          </div>`;
    document.querySelector('div.main__flags').appendChild(flexChild);
  });
}

function fetchData(urlLink) {
  // eslint-disable-next-line no-console
  const errorMessage = console.error;
  fetch(urlLink)
    .then((res) => res.json())
    .then((data) => {
      shuffle(data);
      createElements(data);
    })
    .catch((error) => errorMessage(error));
}

function refreshcCountries() {
  const elements = document.getElementsByClassName(
    'main__flags--child',
  );
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

const input = document.getElementById('flag-search');
input.addEventListener('keyup', () => {
  let txtValue;
  let i;
  const filter = input.value.toUpperCase();
  const elements = document.querySelectorAll('.content');
  const flexChildren = document.querySelectorAll(
    '.main__flags--child',
  );

  for (i = 0; i < elements.length; i += 1) {
    // eslint-disable-next-line prefer-destructuring
    const h1 = elements[i].getElementsByTagName('h1')[0];
    txtValue = h1.textContent || h1.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      flexChildren[i].style.display = '';
    } else {
      flexChildren[i].style.display = 'none';
    }
  }
});

const dropDown = document.getElementById('dropdown');
dropDown.addEventListener(
  'change',
  () => {
    refreshcCountries();
    if (dropDown.value === '') {
      fetchData(
        'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
      );
    } else if (dropDown.value === 'africa') {
      fetchData('https://restcountries.eu/rest/v2/region/africa');
    } else if (dropDown.value === 'americas') {
      fetchData('https://restcountries.eu/rest/v2/region/americas');
    } else if (dropDown.value === 'asia') {
      fetchData('https://restcountries.eu/rest/v2/region/asia');
    } else if (dropDown.value === 'europe') {
      fetchData('https://restcountries.eu/rest/v2/region/europe');
    } else if (dropDown.value === 'oceania') {
      fetchData('https://restcountries.eu/rest/v2/region/oceania');
    }
  },
  false,
);

window.onload = fetchData(
  'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
);

/** *
 * !: Somehow in Europe the flags are of different sizes
 */
