# Proof of Existance - Consensys Developer Bootcamp Final Project 


*** 

# Running the Project 

## Setup 

To run this project, you will need the following:
- Truffle (`npm install -g truffle`)
- Ganache/Ganache CLI (`npm install -g ganache-cli`)
	- You can also use the Ganache Application
- MetaMask 

## Getting Stared 

Clone this repository. After cloning, open 2 terminals and cd to the directory where repo was cloned. In the first terminal, run `ganache-cli` to start the test blockchain. Once local blockchain starts, copy the account details including the private keys and mnemonic phrase to clipboard.

In the 2nd terminal, first run `npm install` and then `truffle compile` and then run `truffle migrate` to deplpoy the conracts on test blockchain. Once the contracts are deployed, run `cd app` and `npm install` then `npm run start` to start the UI. Once package is build, A window will automaticall open with localhost:3000. If not, Open the browser which has metamask extension and enter localhost:3000 as the URL.

Now open the MetaMask extension, login to it. Once logged into the account, choose Custom RPC as the network and in the New RPC URL form, copy/paste the IP address from the which the ganache-cli terminal is listening on (it is likely 127.0.0.1:8545).

Once connected, we can use MetaMask to interact with the application. Now import the private key (from ganache-cli).

Currently only accepts single page files with extensions `.png`, `.pdf`. 
## Testing 
To run these tests against a Ganache blockchain, In first terminal window run `ganache-cli` and then in other terminal,run `truffle test`. Both the commands should be run from the main directory of the project

*** 

# Project Requirements

## User Interface Requirements:
- [x] Run the app on a dev server locally for testing/grading
	- See `Running the Project` above. 
- [x] You should be able to visit a URL and interact with the application
	- The application will be running at `http://localhost:3000/`
- [x] App recognizes current account
    - Yes, The current account will be displayed at the top
- [x] Sign transactions using MetaMask
	- Once MetaMask is configured to the application network (`localhost:8545`), users can interact with it using MetaMask
- [x] Contract state is updated
	- [x] Update reflected in UI
		 
 
## Test Requirements:
- [x] Write 5 tests for each contract you wrote
	- Tests were written in Javascript 
	- [x] JavaScript
		- See `/test/ProofOfExistanceTest.js` 
- [x] Explain why you wrote those tests
	- See `testcases.md`
- [x] Tests run with truffle test
	- Yes. See `Testing` section under `Running the Project`
 
## Design Pattern Requirements:
- [x] Implement emergency stop
- [x] What other design patterns have you used / not used?
	- See `design_pattern_decisions.md`
    
## Security Tools / Common Attacks :
- [x] Explain what measures you’ve taken to ensure that your contracts are not susceptible to common attacks
	- See `avoiding_common_attacks.md`

## Other
- [x] Use a library (via EthPM)
	
- [x] Smart Contract code should be commented according to the specs in [the documentation](https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#comments)
	- Check `ProofOfExistance.sol` 

## Stretch Requirement
- [x] Deploy on a test net 
- [ ] Integrate with an additional service, for example:
	- [ ] IPFS
	- [ ] uPort
	- [ ] Ethereum Name Service
	- [ ] Oracle