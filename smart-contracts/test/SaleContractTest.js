/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const HereNFT = artifacts.require("HereNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
    const mintAmount = 10000;
    const uri = "testURI";

    async function print(title) {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2];
        console.log(`\n--------------------  ${title} --------------------`);
        console.log(`Seller: ${seller} ${await getBalance(seller)}`);
        console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
        console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
    }

    it("Bid and confirm", async () => {
        const seller = accounts[0];
        const bidder1 = accounts[1];
        const bidder2 = accounts[2]; // purchaser

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
        // assert.equal(1000, await getBalance(bidder1), "Refund Failed");
    });

    it("Bid and Purchase", async () => {
        const seller = accounts[0];
        const bidder = accounts[1];
        const purchaser = accounts[2];

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
        // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
    });

    it("Bid and Cancel", async () => {
        const seller = accounts[0];
        const bidder = accounts[1];

        // TODO
        // 다음을 테스트를 통과해야합니다.
        // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
        // assert.equal(1000, await getBalance(bidder), "Refund Failed");
    });

});
