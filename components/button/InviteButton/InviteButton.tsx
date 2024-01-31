// InviteButton.tsx

import React, { useState } from "react";
import clsx from "clsx";
import styles from "./InviteButton.module.scss";

interface InvitebuttonProps {
  children: React.ReactNode;
  type?: "accept" | "deny";
  disabled?: boolean;
  small?: boolean;
  large?: boolean;
  onAccept?: () => void;
  onDeny?: () => void;
}

const InviteButton: React.FC<InvitebuttonProps> = ({
  children,
  type = "accept",
  disabled = false,
  small,
  large,
  onAccept,
  onDeny,
  ...props
}) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(true);
  const [isDenied, setIsDenied] = useState<boolean>(false);

  const handleAcceptClick = () => {
    setIsAccepted(!isAccepted);
    setIsDenied(!isDenied);

    if (onAccept) {
      onAccept();
    }
  };

  const handleDenyClick = () => {
    setIsAccepted(!isAccepted);
    setIsDenied(!isDenied);

    if (onDeny) {
      onDeny();
    }
  };

  const handleDisabledClick = () => {
    setIsAccepted(!isAccepted);
    setIsDenied(!isDenied);
  };

  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.selected]: disabled,
        },
        small && styles.small,
        large && styles.large,
      )}
      onClick={
        disabled
          ? handleDisabledClick
          : type === "accept"
            ? handleAcceptClick
            : handleDenyClick
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default InviteButton;
