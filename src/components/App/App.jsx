import { useEffect, useState } from "react";
import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ temperature: { F: 999 } });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleOpenAddModal = () => setActiveModal("add-garment");
  const handleCloseModal = () => setActiveModal("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} onAddClick={handleOpenAddModal} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
      </div>

      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <div className="formGroup">
          <label className="headerModalLabel" htmlFor="name">
            Name
          </label>
          <input className="headerModalInput" id="name" placeholder="Name" />
        </div>
        <div className="formGroup">
          <label className="headerModalLabel" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="headerModalInput"
            id="imageUrl"
            placeholder="Image URL"
          />
        </div>
        <div className="modalRadio">
          <p>Select the weather type:</p>
          <div>
            <input type="radio" id="hot" name="temperature" value="hot" />
            <label htmlFor="hot">Hot</label>
          </div>
          <div>
            <input type="radio" id="warm" name="temperature" value="warm" />
            <label htmlFor="warm">Warm</label>
          </div>
          <div>
            <input type="radio" id="cold" name="temperature" value="cold" />
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
  );
}

export default App;
