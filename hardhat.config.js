require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const alchemyKey = process.env.ALCHEMY_API_KEY
console.log("ALCHEMY KEY:", alchemyKey)

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("get_current_block", "Prints the current block", async () => {
  const block = await ethers.provider.getBlockNumber()

  console.log("CURRENT BLOCK: ", block)
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      forking: {
        url: ("https://eth-mainnet.alchemyapi.io/v2/"+alchemyKey),
        blockNumber: 11111111
      }
    }
  }
};

