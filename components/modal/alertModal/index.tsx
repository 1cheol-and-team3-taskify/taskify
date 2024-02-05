import { Dispatch, ReactNode, SetStateAction } from "react";
import ModalContainer from "@/components/modal/ModalContainer";
import clsx from "clsx";
import styles from "./alertModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import ModalPortal from "../ModalPortal";

interface AlertModalProps {
  setModal: Dispatch<SetStateAction<boolean>>;
  alertMessage: string;
  confirmMessage: string;
  isCancelButton?: boolean;
}

function AlertModal({
  setModal,
  alertMessage,
  confirmMessage,
  isCancelButton,
}: AlertModalProps) {
  const disableModal = () => {
    setModal(false);
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setModal}>
        <div className={clsx(styles.modal)}>
          {alertMessage}
          <div className={clsx(styles.buttons)}>
            {isCancelButton && <BaseButton white>취소</BaseButton>}
            <BaseButton onClick={disableModal}>{confirmMessage}</BaseButton>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
}

export default AlertModal;
