import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "@/styles/pages/MyPage.module.scss";
import axios from "@/lib/axios";
import { useForm, FieldError, FieldValues } from "react-hook-form";
import Button from "@/components/button/baseButton/BaseButton";
import ReturnButton from "@/components/button/returnButton/returnButton";
import AddImage from "@/components/mypage/AddImage";
import { GetUserInfoType } from "@/types/users";
import authInstance from "@/lib/axios";
import { PutUserInfoProps } from "@/types/users";
import { PutPasswordInfoProps } from "@/types/users";
import MismatchModal from "@/components/modal/mismatchModal/MismatchModal";
import ProfileChangeForm from "@/components/mypage/form/ProfileChangeForm";
import PasswordChangeForm from "@/components/mypage/form/PasswordChangeForm";
function MyPage() {
  return (
    <div className={clsx(styles.all)}>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.back)}>
          <ReturnButton />
        </div>

        <main>
<<<<<<< HEAD
          <section>
            <div className={clsx(styles.title)}>프로필</div>
            <ProfileChangeForm />
=======
          {/* {isOpen && (
            <ModalContainer setIsOpen={setIsOpen}>
              <div className={clsx(styles.modal)}>
                현재 비밀번호가 틀렸습니다.
                <Button onClick={() => setIsOpen(false)}>확인</Button>
              </div>
            </ModalContainer>
          )} */}
          {isModalOpen && (
            <AlertModal
              setModal={setIsModalOpen}
              alertMessage="현재 비밀번호가 틀렸습니다."
              confirmMessage="확인"
            />
          )}
          <div className={clsx(styles.back)}>
            <ReturnButton />
          </div>
          <section className={clsx(styles.section1)}>
            <div className={clsx(styles.profile)}>프로필</div>
            <div className={clsx(styles.section1Contents)}>
              <AddImage
                profileImageUrl={userInfo.profileImageUrl}
                onImageUpload={handleImageUpload}
              />
              <form
                onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
              >
                <label htmlFor="email">이메일</label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  placeholder={userInfo.email}
                />

                <label
                  className={clsx(styles.nickNameLabel)}
                  htmlFor="nickName"
                >
                  닉네임
                </label>
                <input
                  className={clsx(styles.nickName, {
                    [styles.error]: errors.nickName,
                  })}
                  id="nickName"
                  type="text"
                  defaultValue={userInfo.nickname}
                  {...register("nickName", {
                    required: "닉네임을 입력해 주세요.",
                    maxLength: {
                      value: 10,
                      message: "열 자 이하로 작성해 주세요.",
                    },
                  })}
                  onChange={handleInputChange}
                />
                {isSubmitted && errors.nickName && (
                  <small key="nickName-error" role="alert">
                    {(errors.nickName as FieldError).message}
                  </small>
                )}

                <Button onClick={() => handleSaveButtonClick()}>저장</Button>
              </form>
            </div>
>>>>>>> dbbca98 (Fix: 변경된 컴포넌트에 따른 수정)
          </section>

          <section>
            <div className={clsx(styles.title)}>비밀번호 변경 </div>
            <PasswordChangeForm />
          </section>
        </main>
      </div>
    </div>
  );
}

export default MyPage;
