import { MY_API_KEY } from './config.js';
let covid19data;

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getJoke();
    getCurrencyExchangeRates();
    getLatestCOVID19Data();
})();

function setButtonFunctions()
{
    document.getElementById('buttonGetJoke').onclick = getJoke;
    document.getElementById('buttonCurrency').onclick = getCurrencyExchangeRates;
    document.getElementById('countries').onchange = function() {
        const selectedValue = document.getElementById('countries').value;
        const countryData = covid19data.filter(c => c.country == selectedValue)[0];

        // display data
        const newConfirmed = document.getElementById('covidNewConfirmed');
        const totalConfirmed = document.getElementById('covidTotalConfirmed');
        const covidNewDeaths = document.getElementById('covidNewDeaths');
        const covidTotalDeaths = document.getElementById('covidTotalDeaths');
        const lastUpdated = document.getElementById('covidLastUpdate');

        (countryData.cases.new) ? newConfirmed.innerHTML = 'New confirmed cases: ' + countryData.cases.new : newConfirmed.innerHTML = 'New confirmed cases: 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = 'Total confirmed cases: ' + countryData.cases.total : totalConfirmed.innerHTML = 'Total confirmed cases: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = 'New deaths: ' + countryData.deaths.new : covidNewDeaths.innerHTML = 'New deaths: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = 'Total deaths: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = 'Total deaths: 0';
        lastUpdated.innerHTML = 'Last updated: ' + countryData.day;
    };
}

// Chuck Norris jokes
async function getJoke()
{
    await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY,
            "accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Chuck Norris API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('joke').innerHTML = response.value;
        document.getElementById('jokeIcon').src = response.icon_url;
        document.getElementsByClassName('jokeTitle')[0].href = response.url;
    })
    .catch(err => {
        console.log(err);
    });
}

// Currency Exchange rates
async function getCurrencyExchangeRates()
{
    const from = document.getElementById('inputCurrencyFrom').value;
    const to = document.getElementById('inputCurrencyTo').value;
    await fetch("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=" + from + "&to=" + to, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Currency Exchange API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('currencyResult').innerHTML = 'Result: ' + response;
    })
    .catch(err => {
        console.log(err);
    });
}

// COVID 19 Data
async function getLatestCOVID19Data()
{
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("COVID 19 API object:");
        console.log(response);
        console.log("\n");

        // add all countries to select element
        response.response.forEach(c => {
            const option = document.createElement('option');
            option.innerHTML = c.country;
            document.getElementById('countries').appendChild(option);
        })

        // save covid data to global variable
        covid19data = response.response;
    })
    .catch(err => {
        console.log(err);
    });
}