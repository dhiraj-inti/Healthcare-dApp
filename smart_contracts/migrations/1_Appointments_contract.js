const Appointments = artifacts.require("Appointments");

module.exports = function(deployer) {
  deployer.deploy(Appointments);
};