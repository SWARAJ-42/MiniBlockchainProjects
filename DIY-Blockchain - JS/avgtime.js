const Blockchain = require('./blockchain')
const blockchain = new Blockchain();

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, averageTime;

const times = []
console.log('start')
blockchain.addBlock("first block")
for (let i = 1; i <= 1000; i++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
    blockchain.addBlock(`Block ${i}`)
    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimestamp = nextBlock.timestamp;

    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff)
    let TotalTime = times.reduce((total, num) => {
        return ( total + num );
    })
    averageTime = TotalTime / times.length;
    console.log(`Time to mine the block :${timeDiff}, Difficulty:${nextBlock.difficulty}, Average Time: ${averageTime}`)
}