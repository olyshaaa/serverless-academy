const telegramBot = require('node-telegram-bot-api');
const axios = require('axios')

const token = '6893013573:AAGYnw6goFK2pbH_UF4KRXFsDKqz0G6GRhU'
const openWeatherKey = '4c1580ee5cae9eac6b36dce656ab49ae'

const bot = new telegramBot(token, {polling : true})
let chatId;

bot.onText(/^\/start/, (msg)=>{
    chatId = msg.chat.id
    const options = {
        reply_markup: {
            keyboard: [
                ['Odesa']
            ],

        },
    }

    bot.sendMessage(chatId, 'Welcome! Choose the city: ', options)
})

bot.onText(/Odesa/, (msg)=>{
    const options ={
        reply_markup: {
            keyboard: [
                ['every 3 hours', 'every 6 hours']
            ],

        },
    }
    bot.sendMessage(chatId, 'Choose the interval:', options)
})

bot.onText(/every 3 hours/, (msg)=>{
    sendWeather(10800000)
})
bot.onText(/every 6 hours/, (msg)=>{
    sendWeather(21600000)
})

let isFirstMessage = true;
function sendWeather (interval){
    const city = 'Odesa'
    const apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherKey}`

    function getAndSendWeather(){
        axios
    .get(apiURl)
    .then((response)=>{
        const forecast = response.data
        const mainWeather = forecast.weather[0].description
        const temperature = (forecast.main.temp -272.15).toFixed(1);
        const temperatureFeels = (forecast.main.feels_like-272.15).toFixed(1);
        const tempMin = (forecast.main.temp_min-272.15).toFixed(1);
        const tempMax = (forecast.main.temp_max-272.15).toFixed(1);
        const wind = forecast.wind.speed
        const humidity = forecast.main.humidity
        const message = `The weather in ${city}\nNow is ${mainWeather}\nTemperature:${temperature}°C, feels like: ${temperatureFeels}°C\nMin temperature:${tempMin}°C, Max temperature:${tempMax}°C\nWind speed:${wind}m/s, Humidity:${humidity}%`
        bot.sendMessage(chatId, message)




    })
    .catch((error)=>{
        bot.sendMessage(chatId, 'Error while getting the weather')
    })
    }
    getAndSendWeather()
    setInterval(getAndSendWeather, interval);
}
