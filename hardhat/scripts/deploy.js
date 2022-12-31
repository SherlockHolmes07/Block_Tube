const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const blockTube = await ethers.getContractFactory("BlockTube");

  // here we deploy the contract
  const deployedBlockTube = await blockTube.deploy();

  // Wait for it to finish deploying
  await deployedBlockTube.deployed();

  // print the address of the deployed contract
  console.log("BlockTube Contract Address:", deployedBlockTube.address);

    // print the address of the deployed contract
    console.log(
      "Verify Contract Address:",
       deployedBlockTube.address
    );
  
    console.log("Sleeping.....");
    // Wait for etherscan to notice that the contract has been deployed
    await sleep(30000);
  
    // Verify the contract after deploying
    await hre.run("verify:verify", {
      address: deployedBlockTube.address,
      constructorArguments: [],
    });
  
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
