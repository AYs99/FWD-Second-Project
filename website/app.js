/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '&apikey=cxe3i57rjwdfd834rfdjwe746';
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET request to the OpenWeatherMap API
const getTemp = async (baseURL, code, key) => {
    const res = await fetch(baseURL + code + key);
    try {
        const userData = await res.json();
        return userData;
      } catch{
          console.log("error", error);
      }

}

// button event listener
button.addEventListener('click', generate);
// Button callback function
const generate = function (event) {
    const code = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemp(baseURL, code, key)
    .then(function (data){
        postData('http://localhost:3000/add', {temp: data.main.temp, date: newDate, userResponse: feelings } )
        .then(function() {
            updateUI()
        })
    })
}

// POST request to add the API data
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

const updateUI = async () => {
    const request = await fetch('http://localhost:3000/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch (error) {
        console.log('error', error);
    }
}