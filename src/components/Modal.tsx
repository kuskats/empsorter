import React, { useRef } from "react";

//интерфейс для пропсов модалки
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  //обработчик клика вне окна модалки
  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        {children} {/*передача контента через дочерний элемент*/}
      </div>
    </div>
  );
};

export default Modal;
