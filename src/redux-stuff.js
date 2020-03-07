/* eslint-disable max-len */

import {
  combineReducers, configureStore, createSlice, getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import nodeData from "./constants/data";
import { eMinsTillNextSpawn } from "./utils";

const nodesInitialState = nodeData.map((node) => node);

const cardsSlice = createSlice({
  name: "cards",
  initialState: nodesInitialState,
  reducers: {
    filterJob: (state, { payload }) => state.filter((node) => node.job === payload),

    sort: (state) => state.sort((a, b) => eMinsTillNextSpawn(a.times, a.uptime) - eMinsTillNextSpawn(b.times, b.uptime)),
  },
});

export const {
  filterJob,
  sort: sortNodes,
} = cardsSlice.actions;

const reducer = combineReducers({
  cards: cardsSlice.reducer,
});

const middleware = [...getDefaultMiddleware(), logger];
export default configureStore({
  reducer,
  middleware,
});
