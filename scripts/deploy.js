const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const toDoList = await ToDoList.deploy();

  await toDoList.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp deployed to ${toDoList.address}`
  );
  // console.log("Print toDoList:", toDoList)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3
//0x5FbDB2315678afecb367f032d93F642f64180aa3
