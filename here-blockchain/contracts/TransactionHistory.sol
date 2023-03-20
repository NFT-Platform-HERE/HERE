// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract TransactionHistory {
    struct Transaction {
        uint amount;
        address sender;
        address recipient;
        uint timestamp;
        bytes32 previousTransactionHash;
    }

    Transaction[] private transactionHistory;
    bytes32 private latestTransactionHash;

    function addTransaction(uint amount, address recipient) public {
        Transaction memory newTransaction = Transaction({
            amount: amount,
            sender: msg.sender,
            recipient: recipient,
            timestamp: block.timestamp,
            previousTransactionHash: latestTransactionHash
        });

        bytes32 newTransactionHash = keccak256(abi.encode(newTransaction));
        transactionHistory.push(newTransaction);
        latestTransactionHash = newTransactionHash;
    }

    function getTransactionHistory() public view returns (Transaction[] memory) {
        Transaction[] memory result = new Transaction[](transactionHistory.length);
        bytes32 currentTransactionHash = latestTransactionHash;

        for (uint i = 0; i < transactionHistory.length; i++) {
            result[i] = transactionHistory[transactionHistory.length - i - 1];
            currentTransactionHash = result[i].previousTransactionHash;
        }

        return result;
    }
}