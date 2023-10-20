const { type } = require("os");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userInput(){
    rl.question('Hello. Enter 10 words or digits deviding them in spaces or write exit:', (answer) => {
        if(answer.toLowerCase() === "exit"){
            rl.close()
        }else{
            chooseOption(answer)
        }
    });
}


function chooseOption(input) {
    const list = input.split(' ')
    rl.question('How would you like to sort the values:\n1.Sort words alphabetically\n2.Show numbers from lesser to greater\n3.Show numbers from bigger to smaller\n4.Display words in ascending order by number of letters in the word\n5.Show only unique words\n6.Display only unique values from the set of words and numbers entered by the user', (option)=>{
        option = Number(option)
        if (option >=1 && option <=6){
            sorting(list, option)
        }else{
            console.log("Wrong number")
            chooseOption(input)
        }
    })
}

function sorting (list, option){
    switch(option){
        case 1:
            console.log(list.sort().join(' '))
            break
        case 2:
            console.log(list.filter(item => !isNaN(item)).sort((a, b) => a-b).join(' '))
            break
        case 3:
            console.log(list.filter(item => !isNaN(item)).sort((a, b) => b-a).join(' '))
            break
        case 4:
            console.log(list.filter(item => !isNaN(item)).sort((a, b) =>a.length-b.length).join(' '))
            break
        case 5:
            console.log(uniqueWords(list))
        case 6:
            const uniqueSymbols = list.filter((value, index, self) => self.indexOf(value)===index)
            console.log(uniqueSymbols.join(' '))
    }
    userInput()
}

function uniqueWords(array){
    let returnArray = []
    for(let i=0; i<array.length ; i++){
        if(isNaN(array[i]) && !returnArray.includes(array[i])){
            returnArray.push(array[i])
        }
    }
    return returnArray
}

userInput()