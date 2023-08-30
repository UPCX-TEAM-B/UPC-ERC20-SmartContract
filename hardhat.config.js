require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { deployContract } = require("./scripts/deploy.js");

require("@nomicfoundation/hardhat-chai-matchers");

task("deployContract", "Deploy contracts with parameter name")
  .addPositionalParam("contractName")
  .addPositionalParam("contractType")
  .setAction(async (args, hre) => {
    const ethers = hre.ethers;
    let contractArgs = [];
    if (args.contractType === "staking") {
    } else if (args.contractType === "token") {
      contractArgs.push(process.env.DEPLOY_ARGS_TOKEN_NAME);
      contractArgs.push(process.env.DEPLOY_ARGS_TOKEN_SYMBOL);
      contractArgs.push(process.env.DEPLOY_ARGS_TOKEN_SUPPLY);
      contractArgs.push(process.env.DEPLOY_ARGS_TOKEN_DECIMAL);
    } else {
      throw new Error("Contract Type must be staking or token.");
    }

    try {
      await deployContract(args.contractName, contractArgs, hre, ethers);
    } catch (ex) {
      console.log(ex);
    }
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    testnet: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts:
        process.env.DEPLOY_PRIVATEKEY !== undefined
          ? [process.env.DEPLOY_PRIVATEKEY.replace("0x", "")]
          : [],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/43b0a08c7fa941a893f8f4351220272d",
      chainId: 1,
      gasPrice: 20000000000,
      accounts:
        process.env.DEPLOY_PRIVATEKEY !== undefined
          ? [process.env.DEPLOY_PRIVATEKEY.replace("0x", "")]
          : [],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
