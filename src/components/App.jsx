/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */

import React from "react";
import "./App.css";

const resources = [
  {
    resource: [
      "Beryllium Ore",
      "Prismstone",
    ],
    job: "Miner",
    location: {
      zone: "Il Mheg",
      teleport: "Lydha Lran",
      pos: [30, 21],
    },
    times: [4, 16],
  },
  {
    resource: [
      "Duskblooms",
    ],
    job: "Gatherer",
    location: {
      zone: "Amh Araeng",
      teleport: "The Inn at Journey's Head",
      pos: [32, 33],
    },
    times: [4, 16],
  },
  {
    resource: [
      "Purpure Shell Chip",
    ],
    job: "Miner",
    location: {
      zone: "The Tempest",
      teleport: "The Ondo Cups",
      pos: [34, 31],
    },
    times: [6, 18],
  },
  {
    resource: [
      "Ethereal Cocoon",
    ],
    job: "Gatherer",
    location: {
      zone: "Lakeland",
      teleport: "Fort Jobb",
      pos: [26, 11],
    },
    times: [8, 20],
  },
  {
    resource: [
      "Merbau Log",
    ],
    job: "Gatherer",
    location: {
      zone: "Il Mheg",
      teleport: "Wolekdorf",
      pos: [37, 27],
    },
    times: [8, 20],
  },
  {
    resource: [
      "Tungsten Ore",
    ],
    job: "Miner",
    location: {
      zone: "The Tempest",
      teleport: "The Ondo Cups",
      pos: [33, 8],
    },
    times: [10, 22],
  },
  {
    resource: [
      "Ashen Alumen",
    ],
    job: "Miner",
    location: {
      zone: "Amh Araeng",
      teleport: "Mord Souq",
      pos: [20, 9],
    },
    times: [10, 22],
  },
  {
    resource: [
      "Sandalwood Log",
      "Sandalwood Sap",
    ],
    job: "Gatherer",
    location: {
      zone: "The Rak'tika Greatwood",
      teleport: "Slitherbough",
      pos: [24, 36],
    },
    times: [2, 14],
  },
  {
    resource: [
      "Fireheart Cobalt",
    ],
    job: "Miner",
    location: {
      zone: "Lakeland",
      teleport: "The Ostall Imperative",
      pos: [5, 34],
    },
    times: [2, 14],
  },
  {
    resource: [
      "Imperial Fern",
    ],
    job: "Gatherer",
    location: {
      zone: "Kholusia",
      teleport: "Stilltide",
      pos: [28, 21],
    },
    times: [0, 12],
  },
];

const cache = {};

const importAll = (r) => {
  r.keys().forEach((key) => cache[key] = r(key));
};

importAll(require.context("../assets/", false, /\.png$/));

const asset = (s) => cache[`./${s}.png`].default;

const formatTimes = (times) => times.reduce((prev, curr) => `${prev} & ${curr}`);


const App = () => (
  <div className="idk">
    <RenderCards />
  </div>
);

const cardData = [
  {
    loot: [
      {
        name: "Beryllium Ore",
        id: "21455",
        // suffix: "yellow",
      },
      {
        name: "Prismstone",
        id: "21232",
        suffix: "white",
      },
    ],
    job: "min",
    zone: "Il Mheg",
    teleport: "Lydha Lran",
    pos: [30, 21],
    times: ["4:00", "16:00"],
  },
  {
    loot: [
      {
        name: "Shade Quartz",
        id: "21462",
        suffix: "reduce",
      },
      {
        name: "Fire Cluster",
        id: "20013",
      },
    ],
    job: "min",
    zone: "Kholusia",
    teleport: "Tomra",
    pos: [22, 18],
    times: ["16:00"],
  },
];

const Resource = ({ name, id, suffix }) => {
  console.log(name);
  return (
    <div className="resource">
      <img key={`icon-${id}`} src={asset(id)} className="icon" />
      <div key={`name-${id}`} className="name">{name}</div>
      {suffix ? <img key={`suffix-${id}`} src={asset(suffix)} className="suffix-icon" /> : null}
    </div>
  );
};

const RenderCards = () => (
  <div className="card-container">
    {cardData.map((card) => (<Card {...card} />))}
  </div>
);

const RenderResources = () => {
  // TODO
};

const Card = (props) => {
  const {
    loot, job, zone, teleport, pos, times,
  } = props;

  const [x, y] = pos;

  return (
    <div className="card">

      <div className="title-container">
        <div className="teleport">{teleport}</div>
        <div className="timer">7:00</div>
      </div>

      <div className="resource-container">
        <img src={asset(job)} className="skill-icon" />
        <Resource {...loot[0]} />
        <Resource {...loot[1]} />
      </div>


      <div className="info-container">
        {/* <div className="teleport">Lydha Lran</div> */}
        {/* <img src={MIN} className="image" /> */}
        <div className="zone">{`${zone} - (${x}, ${y})`}</div>
        {/* <div className="pos"></div> */}
        <div className="time">{formatTimes(times)}</div>
      </div>

    </div>
  );
};

export default App;
