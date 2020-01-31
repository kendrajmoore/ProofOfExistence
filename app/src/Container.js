import Layout from "./Layout";
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    ProofOfExistance: state.contracts.ProofOfExistance,
    drizzleStatus: state.drizzleStatus,
  };
};

const Container = drizzleConnect(Layout, mapStateToProps);

export default Container;