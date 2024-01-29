import clsx from "clsx";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditColorChips.module.scss";
import { COLORS } from "@/constants/color";
import Image from "next/image";

interface EditColorChipsProps {
  theme: "color" | "custom" | string;
  selectedColor: string;
  setSelectedColor: (value: SetStateAction<string>) => void;
  isInModal?: boolean;
}

const colorCodeRules = {
  required: "값을 입력해주세요.",
  pattern: {
    value: /^#[a-zA-Z0-9]{6}$/,
    message: "형식이 맞지 않아요.",
  },
};

/**
 * @param selectedColor 현재 선택된 색상.
 * @param setSelectedColor 색상을 선택할 때 호출되는 함수. 선택된 색상을 인수로 받습니다.
 */

function EditColorChips({
  theme,
  selectedColor,
  setSelectedColor,
  isInModal,
}: EditColorChipsProps) {
  const colors = [
    COLORS.GREEN,
    COLORS.PURPLE,
    COLORS.ORANGE,
    COLORS.BLUE,
    COLORS.PINK,
  ];
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const customColorCode = watch("customColor");
  const isError = errors.customColor ? true : false;

  return theme === "custom" ? (
    <div className={clsx(styles.inputWrapper)}>
      <div className={clsx(styles.errorWrapper)}>
        <input
          className={clsx(styles.input, isError && styles.error)}
          {...register("customColor", colorCodeRules)}
          placeholder="#FFFFFF 형식으로 입력하세요"
        />
        {errors.customColor && (
          <div
            className={clsx(styles.errorMsg)}
          >{`${errors.customColor.message}`}</div>
        )}
      </div>
      <div className={clsx(styles.buttonWrapper)}>
        <button
          type="button"
          className={clsx(styles.button)}
          disabled={
            isError || !customColorCode || selectedColor === customColorCode
          }
          onClick={() => {
            setSelectedColor(customColorCode);
          }}
        >
          확인
        </button>
      </div>
    </div>
  ) : (
    <div className={clsx(styles.container)}>
      {colors.map(color => (
        <div
          key={color}
          className={clsx(
            styles.colorBox,
            selectedColor === color && styles.selected,
          )}
          onClick={() => setSelectedColor(color)}
          style={{
            backgroundColor: color,
            display: isInModal ? "flex" : "block",
          }}
        >
          {selectedColor === color && (
            <Image
              src="/icons/checkChip.svg"
              width={20}
              height={20}
              alt="check icon"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default EditColorChips;