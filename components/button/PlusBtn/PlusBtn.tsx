import React from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./PlusBtn.module.scss";

interface PlusBtnProps {
  children: React.ReactNode;
  type?: "button";
  size?: string;
  text?: string;
}

const PlusBtn: React.FC<PlusBtnProps> = ({
  children,
  type = "button",
  size,
  text,
  ...props
}) => {
  const plusBtnProps = { type, ...props };

  const className = clsx(styles["btn"], size && styles[`btn-size-${size}`]);
  const textClassName = clsx(
    styles["btn-text"],
    text && styles[`btn-text-${text}`],
  );
  return (
    <button className={className} {...plusBtnProps}>
      <div className={clsx(styles["btn-contents"])}>
        <div className={textClassName}>
          <span>{children}</span>
        </div>
        <Image
          src="/button-icon/plus.png"
          alt="플러스 아이콘"
          width={22}
          height={22}
        />
      </div>
    </button>
  );
};

export default PlusBtn;
