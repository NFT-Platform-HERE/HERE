pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TransactionHistory.sol";

contract TestTransactionHistory {
    function testAddTransaction() public {
        TransactionHistory transactionHistory = TransactionHistory(DeployedAddresses.TransactionHistory());

        uint expectedAmount = 100;
        address expectedRecipient = address(0x123);
        transactionHistory.addTransaction(expectedAmount, expectedRecipient);

        TransactionHistory.Transaction[] memory result = transactionHistory.getTransactionHistory();
        TransactionHistory.Transaction memory latestTransaction = result[0];

        Assert.equal(latestTransaction.amount, expectedAmount, "Amount of latest transaction should be equal to expected amount");
        Assert.equal(latestTransaction.recipient, expectedRecipient, "Recipient of latest transaction should be equal to expected recipient");
    }

    function testGetTransactionHistory() public {
        TransactionHistory transactionHistory = TransactionHistory(DeployedAddresses.TransactionHistory());

        uint expectedAmount1 = 100;
        address expectedRecipient1 = address(0x123);
        transactionHistory.addTransaction(expectedAmount1, expectedRecipient1);

        uint expectedAmount2 = 200;
        address expectedRecipient2 = address(0x456);
        transactionHistory.addTransaction(expectedAmount2, expectedRecipient2);

        TransactionHistory.Transaction[] memory result = transactionHistory.getTransactionHistory();

        Assert.equal(result.length, 2, "Transaction history length should be equal to 2");

        Assert.equal(result[0].amount, expectedAmount2, "Amount of latest transaction should be equal to expected amount");
        Assert.equal(result[0].recipient, expectedRecipient2, "Recipient of latest transaction should be equal to expected recipient");

        Assert.equal(result[1].amount, expectedAmount1, "Amount of previous transaction should be equal to expected amount");
        Assert.equal(result[1].recipient, expectedRecipient1, "Recipient of previous transaction should be equal to expected recipient");
    }
}