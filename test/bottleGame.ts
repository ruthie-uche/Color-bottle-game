// import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Contract } from "ethers";

// describe("ColorBottleGame", function () {
//     let game: Contract;
//     let owner: any;
//     let player: any;

//     beforeEach(async function () {
//         [owner, player] = await ethers.getSigners();
//         const ColorBottleGame = await ethers.getContractFactory("ColorBottleGame");
//         game = await ColorBottleGame.deploy();
//         await game.deployed();
//     });

//     it("Should deploy and initialize game", async function () {
//         const gameStatus = await game.getGameStatus();
//         expect(gameStatus[1]).to.equal(5);
//         expect(gameStatus[2]).to.be.true;
//     });

//     it("Should allow player to make an attempt and decrease attempts", async function () {
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);
//         const gameStatus = await game.getGameStatus();
//         expect(gameStatus[1]).to.equal(4);
//     });

//     it("Should end game when player wins", async function () {
//         const gameStatus = await game.getGameStatus();
//         const correctSequence = gameStatus[0];

//         await game.connect(player).makeAttempt(correctSequence);

//         const updatedStatus = await game.getGameStatus();
//         expect(updatedStatus[2]).to.be.false;
//     });

//     it("Should prevent more attempts after game ends", async function () {
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);
//         await game.connect(player).makeAttempt([1, 2, 3, 4, 5]);

//         await expect(game.connect(player).makeAttempt([1, 2, 3, 4, 5])).to.be.revertedWith("Game is not active");
//     });

//     it("Should allow owner to reset the game", async function () {
//         await game.connect(owner).resetGame();
//         const gameStatus = await game.getGameStatus();
//         expect(gameStatus[1]).to.equal(5);
//         expect(gameStatus[2]).to.be.true;
//     });

//     it("Should prevent non-owner from resetting the game", async function () {
//         await expect(game.connect(player).resetGame()).to.be.revertedWith("Only owner can reset the game");
//     });
// });
