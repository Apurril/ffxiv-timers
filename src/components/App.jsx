/* eslint-disable no-console */

import React from "react";
import "./App.css";

import { importAll } from "../utils";
import Sidebar from "./Sidebar/Sidebar";
import Cards from "./Cards/Cards";

const App = () => {
  importAll(require.context("../assets/", false, /\.png$/)); // TODO this seems weird
  console.log("Rendered");

  return (
    <div className="app">
      <Sidebar />
      <div>
        <Cards />
      </div>
    </div>
  );
};

export default App;
