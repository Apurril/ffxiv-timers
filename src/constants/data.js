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

const nodeType = {
  unspoiled: "Unspoiled",
  legendary: "Legendary",
};

const nodes = [
  {
    node: [
      {
        name: "Beryllium Ore",
        icon: "21455",
      },
      {
        name: "Prismstone",
        icon: "21232",
        suffix: scrips.white,
      },
    ],
    job: jobs.mining,
    zone: zones.ilMheg,
    teleport: teleports.lydhaLran,
    type: nodeType.legendary,
    stars: 1,
    pos: [30, 21],
    times: ["4:00", "16:00"],
    patch: 5.0,
  },
  {
    node: [
      {
        name: "Beryllium Ore",
        icon: "21455",
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
        icon: "21232",
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
        icon: "21462",
        ...sands.agedeep,
      },
      {
        name: "Shade Quartz",
        icon: "21462",
        suffix: "21234",
        suffixName: "Agedeep Aethersand",
      },
      // {
      //   name: "Fire Cluster",
      //   icon: "20013",
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
        icon: "21231",
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
        icon: "25353",
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
        icon: "25022",
      },
    ],
    job: jobs.botany,
    zone: zones.amhAraeng,
    teleport: teleports.theInnatJourneysHead,
    pos: [32, 33],
    times: ["4:00", "16:00"],
  },
];

export default nodes;
