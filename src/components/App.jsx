/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import "./App.css";
import nodes from "../constants/data";

const imageCache = {};

const importAll = (r) => {
  r.keys().forEach((key) => imageCache[key] = r(key));
};

importAll(require.context("../assets/", false, /\.png$/));

const asset = (s) => imageCache[`./${s}.png`].default;

const formatTimes = (times) => times.map((value) => `${value}:00`).join(" & ");

const lang = "en";
const getTranslation = (object) => object[lang] || object.en;

const App = () => (
  <div className="app">
    <div className="sidebar">
      <Clock />
    </div>
    <div>
      <Cards />
    </div>
  </div>
);

const formatTime = (date) => {
  const secs = date.getSeconds().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const eorzeaTimeFactor = 20.571428571428573; // 60 * 24 / 70

const localToEorzea = (date) => new Date(date.getTime() * eorzeaTimeFactor);
const eorzeaToLocal = (date) => new Date(date.getTime() / eorzeaTimeFactor);

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [et, setET] = useState(localToEorzea(new Date()));


  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
      setET(localToEorzea(new Date()));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="clock">
      <div className="display">
        {/* <div>{`LT - ${formatTime(time)}`}</div> */}
        <div className="et-clock">{`${formatTime(et)}`}</div>
      </div>
    </div>
  );
};

// eslint-disable-next-line object-curly-newline
const Resource = ({ name, icon, suffix, suffixName }) => (
  <div className="resource">
    <img key={`icon-${icon}`} src={asset(icon)} className="icon" alt={name} />
    <div key={`name-${icon}`} className="name">{name}</div>
    {suffix ? <img key={`suffix-${icon}`} src={asset(suffix)} className="suffix-icon" title={suffixName || ""} /> : null}
  </div>
);

const Resources = ({ node, job }) => (
  <div className="resource-container">
    <img src={asset(job)} className="skill-icon" />
    {node.map((item, index) => (<Resource key={`res-${item.icon}-${index}`} name={item.name} icon={item.icon} suffix={item.suffix} suffixName={item.suffixName} />))}
  </div>
);

const Cards = () => (
  <div className="card-container">
    {nodes.map((card, index) => (<Card key={`card-${index}`} data={card} />))}
  </div>
);

const Card = ({ data }) => {
  const {
    node, job, zone, teleport, pos, times,
  } = data;

  const [x, y] = pos;

  return (
    <div className="card">

      <div className="title-container">
        <div className="teleport">{getTranslation(teleport)}</div>
        <div className="timer">7:00</div>
      </div>

      <Resources node={node} job={job} />

      <div className="info-container">
        <div className="zone">{`${zone} - (${x}, ${y})`}</div>
        <div className="time">{formatTimes(times)}</div>
      </div>

    </div>
  );
};

export default App;


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
