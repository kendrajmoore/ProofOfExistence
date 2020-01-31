
import ProofOfExistance from "./contracts/ProofOfExistance.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [ProofOfExistance],
  events: {
    ProofOfExistance: ["loadFile"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
