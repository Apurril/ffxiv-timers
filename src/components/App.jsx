/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v1 as uuid } from "uuid";
import "./App.css";
import Clock from "./Clock";
import ToggleButton from "./ToggleButton";

import { filterJob, sortNodes, toggleInfobox } from "../redux-stuff";

import {
  localToEorzea, getTranslation, formatTimes, importAll, asset, eMinsTillNextSpawn,
} from "../utils";
import ImageButton from "./ImageButton";

const App = () => {
  importAll(require.context("../assets/", false, /\.png$/)); // TODO this seems weird
  return (
    <div className="app">
      <Sidebar />
      <div>
        <Cards />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const infoboxEnabled = useSelector((state) => state.ui.infobox);
  const handleInfoToggle = () => {
    dispatch(toggleInfobox());
    console.log(infoboxEnabled);
  };

  return (
    <div className="sidebar">
      <Clock />
      <ToggleButton onToggle={handleInfoToggle} title="Infobox toggle" />
      <ToggleButton enabled onToggle={handleInfoToggle} />
      <ToggleButton onToggle={handleInfoToggle} />
      <ToggleButton enabled onToggle={handleInfoToggle} />
      <ImageButton />
      <ImageButton />
    </div>
  );
};

const Icon = ({ icon, name = "", className = "" }) => <img key={`Icon-${uuid()}`} src={asset(icon)} className={className} alt={name} title={name} />;

const Resource = ({
  name, icon, suffix, suffixName, scrip,
}) => (
  <div className="resource">
    {/* <img key={uuid} src={asset(icon)} className="icon" alt={name} /> */}
    <Icon className="icon" icon={icon} name={name} />
    <div key={uuid()} className="name">{name}</div>
    {suffix
      ? <Icon className="suffix-icon" icon={suffix} name={suffixName} />
      : null}
    {scrip
      ? <Icon className="suffix-icon" icon={scrip} />
      : null}
  </div>
);

const Resources = ({ node, job }) => (
  <div className="resource-container">
    {/* <Icon className="skill-icon" icon={job} /> */}
    {node.map((item) => (
      <Resource
        key={`res-${uuid()}`}
        name={item.name}
        icon={item.icon}
        suffix={item.suffix}
        suffixName={item.suffixName}
        scrip={item.scrip}
      />
    ))}
  </div>
);

const Cards = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const [et, setET] = useState(localToEorzea(new Date()));
  const cards = useSelector((state) => state.cards);

  const updateOnHourChange = et.getHours();

  const handleNodeSorting = () => {
    dispatch(sortNodes());
  };

  const handleFilter = () => {
    dispatch(filterJob("min"));
  };

  useEffect(() => {
    // handleNodeSorting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {cards.map((node) => (<Card key={`card-${uuid()}`} data={node} time={eMinsTillNextSpawn(node.times, node.uptime)} />))}
    </div>
  );
};

const Card = ({ data, time }) => {
  const {
    node, job, zone, teleport, pos, times, uptime, id,
  } = data;
  const [x, y] = pos;

  const infoboxEnabled = useSelector((state) => state.ui.infobox);

  return (
    <div className="card">

      <div className="title-container">
        <div className="teleport">{getTranslation(teleport)}</div>
        <div className="timer">{time}</div>
      </div>

      <Resources node={node} job={job} />

      <div className={`info-container ${infoboxEnabled ? "" : "hide-me"}`}>
        <div className="zone">{`${zone}`}</div>
        <Icon className="skill-icon" icon={job} />
        <div className="coords">{`(${x}, ${y})`}</div>
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
