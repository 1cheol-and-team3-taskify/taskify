import { ChangeEvent } from "react";
import Input from "@/components/input/inputa";
import Image from "next/image";
import Head from "next/head";
import styles from "@/styles/pages/Signup.module.scss";
import clsx from "clsx";
import Button from "@/components/button/baseButton/BaseButton";
import Link from "next/link";
import { emailRegex, passwordRegex } from "@/utils/regexp";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";

interface FormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    setError,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    // 실제로는 여기에서 폼 데이터를 처리하고 에러를 설정하는 로직이 들어갑니다.

    // 예시: 이메일이 특정 조건을 만족하지 않으면 에러 설정
    if (!data.email.includes("@")) {
      setError("email", {
        type: "manual",
        message: "이메일 형식이 올바르지 않습니다.",
      });
    }

    // 예시: 패스워드가 특정 길이 미만이면 에러 설정
    if (data.password.length < 8) {
      setError("password", {
        type: "manual",
        message: "패스워드는 8자 이상이어야 합니다.",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={clsx(styles.body)}>
        <header className={clsx(styles.header)}>
          <div className={clsx(styles.wrapHeader)}>
            <Image
              className={clsx(styles.logo)}
              src="/logo/logo.svg"
              alt="로고"
              width={164}
              height={189}
              priority
            />
            <Image
              className={clsx(styles.taskify)}
              src="/logo/Taskify.svg"
              alt="Taskify"
              width={198}
              height={55}
              priority
            />
          </div>
          <p className={clsx(styles.hello)}>첫 방문을 환영합니다!</p>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.form)}>
          <div className={clsx(styles.wrapInput)}>
            <label htmlFor="email" className={clsx(styles.label)}>
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              error="입력이 잘못되었습니다. "
              {...register("email")}
              // error={errors.email?.message}
              //   pattern: {
              //     value: emailRegex,
              //     message: "이메일 형식으로 작성해 주세요.",
              //   },
              // })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </div>

          {/* {errors.password && <div></div>} */}
          {/* modal -> dialog | div | alert */}
          <div className={clsx(styles.wrapInput)}>
            <label htmlFor="nickname" className={clsx(styles.label)}>
              닉네임
            </label>
            <Input
              id="nickname"
              type="nickname"
              placeholder="닉네임을 입력해주세요"
              error="입력이 잘못되었습니다. "
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>

          <div className={clsx(styles.wrapInput)}>
            <label htmlFor="password" className={clsx(styles.label)}>
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <small role="alert">{errors.password.message}</small>
            )}
          </div>

          <div className={clsx(styles.wrapInput)}>
            <label htmlFor="password" className={clsx(styles.label)}>
              비밀번호 확인
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
          </div>

          <div className={clsx(styles.cb)}>
            <input
              type="checkbox"
              id="cb"
              style={{
                borderRadius: "4px",
              }}
            ></input>
            <label htmlFor="cb">이용약관에 동의합니다.</label>
          </div>
          <div className={clsx(styles.signupBtn)}>
            <Button type="submit">가입하기</Button>
          </div>
          <div className={clsx(styles.loginText)}>
            <span>이미 가입하셨나요?</span>
            <Link href="/login" className={clsx(styles.login)}>
              로그인하기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
