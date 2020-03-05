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
