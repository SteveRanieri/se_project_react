import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, reset } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, reset);
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isValid={values.name && values.imageUrl && values.weather}
    >
      <div className="formGroup">
        <label className="modalLabel" htmlFor="name">
          Name
        </label>
        <input
          className="modalInput"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div className="formGroup">
        <label className="modalLabel" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          className="modalInput"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div className="modalRadio">
        <p className="modalRadioTitle">Select the weather type:</p>
        {["hot", "warm", "cold"].map((type) => (
          <div key={type}>
            <input
              type="radio"
              id={type}
              name="weather"
              value={type}
              onChange={handleChange}
              checked={values.weather === type}
            />
            <label htmlFor={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
