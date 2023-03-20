/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

// TODO
// 다음이 반드시 테스트되어야 합니다.
// assert.equal(sender, owner, "NFT Mint Failed");
// assert.equal(receiver, owner, "NFT Transfer Failed.");
// assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
const assert = require("assert");

const HereNFT = artifacts.require("HereNFT");

module.exports = function (deployer) {
  // deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  deployer.deploy(HereNFT);
};

contract("NftCreator", (accounts) => {
  console.log(accounts);
  const sender = accounts[1];
  const receiver = accounts[2];
  let owner;
  let tokenId;
  const tokenURI = "test";

  it("Create Test", () => {
    HereNFT.deployed().then((instance) => {
      tokenId = instance.create(sender, tokenURI);
      owner = sender;
      instance.current().then((tokenid) => console.log(tokenid));
    });
  });

  it("Transfer Test", () => {
    HereNFT.deployed().then((instance) => {
      assert.notEqual(owner, receiver, "NFT transfer Failed!");
      instance.transferFrom(owner, receiver, tokenId);
      owner = receiver;
    });
  });

  it("Compare tokenURI", () => {
    HereNFT.deployed().then((instance) => {
      const tokenURIFetched = instance.tokenURI(tokenId);
      // console.log(tokenURIFetched);
      assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI");
    });
  });
});
