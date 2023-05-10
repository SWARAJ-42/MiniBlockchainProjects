const Block = require("./block");
const cryptoHash = require("./crypto-hash");



class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    // adds block to the blockchain created
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock)
    }

    // Validator
    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        }
        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
            const lastDifficulty = chain[i-1].difficulty;
            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                return false;
            }

            const ValidatedHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data)
            if (hash !== ValidatedHash) {
                return false;
            }
            if (Math.abs(lastDifficulty-difficulty) > 1) {
                return false;
            }
            return true
        }
    }

    // Blockchain updater
    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("This incoming chain is not longer.")
            return;
        }
        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain is not valid.")
            return;
        }
        this.chain = chain;

    }
}

// const Chain = new Blockchain();
// Chain.addBlock({ data: "This is the first addition to the blockchain" });
// Chain.addBlock({ data: "This is the second addition to the blockchain" });
// Chain.addBlock({ data: "This is the third addition to the blockchain" });
// Chain.addBlock({ data: "This is the fourth addition to the blockchain" });
// console.log(Chain.chain)
// console.log(Blockchain.isValidChain(Chain.chain))

module.exports = Blockchain