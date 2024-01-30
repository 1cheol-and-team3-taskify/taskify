// InviteButton.tsx

import React, { useState } from "react";
import clsx from "clsx";
import styles from "./InviteButton.module.scss";

interface InvitebuttonProps {
  children: React.ReactNode;
  type?: "accept" | "deny" | "delete";
  disabled?: boolean;
  onAccept?: () => void;
  onDeny?: () => void;
  onDelete?: () => void;
}

const InviteButton: React.FC<InvitebuttonProps> = ({
  children,
  type = "accept",
  disabled = false,
  onAccept,
  onDeny,
  onDelete,
  ...props
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const handleAcceptClick = () => {
    setIsAccepted(true);
    if (onAccept) {
      onAccept();
    }
  };

  const handleDenyClick = () => {
    setIsAccepted(false);
    if (onDeny) {
      onDeny();
    }
  };
  const handleDelteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <button
      className={clsx(styles.button, {
        [styles.accept]: type === "accept" && !isAccepted,
        [styles.deny]: type === "deny" && !isAccepted,
        [styles.delete]: type === "delete",
        [styles.disabled]: disabled === isAccepted,
      })}
      onClick={type === "accept" ? handleAcceptClick : handleDenyClick}
      disabled={disabled}
      {...props}
    >
      <span
        className={clsx(styles.buttonText, {
          [styles.accept]: type === "accept",
          [styles.deny]: type === "deny",
          [styles.disabled]: isAccepted,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default InviteButton;
