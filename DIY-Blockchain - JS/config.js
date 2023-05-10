const INITIAL_DIFFICULTY = 2; // no of pre-padded zeroes
const MINE_RATE = 1000 // 1 second

const GENESIS_DATA = {
    timestamp: 1,
    prevHash: '0x000',
    hash: '0x123',
    data: [],
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY
}

module.exports = { GENESIS_DATA, MINE_RATE }