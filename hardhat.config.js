require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const alchemyKey = process.env.ALCHEMY_API_KEY

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

task("get_vb_balance", "Gets Vitalik's ETH account balance", async () => {
  const block = await ethers.provider.getBlockNumber()
  const res = await hre.network.provider.request({
    method: "eth_getBalance",
    params: ["0xab5801a7d398351b8be11c439e05c5b3259aec9b", 'latest']}
  )
  console.log('\n');
  console.log("Vitalik has", (parseInt(res)*10**-18).toFixed(3), "ETH in his main Ethereum address as of block",block)
  console.log('\n');
});

task("impersonate_vb", "Impersonates Vitalik and prints his account balance", async () => {

  const res = await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0xab5801a7d398351b8be11c439e05c5b3259aec9b"]}
  )

  console.log("Result: ", res)
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

