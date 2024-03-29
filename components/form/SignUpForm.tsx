import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import styles from "./Form.module.scss";
import clsx from "clsx";
import AuthInput from "../input/AuthInput";
import Button from "../button/baseButton/BaseButton";
import { regEmail, regPassword } from "@/utils/regexp";
import AlertModal from "../modal/alertModal";

interface SignForm {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirm?: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignForm>({ mode: "onBlur" });
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] =
    useState<string>("password");
  const [passwordConfirmInputType, setPasswordConfirmInputType] =
    useState<string>("password");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");

  const openModal = (error: string) => {
    setIsOpen(true);
    setErrorMessage(error);
  };

  const handleRouteLogin = () => {
    setIsOpen(false);
    setErrorMessage("");
    router.push("/login");
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordInputType(prev => (prev === "password" ? "text" : "password"));
  };

  const togglePasswordConfirmVisibility = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setPasswordConfirmInputType(prev =>
      prev === "password" ? "text" : "password",
    );
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(prev => !prev);
  };

  const onSubmit = async (data: SignForm) => {
    try {
      await axios.post("/users", data);
      openModal("가입이 완료되었습니다!");
    } catch (error: any) {
      if (error.response) {
        openModal(error.response.data.message);
      } else {
        openModal("회원가입 실패");
      }
    }
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        !errors.email &&
        !errors.nickname &&
        !errors.password &&
        !errors.passwordConfirm &&
        isCheckboxChecked
      ) {
        handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <form className={styles.signContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(styles.inputs)}>
        {isOpen && (
          <AlertModal
            setModal={setIsOpen}
            alertMessage={errorMessage}
            onConfirmClick={handleRouteLogin}
          />
        )}

        <AuthInput
          label="이메일"
          type="email"
          error={errors.email?.message}
          placeholder="이메일을 입력해 주세요."
          registerConfig={register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: regEmail,
              message: "올바른 이메일 주소가 아닙니다.",
            },
          })}
        />
      </div>

      <div className={clsx(styles.inputs)}>
        <AuthInput
          label="닉네임"
          type="text"
          error={errors.nickname?.message}
          placeholder="닉네임을 입력해 주세요."
          registerConfig={register("nickname", {
            required: "닉네임을 입력해 주세요.",
            maxLength: {
              value: 10,
              message: "열 자 이하로 작성해 주세요.",
            },
          })}
        />
      </div>
      <div className={clsx(styles.inputs, styles.wrapper)}>
        <AuthInput
          label="비밀번호"
          type={passwordInputType}
          error={errors.password?.message}
          placeholder="비밀번호를 입력해 주세요."
          onChangeType={togglePasswordVisibility}
          registerConfig={register("password", {
            required: "비밀번호를 입력해 주세요.",
            pattern: {
              value: regPassword,
              message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
            },
          })}
        />
      </div>
      <div className={clsx(styles.inputs, styles.wrapper)}>
        <AuthInput
          label="비밀번호 확인"
          type={passwordConfirmInputType}
          error={errors.passwordConfirm?.message}
          placeholder="비밀번호를 입력해 주세요."
          onKeyPress={handleOnKeyPress}
          onChangeType={togglePasswordConfirmVisibility}
          registerConfig={register("passwordConfirm", {
            required: "비밀번호를 입력해 주세요.",
            pattern: {
              value: regPassword,
              message: "비밀번호는 영문,숫자 조합 8자 이상 입력해 주세요.",
            },
            validate: value =>
              watch("password") === value || "비밀번호가 일치하지 않습니다.",
          })}
        />
      </div>
      <div className={clsx(styles.cb)}>
        <input
          type="checkbox"
          id="cb"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="cb">이용약관에 동의합니다.</label>
      </div>
      <div className={clsx(styles.signupBtn)}>
        <Button
          type="submit"
          disabled={
            !isCheckboxChecked || !watchEmail || !watchPassword || !isValid
          }
        >
          가입하기
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
