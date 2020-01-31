pragma solidity ^0.5.2;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';

contract ProofOfExistance is Ownable, Pausable {


  event loadFile(address indexed accountAddress, string fileName, string fileHash,  uint fileDate);

  struct PoeDataStruct {
    string fileName;
    string fileHash;
    uint fileDate;
  
  }

  PoeDataStruct[] public poeDataStruct;

  uint private fileLimit = 10;

  mapping (address => uint[]) private addressToFiles;
  mapping (address => uint) private userFilesCount;
  mapping (uint => address) public ownersMap;


  /**
   * @dev Checking user file limit
   */
  modifier notExceedsFileLimit() {
    require(userFilesCount[msg.sender] < fileLimit);
    _;
  }

  /**
  * @dev Set maximum file limit
  * @param _fileLimit maximum file limit
  * @return new file limit
  */
  function setFileLimit(uint _fileLimit) public
   onlyOwner
  returns (uint) {
    //The new file limit should be always bigger than the previous
    require(_fileLimit > fileLimit);
    fileLimit = _fileLimit;
    return fileLimit;
  }

  /**
  * @dev contract owner get file limit
  * @return file limit
  */
  function getFileLimit()
   onlyOwner
   public view returns (uint) {
    return fileLimit;
  }

  /**
  * @dev user get file count
  * @return file count
  */
  function fileCount()
  public view returns (uint) {
    return userFilesCount[msg.sender];
  }

  /**
  * @dev contract owner get any user file count
  * @param _userAddress the user address
  * @return user files count
  */
  function getUserFileCount(address _userAddress)
  onlyOwner
  public view returns (uint) {
    return userFilesCount[_userAddress];
  }


  /**
   * @dev Checking lenght of the input
   */
  modifier inputCheck(string memory _fileName, string memory _fileHash) {
    require(bytes(_fileName).length <= 50);
    require(bytes(_fileHash).length <= 46);
    _;
  }

  /**
  * @dev Insert a file
  * @param _fileName Name of the file
  * @param _fileHash Hash of file
  * @return fileId the id of the inserted file

  */
  function insertFile(string memory _fileName, string memory _fileHash)
    public
    whenNotPaused
    notExceedsFileLimit
    inputCheck(_fileName,_fileHash)
    returns (uint)
  {
    uint fileId = poeDataStruct.push(PoeDataStruct(
                                                      _fileName,
                                                      _fileHash,
                                                      block.timestamp
                                                      )) - 1;
    addressToFiles[msg.sender].push(fileId);
    ownersMap[fileId] = msg.sender;
    emit loadFile(
                      msg.sender,
                      _fileName,
                      _fileHash,
                      block.timestamp);
    userFilesCount[msg.sender]++;
    return fileId;
  }


  /**
  * @dev Get a file
  * @return fileName, fileHash, fileDate
  */
  function getFile(uint _index) public view returns (string memory, string memory,  uint) {
    require(msg.sender == ownersMap[_index]);

    return (
      poeDataStruct[_index].fileName,
      poeDataStruct[_index].fileHash,
      poeDataStruct[_index].fileDate
      );
  }

  /**
  * @dev Get a file indexes
  * @return an array of uint indexes
  */
  function getFileIndexes() public view returns (uint[] memory) {
    return addressToFiles[msg.sender];
  }
}