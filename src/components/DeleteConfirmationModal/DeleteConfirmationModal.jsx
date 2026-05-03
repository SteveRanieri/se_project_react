import "./DeleteConfirmationModal.css";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="deleteModal__overlay" onClick={onClose}>
      <div
        className="deleteModal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="deleteModal__message">
          Are you sure you want to delete this item?
        </p>
        <button className="deleteModal__confirm" onClick={onConfirm}>
          Yes, delete
        </button>
        <button className="deleteModal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
