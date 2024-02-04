import ModalContainer from "../ModalContainer";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./ColumnAddModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import axios from "@/lib/axios";
import { PostcolumnsAddData } from "@/types/columns";
interface ColumnAddModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ColumnAddModal({ setIsOpen }: ColumnAddModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [columnName, setColumnName] = useState("");

  const [title, setTitle] = useState<PostcolumnsAddData>({
    title: "",
  });

  useEffect(() => {
    const postColumnsAdd = async () => {
      try {
        const response = await axios.post(""); //엔드포인트 입력
        const { title } = response.data;
        setColumnName({ title }); //???
      } catch (error) {
        console.error(error);
      }
    };
    postColumnsAdd();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // columnName 값을 사용하여 폼 제출을 처리하는 로직을 추가
    // 예를 들어, axios를 사용하여 API 호출 등을 수행할 수 있습니다.

    // 제출 후 입력 값 초기화
    setColumnName("");

    // 모달 닫기
    setIsOpen(false);
  };

  const isCreateButtonDisabled = columnName.trim() === "";

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <div className={clsx(style.modalWrapper)}>
            <h1>새 컬럼 생성</h1>
            <div className={clsx(style.nameWrapper)}>
              <p>이름</p>
              <input
                className={clsx(style.nameInput)}
                type="text"
                placeholder="새로운 프로젝트"
                value={columnName}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(style.buttons)}>
              <BaseButton
                type="button"
                onClick={() => setIsOpen(false)}
                small
                white
              >
                취소
              </BaseButton>
              <BaseButton type="submit" small disabled={isCreateButtonDisabled}>
                생성
              </BaseButton>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default ColumnAddModal;
