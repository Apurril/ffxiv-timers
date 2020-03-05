/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */

import React, { useState, useEffect } from "react";
import "./App.css";
import nodes from "../constants/data";
import Clock from "./Clock";
import ToggleButton from "./ToggleButton";

import { localToEorzea, getTranslation, formatTimes } from "../utils";

const imageCache = {};

const importAll = (r) => {
  r.keys().forEach((key) => imageCache[key] = r(key));
};

importAll(require.context("../assets/", false, /\.png$/));

const asset = (s) => imageCache[`./${s}.png`].default;

const timeTillSpawn = (spawnHour) => {
  const eorzeaTime = localToEorzea(new Date());
  const eorzeaHour = eorzeaTime.getHours();

  // hours = (time1 - time2 + 24) % 24;

  // if (spawnHour >= eorzeaHour + 2) {
  //   console.log(`sh: ${spawnHour} eh: ${eorzeaHour}`);
  //   return 0;
  // }

  return (spawnHour - eorzeaHour + 24) % 24;
};

const eMinsTillNextSpawn = (spawnTimes, uptime) => {
  const eorzeaTime = localToEorzea(new Date());
  const eorzeaHour = 16; // eorzeaTime.getHours(); // here
  const eorzeaMin = 1; // eorzeaTime.getMinutes();
  const minsTill = 60 - eorzeaMin;

  let smallestTimeDiff = Infinity;
  let nextTime;

  for (const spawnTime of spawnTimes) {
    // if (eorzeaHour === spawnTime) {
    //   return 24 * 60 - eorzeaMin;
    // }
    let timeDiff = Infinity;
    if (eorzeaHour < spawnTime) {
      timeDiff = spawnTime - eorzeaHour;
    }

    if (eorzeaHour > spawnTime) {
      timeDiff = 24 - eorzeaHour + spawnTime;
    }

    if (timeDiff < smallestTimeDiff) {
      smallestTimeDiff = timeDiff;
      nextTime = spawnTime;
    }
  }

  // if (smallestTimeDiff === Infinity) console.log(`eh: ${eorzeaHour} em: ${eorzeaMin}`);

  if (smallestTimeDiff > 0) {
    return ((smallestTimeDiff - 1) * 60) + minsTill;
  }
  return minsTill;
};

const App = () => (
  <div className="app">
    <Sidebar />
    <div>
      <Cards />
    </div>
  </div>
);

const Sidebar = () => {
  const handleInfoToggle = (value) => {
    console.log(`v: ${value}`);
  };

  return (
    <div className="sidebar">
      <Clock />
      <ToggleButton buttonText="test" onToggle={handleInfoToggle} />
      <ToggleButton buttonText="click me" enabled onToggle={handleInfoToggle} />
    </div>
  );
};

const Resource = ({
  name, icon, suffix, suffixName,
}) => (
  <div className="resource">
    <img key={`icon-${icon}`} src={asset(icon)} className="icon" alt={name} />
    <div key={`name-${icon}`} className="name">{name}</div>
    {suffix
      ? <img key={`suffix-${icon}`} src={asset(suffix)} className="suffix-icon" title={suffixName || ""} />
      : null}
  </div>
);

const Resources = ({ node, job }) => (
  <div className="resource-container">
    <img src={asset(job)} className="skill-icon" />
    {node.map((item, index) => (
      <Resource key={`res-${item.icon}-${item.id}`} name={item.name} icon={item.icon} suffix={item.suffix} suffixName={item.suffixName} />
    ))}
  </div>
);

// a - b: ascending order, b - a: descending order
const selectedNodes = nodes.map((node) => node)
  .sort((a, b) => eMinsTillNextSpawn(a.times, a.uptime) - eMinsTillNextSpawn(b.times, b.uptime));
// console.log(selectedNodes);

const Cards = () => {
  const [time, setTime] = useState(new Date());
  const [et, setET] = useState(localToEorzea(new Date()));
  const [trackedNodes, setTrackedNodes] = useState(nodes.map((node) => node));

  const updateOnHourChange = et.getHours();

  useEffect(() => {
    setTrackedNodes((n) => n.sort((a, b) => eMinsTillNextSpawn(a.times, a.uptime) - eMinsTillNextSpawn(b.times, b.uptime)));
    // console.log("Updated");
  }, [updateOnHourChange]);

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
    <div className="card-container">
      {trackedNodes.map((node) => (<Card key={`card-${node.id}`} data={node} time={eMinsTillNextSpawn(node.times, node.uptime)} />))}
    </div>
  );
};

const Card = ({ data, time }) => {
  const {
    node, job, zone, teleport, pos, times, uptime, id,
  } = data;
  const [x, y] = pos;

  const hideInfoContainer = false;

  return (
    <div className="card">

      <div className="title-container">
        <div className="teleport">{getTranslation(teleport)}</div>
        <div className="timer">{time}</div>
      </div>

      <Resources node={node} job={job} />

      <div className={`info-container ${hideInfoContainer ? "hide-me" : ""}`}>
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
