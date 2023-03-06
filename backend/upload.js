const Moralis = require("moralis").default;
const fs = require("fs"); 

async function uploadToIpfs(json) {

    await Moralis.start({
        apiKey: "idTcSRyMYeHeJ57f6h8Z3UhXceJHdlKpxkLQrVrfLsJDoCRT3qcD9jczKCed30rz",
    });

    const uploadArray = [
        {
            path: "myfile.json",
            content: json,
        },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    return response.result
}

module.exports = uploadToIpfs;