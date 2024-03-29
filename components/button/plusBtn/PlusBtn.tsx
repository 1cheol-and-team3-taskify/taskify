import { ReactNode, MouseEvent } from "react";
import clsx from "clsx";
import Image from "next/image";
import styles from "./PlusBtn.module.scss";

interface PlusBtnProps {
  children?: React.ReactNode;
  type?: "button";
  size?: string;
  textStyle?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; // 새로 추가된 프로퍼티

}

const PlusBtn: React.FC<PlusBtnProps> = ({
  children,
  type = "button",
  size,
  textStyle,
  onClick,
  ...props
}) => {
  const plusBtnProps = { type, ...props };

  const btnSize = clsx(styles["btn"], size && styles[`btn-size-${size}`]);
  const textSize = clsx(textStyle && styles[`btn-text-${textStyle}`]);

  return (
    <button className={btnSize}  onClick={onClick} {...plusBtnProps}>
      <div className={clsx(styles["btn-contents"])}>
        {children && (
          <div className={textSize}>
            <span>{children}</span>
          </div>
        )}
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
