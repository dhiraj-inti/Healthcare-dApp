const DrugSales = artifacts.require("DrugSales");

module.exports = function(deployer) {
  deployer.deploy(DrugSales);
};