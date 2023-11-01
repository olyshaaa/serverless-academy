const fs = require('fs');

function readAndCountUsernames(filename) {
  const fileContent = fs.readFileSync(filename, 'utf8');
  const usernames = new Set(fileContent.split('-'));
  return usernames;
}

function uniqueValues() {
  const uniqueUsernames = new Set();
  for (let fileNum = 0; fileNum < 20; fileNum++) {
    const filePath = `files/out${fileNum}.txt`;
    const usernames = readAndCountUsernames(filePath);
    usernames.forEach((username) => uniqueUsernames.add(username));
  }
  return uniqueUsernames.size;
}

function existInAllFiles() {
  const firstFileUsernames = readAndCountUsernames('files/out0.txt');
  let commonUsernames = new Set(firstFileUsernames);

  for (let fileNum = 1; fileNum < 20; fileNum++) {
    const filePath = `files/out${fileNum}.txt`;
    const usernames = readAndCountUsernames(filePath);
    commonUsernames = new Set([...commonUsernames].filter(username => usernames.has(username)));
  }

  return commonUsernames.size;
}

function existInAtleastTen() {
  const usernameCounts = new Map();
  for (let fileNum = 0; fileNum < 20; fileNum++) {
    const filePath = `files/out${fileNum}.txt`;
    const usernames = readAndCountUsernames(filePath);
    usernames.forEach((username) => {
      if (!usernameCounts.has(username)) {
        usernameCounts.set(username, 1);
      } else {
        usernameCounts.set(username, usernameCounts.get(username) + 1);
      }
    });
  }
  let count = 0;
  usernameCounts.forEach((occurrence) => {
    if (occurrence >= 10) {
      count++;
    }
  });
  return count;
}

console.time('Execution time');
console.log(uniqueValues());
console.log(existInAllFiles());
console.log(existInAtleastTen());
console.timeEnd('Execution time');
