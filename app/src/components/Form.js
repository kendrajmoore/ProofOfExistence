import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class Form extends Component {
    constructor(props, context) {
        super(props);
    
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleResult = this.handleResult.bind(this)
        this.getFiles = this.getFiles.bind(this)
        this.callContractMethod = this.callContractMethod.bind(this)
    
        this.contracts = context.drizzle.contracts;
    
        this.state = {
          name:'',
          hash:'',
          status:'Idle',
          file:'',
          files: [],
          buffer:'',
          transactionHash:'',
          etherscanLink:''
        }
    }

    componentDidMount(){
        this.getFiles()
        this.contracts["ProofOfExistance"].events
        .loadFile({}, (error, event) => {
        })
        .on('data', (event) => {
          this.setState({ status: "new file stored!  " });
          this.setState({ etherscanLink: " " });
          this.setState({ transactionHash: " " });
    
          this.getFiles()
        })
    }

    getFiles(){
        this.setState({files: []}, () => {
      
          this.contracts["ProofOfExistance"].methods.getFileIndexes().call({from: this.account },
            (error, indexArray) => {
                indexArray.map((item) => {
                  return(
                    this.contracts["ProofOfExistance"].methods.getFile(item).call({from: this.account },
                     (error, file) => {
                          var data = [...this.state.files, {
                              index: item,
                              name:file[0],
                              hash:file[1],
                              timestamp:file[2]
                          }];
      
                          this.setState({ files: this.getUnique(data, 'hash') });
                    })
                  )
                })
            });
        });
    }

    getUnique(arr, comp) {

        const unique = arr
             .map(e => e[comp])
      
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
      
         return unique;
    }

    handleFileChange(e) {
        this.setState({file:e.target.files[0]})
        this.setState({name:e.target.files[0].name})
    
        const file = e.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.getBuffer(reader)
    }

    getBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer})
    }

    handleFormSubmit(e) {
        e.preventDefault();
    
        this.setState({ status: "please wait..." });
        ipfs.files.add(this.state.buffer, this.handleResult);
    }

    handleResult(err,files){
        this.setState({ hash:files[0].hash });
        this.setState({ status: "Accept the tx please"});
    
        this.callContractMethod();
    }
      
    callContractMethod(){

        this.contracts["ProofOfExistance"].methods.insertFile(
          this.state.name,
          this.state.hash
        ).send({from: this.account })
        .on('transactionHash', (transactionHash) => {
          this.setState({transactionHash});
          this.setState({name: ''});
          this.setState({ status: "Tx hash: "});
          this.setState({ etherscanLink:'https://ropsten.etherscan.io/address/' + transactionHash});
        })
          .on('confirmation', (confNumber, receipt) => {
            this.getFiles();
          })
    
    }

    render() {
        return (
          <div className="section">
            <div>
              <p>
                <strong>
                  Status: {this.state.status}
                  <a href={this.state.etherscanLink} target="_blank">{this.state.etherscanLink}</a>
                </strong>
              </p>
            </div>
            <form onSubmit={this.handleFormSubmit} className="form">
            <br />
            <br />
    
              <div className="file" data-provides="fileupload">
                <label className="file-label">
                <input type="file" className="file-input" onChange={this.handleFileChange} name="resume" />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                    </span>
                  </span>
                </label>
              </div>
              <br />
              <br />
    
              <div>
                <div>
                    <div className="field">
                      <div className="control">
                      </div>
                      <br />
                      <br />
    
                      <div>
                        <button type="submit" className="button is-success">SEND</button>
                      </div>
                    </div>
                </div>
              </div>
              <div>
    
              </div>
            </form>
            <br />
            <br />
    
            <div>
              <div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>File name</th>
                        <th>Timestamp</th>
                        <th>IPFS Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.files.map((item) => {
                         return(
                          <tr key={item.index}>
                            <td>{item.name}</td>
                            <td><a href={`/file/${item.index}/${item.hash}`}>{item.timestamp}</a></td>
                            <td>{item.tags}</td>
                            <td><a href={`https://ipfs.infura.io/ipfs/${item.hash}`} target="_blank">{ item.hash }</a></td>
                          </tr>
                          )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Form.contextTypes = {
    drizzle: PropTypes.object
  }
  
  const mapStateToProps = state => {
    return {
      contracts: state.contracts
    }
  }
  
  export default drizzleConnect(Form, mapStateToProps)