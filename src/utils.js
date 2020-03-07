/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */

const lang = "en";
const timeWarp = 10; // speed up time, default: 1
const eorzeaTimeFactor = 20.571428571428573 * timeWarp; // 60 * 24 / 70

export const localToEorzea = (date) => new Date(date.getTime() * eorzeaTimeFactor);
export const eorzeaToLocal = (date) => new Date(date.getTime() / eorzeaTimeFactor);

export const formatTimes = (times) => times.map((value) => `${value}:00`).join(" & ");

export const getTranslation = (object) => object[lang] || object.en;

export const formatTime = (date) => {
  const secs = date.getSeconds().toString().padStart(2, "0");
  const mins = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

const imageCache = {};

export const importAll = (r) => {
  // eslint-disable-next-line no-return-assign
  r.keys().forEach((key) => imageCache[key] = r(key));
};

export const asset = (s) => imageCache[`./${s}.png`].default;

export const eMinsTillNextSpawn = (spawnTimes, uptime) => {
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
