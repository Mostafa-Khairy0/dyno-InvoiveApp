export type ModeName = "dark" | "light";

export type Color = {
  main: string;
  secondary: string;
  fontColor: string;
};

export interface Mode {
  name: ModeName;
  color: Color;
}
