/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("HereNFT");

contract("NftCreator", (accounts) => {
  beforeEach(async () => {
    console.log("Before Each");
    lt = await lt.new();
  });

  it("NFT mint, transfer, and compare URI", async () => {
    let owner = await lt.verifyNFT(
      1,
      "0x3ec57f08d11741577b3ccb1b8ab0ee745522f58aeb4081254e6fcea01c7bd696"
    );

    console.log(`owner : ${owner}`);
    // TODO
    // 다음이 반드시 테스트되어야 합니다.
    // assert.equal(sender, owner, "NFT Mint Failed");
    // assert.equal(receiver, owner, "NFT Transfer Failed.");
    // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")
    assert.equal(owner, true);
  });
});
