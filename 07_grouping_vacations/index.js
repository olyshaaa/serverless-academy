const fs = require('fs')

const inputJson = require('./data.json')

const formattedData = {}

for(const element of inputJson){
    const userId = element.user._id
    const userName = element.user.name
    const startDay = element.startDate
    const endDate = element.endDate

    if(!formattedData[userId]){
        formattedData[userId]={
            userId: userId,
            userName: userName,
            vacations : []
        }
    }

    formattedData[userId].vacations.push({
        startDate: startDay,
        endDate: endDate
    })
}

const outputJson = Object.values(formattedData)

const outputJsonString = JSON.stringify(outputJson, null, 2)
fs.writeFileSync('formatted_data.json', outputJsonString)

console.log('succcess')
