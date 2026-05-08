import { createContext, useContext } from "react";

export const CurrentTemperatureUnitContext = createContext(true);

export const useTemperature = () => useContext(CurrentTemperatureUnitContext);
