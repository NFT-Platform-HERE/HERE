//const Migrations = artifacts.require("Migrations");
const SsafyToken = artifacts.require("SsafyToken");
const HereNFT = artifacts.require("HereNFT");
const SaleFactory = artifacts.require("SaleFactory");
const NFTTransactionLogger = artifacts.require("NFTTransactionLogger");

/**
 * PJT Ⅰ/Ⅲ - 시나리오 테스트
 * @dev
 * 올바른 테스트를 위해
 * PJT Ⅰ - SsafyNFT
 * PJT Ⅲ - SsafyNFT, SsafyToken, SaleFactory
 * 가 배포되어야 합니다.
 */
module.exports = function (deployer) {
  deployer.deploy(HereNFT);
  deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  deployer.deploy(SaleFactory);
  deployer.deploy(NFTTransactionLogger, "0x00E3A06AF2fEf5F7934bE5c97F7BEa95762C8569");
};
