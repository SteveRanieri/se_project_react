import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";

import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import SunriseLoader from "../SunriseLoader/SunriseLoader";

import { getWeather } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, addItem, deleteItem } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };
  const [weatherData, setWeatherData] = useState({
    temperature: { F: null },
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    name: "Current User",
    avatar: "https://placehold.net/avatar.png",
  });

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleOpenAddModal = () => setActiveModal("add-garment");
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleCardDelete = () => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleSubmit = (values, reset) => {
    console.log("submitting:", values);

    addItem(values)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        reset();
        handleCloseModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(data))
      .catch(console.error);

    getItems()
      .then((items) => setClothingItems(items))
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
          <Header
            weatherData={weatherData}
            onAddClick={handleOpenAddModal}
            currentUser={currentUser}
          />
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
                  currentUser={currentUser}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleSubmit}
          onCloseModal={handleCloseModal}
        />

        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteClick={() => openConfirmationModal(selectedCard)}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirm={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
