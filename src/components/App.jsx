/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";

const resources = [
  {
    resource: [
      "Beryllium Ore",
      "Prismstone",
    ],
    location: {
      zone: "Il Mheg",
      teleport: "Lydha Lran",
      pos: [30, 21],
    },
    times: [4, 16],
  },
];

const App = () => (
  <div className="idk">
    <div className="card-container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
);

const Card = () => (
  <div className="card">
    <div>Beryllium Ore</div>
    <div>Prismstone</div>
    <div>Il Mheg</div>
    <div>Lydha Lran</div>
    <div>minericon</div>
    <div>X: 31 - Y: 20</div>
    <div>7:00</div>
    <div>scrip type img</div>

  </div>
);


export default App;
