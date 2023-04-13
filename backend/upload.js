const Moralis = require("moralis").default;
const fs = require("fs");
require('dotenv').config();

async function init() {
    await Moralis.start({
        apiKey:process.env.MORALIS_API_KEY
    });
}


async function uploadToIpfs(json, fileName) {

    const uploadArray = [
        {
            path: `/${fileName}.json`,
            content: json,
        },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    return response.result
}

module.exports = {uploadToIpfs, init};