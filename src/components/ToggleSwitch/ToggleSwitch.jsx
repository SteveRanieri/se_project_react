import "./ToggleSwitch.css";

export default function ToggleSwitch({ isFahrenheit, onToggle }) {
  console.log(isFahrenheit);
  return (
    <div className="toggleSwitch" onClick={onToggle}>
      <div className="toggleSwitch__track">
        <div
          className={`toggleSwitch__thumb ${!isFahrenheit ? "toggleSwitch__thumb_right" : ""}`}
        />
        <span
          className={`toggleSwitch__label toggleSwitch__label_f ${!isFahrenheit ? "toggleSwitch__label_dark" : "toggleSwitch__label_light"}`}
        >
          F
        </span>
        <span
          className={`toggleSwitch__label toggleSwitch__label_c ${isFahrenheit ? "toggleSwitch__label_dark" : "toggleSwitch__label_light"}`}
        >
          C
        </span>
      </div>
    </div>
  );
}
