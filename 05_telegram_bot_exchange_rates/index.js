const telegramBot = require('node-telegram-bot-api');
const axios = require('axios')
const NodeCache = require('node-cache')


const token = '6438904845:AAH46TVBo5xk25_MUWxtp77UdCzuu_fXH-4'

const bot = new telegramBot(token, {polling : true})
const cache = new NodeCache({stdTTL: 3600})
let chatId;
let selectedCurrency;

bot.onText(/^\/start/, (msg)=>{
    chatId = msg.chat.id
    const options = {
        reply_markup: {
            keyboard: [
                ['USD', 'EUR'],

            ],
        },
    }

    bot.sendMessage(chatId, 'Welcome! Choose the currency: ', options)
})

bot.onText(/(USD|EUR)/i, (msg)=>{
    selectedCurrency = msg.text
    console.log(selectedCurrency)
    const options ={
        reply_markup: {
            keyboard: [
                ['every 3 hours', 'every 6 hours'],
                ['RESET']
            ],

        },
    }
    bot.sendMessage(chatId, 'Choose the interval:', options)
})

bot.onText(/(every 3 hours|every 6 hours)/i, (msg)=>{
    const interval = msg.text === 'Update every 3 hours' ? 10800000 : 21600000 ;
    sendCurrency(interval)
})

bot.onText(/(RESET)/i, (msg)=>{
    const options ={
        reply_markup:{
            keyboard:[
                ['USD', 'EUR']
            ]
        }
    }
    bot.sendMessage(chatId, 'Currency and interval reset. Choose the currency:', options);
    selectedCurrency = null;
})

function sendCurrency (interval){
    const apiURl = `https://api.monobank.ua/bank/currency`

    function getAndSendCurrency(){
        axios
    .get(apiURl)
    .then((response)=>{
        const dataResult = response.data
        const currency = selectedCurrency === "USD" ? 840: 978
        console.log(currency + 'cur')
        const cacheKey = `${currency}_exchange_rates`

        if(cache.has(cacheKey)){
            const exchangeRates = cache.get(cacheKey)
            const {currencyBuy, currencySell} = exchangeRates
            const message = `${currency}\n Rate Buy: ${currencyBuy}\n Rate Sell: ${currencySell}`
            bot.sendMessage(chatId, message)
        }else{
            const currencyBuy = dataResult.find(item => item.currencyCodeA===currency).rateBuy
            const currencySell = dataResult.find(item => item.currencyCodeA===currency).rateSell
            cache.set(cacheKey, {currencyBuy, currencySell})
            const message = `Current ${selectedCurrency} exchange rate\n Rate Buy: ${currencyBuy}\n Rate Sell: ${currencySell}`
            bot.sendMessage(chatId, message)
        }

    })
    .catch((error)=>{
        bot.sendMessage(chatId, 'Error while getting the currency')
    })
    }
    getAndSendCurrency()
    setInterval(getAndSendCurrency, interval);
}
