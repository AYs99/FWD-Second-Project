/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
let key = '&appid=72a43686b000455fa5fff25e935f2726&units=metric';
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// button event listener
button.addEventListener('click', performAction);
// Button callback function
function performAction (event) {
    const code = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemp(baseURL, code, key)
    .then(function (data){
        console.log(data);
        postData('/add', {temp: data.list[0].main.temp, date: newDate, userResponse: feelings } )
        .then(function() {
            updateUI()
        })
    })
}

// GET request to the OpenWeatherMap API
const getTemp = async (baseURL, code, key) => {
    const res = await fetch(baseURL+code+key);
    try {
        const userData = await res.json();
        return userData;
      } catch{
          console.log("error", error);
      }

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
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `The temperature now is ${allData.temp} degrees`;
        document.getElementById('date').innerHTML = `The date is ${allData.date}`;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch (error) {
        console.log('error', error);
    }
}