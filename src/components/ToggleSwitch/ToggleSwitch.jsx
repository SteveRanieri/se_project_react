import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  return (
    <label className="toggleSwitch">
      <input
        type="checkbox"
        className="toggleSwitch__input"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <div className="toggleSwitch__track">
        <div
          className={`toggleSwitch__thumb ${currentTemperatureUnit === "C" ? "toggleSwitch__thumb_right" : ""}`}
        />
        <span
          className={`toggleSwitch__label toggleSwitch__label_f ${currentTemperatureUnit === "C" ? "toggleSwitch__label_dark" : "toggleSwitch__label_light"}`}
        >
          F
        </span>
        <span
          className={`toggleSwitch__label toggleSwitch__label_c ${currentTemperatureUnit === "F" ? "toggleSwitch__label_dark" : "toggleSwitch__label_light"}`}
        >
          C
        </span>
      </div>
    </label>
  );
}
