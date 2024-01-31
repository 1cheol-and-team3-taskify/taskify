import { Children, useState } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import Image from "next/image";

import { useForm } from "react-hook-form";

const eyeon = require("@/public/input/password-on.svg");
const eyeoff = require("@/public/input/password-off.svg");

interface InputProps {
  //children: React.ReactNode;
  value?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
  disabled?: boolean;
  id: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  disabled = false,
  // children,
  type,
  id,
  placeholder,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const { register, handleSubmit } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const inputProps = {
    type: showPassword ? "text" : type,
    disabled,
    id,

    //children,
    ...props,
  };

  return (
    <div className={clsx(styles.inputContainer)}>
      <div className={clsx(styles.inputWrapper)}>
        <input
          className={clsx(styles.input, error && styles.error)}
          placeholder={placeholder}
          // className={isError ? clsx(styles.error) : clsx(styles.input)}
          {...inputProps}
        />
        {id === "password" && (
          <button
            className={clsx(styles.togglePasswordButton)}
            onClick={togglePasswordVisibility}
          >
            <Image
              className={clsx(styles.togglePasswordButton)}
              src={showPassword ? eyeon : eyeoff}
              alt={showPassword ? "password-on" : "password-off"}
            />
          </button>
        )}
        {error && <div className={clsx(styles.errorMessage)}>{error}</div>}
      </div>
    </div>
  );
};

export default Input;
