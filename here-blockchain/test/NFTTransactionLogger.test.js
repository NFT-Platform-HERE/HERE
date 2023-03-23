const NFTTransactionLogger = artifacts.require("NFTTransactionLogger");
const MockNFT = artifacts.require("HereNFT");

contract("NFTTransactionLogger", async (accounts) => {
  let logger;
  let mockNFT;
  const owner = accounts[0];
  const buyer = accounts[1];
  const seller = accounts[2];
  const tokenId = 1;
  const price = 100;
  const timestamp = Math.floor(Date.now() / 1000);

  beforeEach(async () => {
    mockNFT = await MockNFT.new();
    logger = await NFTTransactionLogger.new(mockNFT.address);
    await mockNFT.create(owner, tokenId);
    await mockNFT.approve(logger.address, tokenId, { from: owner });
  });

  it("should add transaction log", async () => {
    await logger.addTransactionLog(buyer, seller, tokenId, price, timestamp, {
      from: mockNFT.address,
    });
    const logs = await logger.getTransactionLogs(tokenId);
    assert.equal(logs.length, 1);
    assert.equal(logs[0].buyer, buyer);
    assert.equal(logs[0].seller, seller);
    assert.equal(logs[0].tokenId, tokenId);
    assert.equal(logs[0].price, price);
    assert.equal(logs[0].timestamp, timestamp);
  });
});
