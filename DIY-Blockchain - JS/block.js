const { GENESIS_DATA, MINE_RATE } = require('./config')
const cryptoHash = require('./crypto-hash')
const hexToBinary = require("hex-to-binary");

class Block {
    constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty
    }
    // creates a genesis block
    static genesis() {
        return new this(GENESIS_DATA);
    }
    // mines a block
    static mineBlock({ prevBlock, data }) {
        let timestamp, hash;
        let { difficulty } = prevBlock;
        const prevHash = prevBlock.hash;

        let nonce = 0
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({
                originalBlock: prevBlock,
                timestamp
            })
            hash = cryptoHash(timestamp, nonce, prevHash, difficulty, data)
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash
        })
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }
}

module.exports = Block;