import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import SunriseLoader from "../SunriseLoader/SunriseLoader";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { validateField, isFormValid } from "../../utils/validation";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({
    temperature: { F: null },
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [formValues, setFormValues] = useState({
    name: "",
    imageUrl: "",
    temperature: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    imageUrl: "",
    temperature: "",
  });
  const isValid = isFormValid(formValues);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleOpenAddModal = () => setActiveModal("add-garment");
  const handleCloseModal = () => {
    setActiveModal("");
    setFormErrors({ name: "", imageUrl: "", temperature: "" });
    setFormValues({ name: "", imageUrl: "", temperature: "" });
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "name")
      setFormErrors({ ...formErrors, name: validateField("name", value) });
    if (name === "imageUrl")
      setFormErrors({
        ...formErrors,
        imageUrl: validateField("imageUrl", value),
      });
  };

  const handleRadioChange = (e) => {
    setFormValues({ ...formValues, temperature: e.target.value });
    setFormErrors({
      ...formErrors,
      temperature: validateField("temperature", e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      _id: Date.now(),
      name: formValues.name,
      link: formValues.imageUrl,
      weather: formValues.temperature,
    };
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  if (!Number.isFinite(weatherData.temperature.F)) {
    return <SunriseLoader />;
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header weatherData={weatherData} onAddClick={handleOpenAddModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleOpenAddModal}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          isOpen={activeModal === "add-garment"}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          isValid={isValid}
        >
          <div className="formGroup">
            <div className="formGroupHeader">
              <label
                className={`modalLabel ${formErrors.name ? "modalLabelError" : ""}`}
                htmlFor="name"
              >
                Name
              </label>
              <span
                className={`modalError ${formErrors.name ? "modalErrorVisible" : ""}`}
                id="name-error"
              >
                {formErrors.name}
              </span>
            </div>
            <input
              className={`modalInput ${formErrors.name ? "modalInputError" : ""}`}
              id="name"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="formGroup">
            <div className="formGroupHeader">
              <label
                className={`modalLabel ${formErrors.imageUrl ? "modalLabelError" : ""}`}
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <span
                className={`modalError ${formErrors.imageUrl ? "modalErrorVisible" : ""}`}
                id="imageUrl-error"
              >
                {formErrors.imageUrl}
              </span>
            </div>
            <input
              type="url"
              className={`modalInput ${formErrors.imageUrl ? "modalInputError" : ""}`}
              id="imageUrl"
              name="imageUrl"
              placeholder="Image URL"
              value={formValues.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="modalRadio">
            <div className="modalRadioHeader">
              <p className="modalRadioTitle">Select the weather type:</p>
              <span
                className={`modalError ${formErrors.temperature ? "modalErrorVisible" : ""}`}
                id="temperature-error"
              >
                {formErrors.temperature}
              </span>
            </div>
            <div>
              <input
                type="radio"
                id="hot"
                name="temperature"
                value="hot"
                onChange={handleRadioChange}
                checked={formValues.temperature === "hot"}
              />

              <label htmlFor="hot">Hot</label>
            </div>
            <div>
              <input
                type="radio"
                id="warm"
                name="temperature"
                value="warm"
                onChange={handleRadioChange}
                checked={formValues.temperature === "warm"}
              />
              <label htmlFor="warm">Warm</label>
            </div>
            <div>
              <input
                type="radio"
                id="cold"
                name="temperature"
                value="cold"
                onChange={handleRadioChange}
                checked={formValues.temperature === "cold"}
              />
              <label htmlFor="cold">Cold</label>
            </div>
          </div>
        </ModalWithForm>

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={handleCloseModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
