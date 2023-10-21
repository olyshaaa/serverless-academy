import inquirer from 'inquirer';
import fs from 'fs'


const usersFile = 'info.txt'

let allUsers = []

const loadUsers = ()=>{
    try{
        const data = fs.readFileSync(usersFile, 'utf8').split('\n')
        allUsers = data.filter(user => user.trim() !== '').map(user => JSON.parse(user))
    }catch(error){
        console.log('Error loading user data: ' + error)
    }
}

const createuser =()=> {
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'name',
        message: "Enter the user's name. To cancel press ENTER: ",

    }
  ])
  .then((answers) => {
    if(!answers.name){
        searchUser()
    }else{inquirer
        .prompt([
            {
                type: 'list',
                name: 'gender',
                message: "Choose your Gender",
                choices: ['male', 'female']
            },
            {
                type: 'number',
                name: 'age',
                message: "Enter your age",
            }
          ])
          .then((userAnswers) =>{
            const user = {
                name: answers.name,
                gender: userAnswers.gender,
                age: userAnswers.age
            }
            addUser(user)
            createuser()

          })}

  })
  ;

}

const addUser = (user) =>{
    fs.appendFileSync(usersFile, JSON.stringify(user)+'\n')
    allUsers.push(user)
    console.log('all users')
    console.log(allUsers)
}


const searchUser = (info) =>{
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'searchUser',
            message: 'Would you to search the values in DB? (y/n)'
        }
    ])
    .then((answers) =>{
        if(answers.searchUser.toLowerCase() === "n"){
            process.exit()
        }else{
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'searchUserName',
                    message: "Enter user's name you wanna find in DB: "
                }
            ])
            .then((searchInfo) =>{
                const searchName = searchInfo.searchUserName.toLowerCase()
                const findUser = allUsers.filter((user) =>
                    user.name.toLowerCase().includes(searchName)
                )

                if (findUser.length>0){
                    console.log(`User ${searchName} was found.`)
                    console.log(findUser)
                }else{
                    console.log(`Users ${searchName} wasn't found.`)
                }
            })
        }
    })
}
loadUsers()
createuser()