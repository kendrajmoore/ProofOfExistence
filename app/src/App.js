import React, { Component } from "react";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import Container from "./Container";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Container />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
