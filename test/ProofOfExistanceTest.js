const ProofOfExistance = artifacts.require('ProofOfExistance');
const should = require('chai').should();
const assertRevert = require('./lib/assertRevert');

contract('ProofOfExistance', async (accounts) => {

    let owner = accounts[0];




    describe('user maximum file limit validation', function() {
        beforeEach(async function () {
           this.ProofOfExistance = await ProofOfExistance.new({from: accounts[0]});
        });

        let testFiles1 = {
            name : "school.pdf",
            hash : "ZrkTrsqaweuolcq2gvtquglt"
          }

        let testFiles2 = {
            name : "pencil.pdf",
            hash : "A64pdf3vifnksr4oez2mth"
          }

          let testFiles3 = {
            name : "catz.pdf",
            hash : "A64pdf3vifnksr4oez2mtl"
          }


        it("...should accept the file if the user is below the maximum limit", async function() {
            let result = await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash,  {from: accounts[0]});
            should.exist(result);
        });

        it("...should refuse the file if the user is over the maximum limit", async function() {
            try
            {
              await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz1.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz2.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz3.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz4.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz5.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz6.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz7.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz8.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz9.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz10.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              await this.ProofOfExistance.insertFile("catz11.jpg", testFiles1.hash, testFiles1.tags, {from: accounts[0]});
              assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });


        it('...owner should be the first account', async function () {
            await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash,  {from: accounts[0]});

            let owner = await this.ProofOfExistance.ownersMap.call(0);
            should.equal(accounts[0], owner);
        });

        it("...only the contract owner should be able to change the file limit", async function() {
            try
            {
              await this.ProofOfExistance.setFileLimit(30, {from: accounts[1]});
              assert.fail('owner only');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });

        it("...should not change the file limit to a lower value", async function() {
            try
            {
              await this.ProofOfExistance.setFileLimit(2, {from: accounts[0]});
              assert.fail('cannot change the file limit to a lower value');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });
    });

    describe('input length validation', function() {
        beforeEach(async function () {
           this.ProofOfExistance = await ProofOfExistance.new({from: accounts[0]});
        });

        let testFiles1 = {
          name : "school.pdf",
          hash : "ZrkTrsqaweuolcq2gvtquglt"
        }

        let testFiles2 = {
          name : "pencil.pdf",
          hash : "A64pdf3vifnksr4oez2mth"
        }

        it("...should accept the input if is lower than the length limit", async function() {
            let result = await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash, {from: accounts[0]});
            should.exist(result);
        });

        it("... should reject input if exceeds limit", async function() {
            try
            {
                await this.ProofOfExistance.insertFile("Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl Hey girl",
                testFiles1.hash, testFiles1.tags, {from: accounts[0]});

                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
              assertRevert(error);
            }
        });
    });

    describe("ProofOfExistance smart contract read and write tests", async () => {
        beforeEach(async function () {
           this.ProofOfExistance = await ProofOfExistance.new({from: accounts[0]});
        });

        let testFiles1 = {
          name : "school.pdf",
          hash : "ZrkTrsqaweuolcq2gvtquglt"
        }

        let testFiles2 = {
          name : "pencil.pdf",
          hash : "A64pdf3vifnksr4oez2mth"
        }


        it('..should add data to the smart contract and read data from it ', async function () {
            should.exist(await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash, {from: accounts[0]}));
            should.exist(await this.ProofOfExistance.getFileIndexes({from: accounts[0]}));
            should.equal(accounts[0], await this.ProofOfExistance.ownersMap.call(0));

            let fileData = await this.ProofOfExistance.getFile(0, {from: accounts[0]});
            should.equal(testFiles1.name, fileData[0]);
            should.equal(testFiles1.hash, fileData[1]);
            should.exist(fileData[2]);
        });

        it("...only the file owner should see their files", async function() {
            try
            {
                await this.ProofOfExistance.insertFile(testFiles1.name, testFiles1.hash,  {from: accounts[0]});
                await this.ProofOfExistance.getFile(1, {from: accounts[1]});
                assert.fail('The call should have caused an exception to be thrown');
            }
            catch(error)
            {
                assertRevert(error);
            }
        }); 
    });
});
