const fs = require('fs/promises');

async function readAndProcessFile(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return data.split('\n');
    } catch (err) {
        console.error(`Error reading file ${path}: ${err}`);
        return [];
    }
}

async function uniqueValues() {
    let wordsSet = new Set();
    for (let i = 0; i < 20; i++) {
        const path = `./files/out${i}.txt`;
        const userNames = await readAndProcessFile(path);
        userNames.forEach((userName) => wordsSet.add(userName));
    }
    return wordsSet.size;
}

async function existsInAllFiles() {
    const namesInFiles = new Map();
    for (let i = 0; i < 20; i++) {
        const filepath = `./files/out${i}.txt`;
        const wordsFile = await readAndProcessFile(filepath);
        wordsFile.forEach((word) => {
            if (namesInFiles.has(word)) {
                namesInFiles.set(word, namesInFiles.get(word) + 1);
            } else {
                namesInFiles.set(word, 1);
            }
        });
    }

    let namesInAllFiles = 0;
    for (const [name, count] of namesInFiles.entries()) {
        if (count === 20) {
            namesInAllFiles+=1;
        }
    }

    return namesInAllFiles;
}

async function existInAtleastTen() {
    const userNamesMap = new Map();

    async function processFile(path) {
        const userNames = await readAndProcessFile(path);
        userNames.forEach((userName) => {
            if (userNamesMap.has(userName)) {
                userNamesMap.set(userName, userNamesMap.get(userName) + 1);
            } else {
                userNamesMap.set(userName, 1);
            }
        });
    }

    for (let i = 0; i < 20; i++) {
        const path = `./files/out${i}.txt`;
        await processFile(path);
    }

    let count = 0;
    for (const value of userNamesMap.values()) {
        if (value >= 10) {
            count++;
        }
    }

    return count;
}

async function main() {
    const start = new Date().getTime();
    const uniqueCount = await uniqueValues();
    const allFilesCount = await existsInAllFiles();
    const atLeastTenCount = await existInAtleastTen();

    console.log(`Unique names: ${uniqueCount}`);
    console.log(`Names appearing in all files: ${allFilesCount}`);
    console.log(`Names appearing in at least 10 files: ${atLeastTenCount}`);


    const end = new Date().getTime();
    console.log(`${end - start} milliseconds spent`);
}

main();
