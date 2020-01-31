import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "@drizzle/react-components";

import Form from "./components/Form";


export default ({ accounts }) => (
  <div className="App">
  <div className="container">

    <div align="center">
      <h1 className="title">Proof of Existence</h1>
    </div>

      <div className="tile is-parent">
        <article className="tile is-child notification is-danger">
          <p className="title">Account</p>
          <div className="content">
          <AccountData accountIndex={0} units="ether" precision={3} />
          </div>
        </article>
    </div>
      <Form account={accounts[0]} />
      </div>
    </div>

);