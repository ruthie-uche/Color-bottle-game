// import { ethers } from "hardhat";

// async function main() {
//     const [deployer] = await ethers.getSigners();
//     const gameAddress = "DEPLOYED_CONTRACT_ADDRESS";

//     const ColorBottleGame = await ethers.getContractAt("ColorBottleGame", gameAddress);

//     console.log("Game Status:", await ColorBottleGame.getGameStatus());

//     const attemptTx = await ColorBottleGame.makeAttempt([1, 2, 3, 4, 5]);
//     await attemptTx.wait();

//     console.log("Updated Game Status:", await ColorBottleGame.getGameStatus());
// }

// main().catch((error) => {
//     console.error(error);
//     process.exit(1);
// });
