// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ColorBottleGame {
    uint256[5] private correctSequence;
    uint8 public attempts;
    bool public gameActive;
    address public owner;

    event GameStarted(uint256[5] sequence);
    event AttemptMade(address player, uint8 correctPositions, uint8 remainingAttempts);
    event GameWon(address winner);
    event GameReset();

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can reset the game");
        _;
    }

    constructor() {
        owner = msg.sender;
        _startNewGame();
    }

    function _generateRandomSequence() private view returns (uint256[5] memory) {
        uint256 randomSeed = block.timestamp + block.prevrandao + uint256(uint160(msg.sender));
        uint256 randomHash = uint256(keccak256(abi.encode(randomSeed)));

        uint256[5] memory sequence;
        uint256 availableNumbers = 0x12345;

        for (uint8 i = 0; i < 5; i++) {
            uint8 index = uint8(randomHash % (5 - i));
            uint8 num = uint8((availableNumbers >> (index * 4)) & 0xF);
            sequence[i] = num;
            availableNumbers &= ~(uint256(0xF) << (index * 4));
            randomHash /= 5;
        }

        return sequence;
    }

    function _startNewGame() internal {
        correctSequence = _generateRandomSequence();
        attempts = 5;
        gameActive = true;
        emit GameStarted(correctSequence);
    }

    function makeAttempt(uint256[5] memory playerGuess) external returns (uint8) {
        require(gameActive, "Game is not active");
        require(attempts > 0, "No attempts left");

        uint8 correctPositions = 0;
        for (uint8 i = 0; i < 5; i++) {
            if (playerGuess[i] == correctSequence[i]) {
                correctPositions++;
            }
        }

        attempts--;

        if (correctPositions == 5) {
            gameActive = false;
            emit GameWon(msg.sender);
        } else if (attempts == 0) {
            gameActive = false;
        }

        emit AttemptMade(msg.sender, correctPositions, attempts);
        return correctPositions;
    }

    function resetGame() external onlyOwner {
        _startNewGame();
        emit GameReset();
    }

    function getGameStatus() external view returns (uint256[5] memory, uint8, bool) {
        return (correctSequence, attempts, gameActive);
    }
}