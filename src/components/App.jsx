/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from "react";
import "./App.css";

const imageCache = {};

const importAll = (r) => {
  r.keys().forEach((key) => imageCache[key] = r(key));
};

importAll(require.context("../assets/", false, /\.png$/));

const asset = (s) => imageCache[`./${s}.png`].default;

const formatTimes = (times) => times.reduce((prev, curr) => `${prev} & ${curr}`);

const lang = "en";
const getTranslation = (object) => object[lang] || object.en;

const jobs = {
  botany: "btn",
  mining: "min",
  fishing: "fsh",
};

const scrips = {
  yellow: "yellow",
  white: "white",
};

const teleports = {
  lydhaLran: {
    en: "Lydha Lran",
    jp: "リダ・ラーン",
  },
  tomra: {
    en: "Tomra",
    jp: "トメラの村",
  },
  theOndoCups: {
    en: "The Ondo Cups",
    jp: "オンドの潮溜まり",
  },
  theInnatJourneysHead: {
    en: "The Inn at Journey's Head",
    jp: "旅立ちの宿",
  },
};

const zones = {
  ilMheg: "Il Mheg",
  kholusia: "Kholusia",
  theTempest: "The Tempest",
  amhAraeng: "Amh Araeng",
};

const sands = {
  agedeep: {
    suffix: "21234",
    suffixName: "Agedeep Aethersand",
  },
};

const cardData = [
  {
    node: [
      {
        name: "Beryllium Ore",
        id: "21455",
      },
      {
        name: "Prismstone",
        id: "21232",
        suffix: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    pos: [30, 21],
    times: ["4:00", "16:00"],
  },
  {
    node: [
      {
        name: "Beryllium Ore",
        id: "21455",
      },
    ],
    job: jobs.mining,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    pos: [30, 21],
    times: ["4:00", "16:00"],
  },
  {
    node: [
      {
        name: "Prismstone",
        id: "21232",
        suffix: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    pos: [30, 21],
    times: ["4:00", "16:00"],
  },
  {
    node: [
      {
        name: "Shade Quartz",
        id: "21462",
        ...sands.agedeep,
      },
      {
        name: "Shade Quartz",
        id: "21462",
        suffix: "21234",
        suffixName: "Agedeep Aethersand",
      },
      // {
      //   name: "Fire Cluster",
      //   id: "20013",
      // },
    ],
    job: jobs.mining,
    zone: zones.kholusia,
    teleport: teleports.tomra,
    pos: [22, 18],
    times: ["16:00"],
  },
  {
    node: [
      {
        name: "Raw Onyx",
        id: "21231",
        suffix: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.theTempest,
    teleport: teleports.theOndoCups,
    pos: [15, 21],
    times: ["12:00", "00:00"],
  },
  {
    node: [
      {
        name: "Broad Beans",
        id: "25353",
        suffix: scrips.yellow,
      },
    ],
    job: jobs.botany,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    pos: [25, 36],
    times: ["12:00", "00:00"],
  },
  {
    node: [
      {
        name: "Duskblooms",
        id: "25022",
      },
    ],
    job: jobs.botany,
    zone: zones.amhAraeng,
    teleport: teleports.theInnatJourneysHead,
    pos: [32, 33],
    times: ["4:00", "16:00"],
  },
];

const App = () => (
  <div className="idk">
    <RenderCards />
  </div>
);

// eslint-disable-next-line object-curly-newline
const Resource = ({ name, id, suffix, suffixName }) => (
  <div className="resource">
    <img key={`icon-${id}`} src={asset(id)} className="icon" alt={name} />
    <div key={`name-${id}`} className="name">{name}</div>
    {suffix ? <img key={`suffix-${id}`} src={asset(suffix)} className="suffix-icon" title={suffixName || ""} /> : null}
  </div>
);

const RenderResources = ({ node, job }) => (
  <div className="resource-container">
    <img src={asset(job)} className="skill-icon" />
    {node.map((item, index) => (<Resource key={`res-${item.id}-${index}`} name={item.name} id={item.id} suffix={item.suffix} suffixName={item.suffixName} />))}
  </div>
);

const RenderCards = () => (
  <div className="card-container">
    {cardData.map((card, index) => (<Card key={`card-${index}`} data={card} />))}
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

      <RenderResources node={node} job={job} />

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
