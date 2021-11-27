import React from "react";

export const initialThemeState = {
  theme: "light",
  setTheme: () => null
};

const ThemeContext = React.createContext(initialThemeState);
export default ThemeContext;
