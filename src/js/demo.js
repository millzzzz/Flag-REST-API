/* eslint-disable */
function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function fetchData() {
  //I have to separate the fetching part
  fetch(
      'https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital',
    )
    .then((res) => res.json())
    .then((data) => {
      data = shuffle(data);
      createElements(data);
    })
    .catch((error) => console.error(error));
}

function createElements(data){
  for (obj of data) {
    const url = obj.flag;
    const country = obj.name;
    const population = obj.population;
    const region = obj.region;
    const capital = obj.capital;
    const flexChild = document.createElement('div');
    flexChild.className = 'main__flags--child';
    flexChild.innerHTML = `
          <div class="flag-div"><img class="flag-img" src="${url}" width="100%" height="100%" alt="flag">
          </div>
           <div class="content">
           <h1 style="padding: 15px 0;">${country}</h1>
          <p>Population: ${population}</p>
          <p>Region: ${region}</p>
          <p>Capital: ${capital}</p>
          </div>`;
    // eslint-disable-next-line no-undef
    document
      .querySelector('div.main__flags')
      .appendChild(flexChild);
  }
}

// }
// function filterByRegion() {}
// function search() {}

// function sortByAfrica(data) {
//   data.sort(function (a, b) {
//     return parseFloat(a.price) - parseFloat(b.price);
//   });
//   console.log(sortArray.sort((a, b) => {
//     if (a.region < b.region)
//       return -1;
//     if (a.region > b.region)
//       return 1;
//     return 0;
//   }));
// }

// eslint-disable-next-line no-undef
window.onload = fetchData;

/**
 * TODO: don't show the same anymore - parse them into an array and if the array includes then create a new random number
 * TODO: what would happen if you search for something that isn't generated yet though
 * TODO: You can infinitively scroll up or down
 */