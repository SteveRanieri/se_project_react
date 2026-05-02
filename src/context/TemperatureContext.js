import { createContext, useContext } from "react";

export const TemperatureContext = createContext(true);

export const useTemperature = () => useContext(TemperatureContext);
