const DrugInventory = artifacts.require("DrugInventory");

module.exports = function(deployer) {
  deployer.deploy(DrugInventory);
};