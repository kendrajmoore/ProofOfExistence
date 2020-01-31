const ProofOfExistance = artifacts.require("ProofOfExistance");

module.exports = function(deployer) {
  deployer.deploy(ProofOfExistance);
};
