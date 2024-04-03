import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { ModeName, Color, Mode } from "../types/mode";

const darkColor: Color = {
  main: "var(--very-dark-blue)",
  secondary: "var(--dark-blue)",
  fontColor: "white",
};
const darkMode: Mode = {
  name: "dark",
  color: darkColor,
};
const lightColor: Color = {
  main: "var(--very-light)",
  secondary: "var(--extremely-light)",
  fontColor: "black",
};
const lightMode: Mode = {
  name: "light",
  color: lightColor,
};
const initialState: { value: Mode } = { value: lightMode };

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    switchMode: (state) => {
      if (state.value?.name == "light") state.value = darkMode;
      else state.value = lightMode;
    },
    setMode: (state, { payload: name }: PayloadAction<ModeName>) => {
      if (name == "light") state.value = lightMode;
      else state.value = darkMode;
    },
  },
});

export const { switchMode, setMode } = modeSlice.actions;

export const selectMode = (state: RootState) => state.mode.value;

export default modeSlice?.reducer;
