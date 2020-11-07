const queryCall = "https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital";


// fetch('https://restcountries.eu/rest/v2/all?fields=flag;name;population;region;capital')
//     .then(res => res.json())
//     .then(data => console.log(data));


// fetch('https://restcountries.eu/rest/v2/all?fields=flag')
//     .then(res => res.blob())
//     .then(blob => {
//         let img = document.createElement('img');
//         img.setAttribute("src", blob);
//         img.width = "100%";
//         img.height = "100%";
//         document.getElementsByClassName('flag-div').appendChild('img');
//     });


fetch('https://restcountries.eu/rest/v2/all?fields=flag')
    .then(res => res.json())
    .then(data => {
        console.log(data[0].flag) // Prints result from `response.json()` in getRequest
        //   Object.keys(data).forEach((key) => {
        //     const div = document.querySelector('flag-div');
        //     var img = document.createElement("img");
        //     img.setAttribute("src", data[0]);
        //     div.appendChild(img);
        //     //append ele to parent div
        //   });
        let img = document.createElement('img');
        img.src = data[0].flag;
        document.getElementById('flag-div').appendChild('img');
    })
    .catch(error => console.error(error))


/**
 * TODO: Fetch data from the api call to display picture and other info - random? 
 * TODO: Do it on load, for 8 countries
 * TODO: figure out how to do the loading thingy? - scroll down and load or what
 *
 */