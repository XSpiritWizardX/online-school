import { useModal } from "../../context/Modal";

function OpenModalButton({
  // component to render inside the modal
  modalComponent,

  // text of the button that opens the modal
  buttonText,

  // optional: callback function that will be called once the button
  // that opens the modal is clicked
  onButtonClick,

  // optional: callback function that will be called once the modal is
  // closed
  onModalClose,

  // optional: className for styling the button
  className,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <button className={className} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
