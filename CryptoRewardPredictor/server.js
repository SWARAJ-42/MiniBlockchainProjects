// importing the library 
const express = require("express")
const axios = require("axios")
require("dotenv").config()
const { utils } = require("ethers")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// defining the API key
const apikey = process.env.API_KEY

// initializing the module
const app = express()

// Defining the features of a block which will store the data extracted 
class Block {
    constructor(timeStamp, blockReward) {
        this.timeStamp = timeStamp
        this.blockReward = blockReward
    }
}

/*
   https://api.etherscan.io/api
   ?module=block
   &action=getblockreward
   &blockno=2165403
   &apikey=YourApiKeyToken
*/

// Data fetcher
const fetchData = async () => {
    try {
        const listOfBlocks = [];
        // for loop for getting multiple number of block data
        for (let blockNumber = 567600; blockNumber < 568000; blockNumber++) {
            // URL from where the data needs to be extracted 
            const apiUrl = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${apikey}`
            // getting the data
            const response = await axios.get(apiUrl);
            const rewardEther = utils.formatEther(response.data.result.blockReward)
            const timeStamp = response.data.result.timeStamp

            const block = new Block(timeStamp, rewardEther)
            listOfBlocks.push(block)
        }
        exportToCsv(listOfBlocks)
        // console.log(listOfBlocks)
    } catch (error) {
        console.error(error)
    }
}

const exportToCsv = (data) => {
    console.log("Exporting fetched data to csv.")
    const csvWriter = createCsvWriter({
      path: 'block_data.csv',
      header: [
        { id: 'timeStamp', title: 'timeStamp' },
        { id: 'blockReward', title: 'blockReward' }
      ]
    });
  
    csvWriter
      .writeRecords(data)
      .then(() => {
        console.log('CSV file created successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };
   
// server
(async () => {
    try {
        await fetchData()
        app.listen(3000, () => {
            console.log("Server running on port 3000")
        })
    } catch (error) {
        console.error(error)
    }
})()