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
import style from "./TodoEditModal.module.scss";

import TagChips from "@/components/chips/TagChips";
import BaseButton from "@/components/button/baseButton/BaseButton";

import Dropdown from "@/components/dropdown/Dropdown";
import { generateRandomColorHexCode } from "@/utils/color";

import InputDropdown from "@/components/inputdropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";
import Calendar from "@/components/datepicker/Calendar";
import { TodoCreateType } from "@/types/cards";
import { DataType } from "@/types/column";
import { getCardList } from "@/api/cards";

interface TodoEditModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  columnId: number;
}

function TodoEditModal({ setIsOpen, columnId }: TodoEditModalProps) {
  const [cardData, setCardData] = useState<TodoCreateType>();
  const [situationState, setSituationState] = useState<DataType>({
    title: "",
  });
  // const [formState, setFormState] = useState<TodoCreateType>({
  //   title: "",
  //   description: "",
  //   tags: [],
  //   dueDate: "",
  //   assignee: [],
  //   imageUrl: "",
  // });
  const handleTodoEditClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();
  };
  const CardListData = async (columnId: number) => {
    try {
      const response = await getCardList(1, columnId);
      setCardData(response);
    } catch (error) {
      console.log("Get 요청 실패: ", error);
    }
  };
  useEffect(() => {
    CardListData(columnId);
  }, [columnId]);
  // const [tagInput, setTagInput] = useState("");
  // const [tags, setTags] = useState([]);

  // const handleTagInputChange = e => {
  //   setTagInput(e.target.value);
  // };

  // const handleTagInputKeyDown = e => {
  //   if (e.key === "Enter" && tagInput.trim() !== "") {
  //     setTags(prevTags => [...prevTags, tagInput.trim()]);
  //     setTagInput("");
  //   }
  // };

  return (
    <ModalPortal>
      <form onSubmit={handleTodoEditClick}>
        <ModalContainer setIsOpen={setIsOpen}>
          <div className={clsx(style.modalWrapper)}>
            <h1>할 일 수정</h1>
            <div className={clsx(style.inputWrapper)}>
              <div className={clsx(style.flexWrapper)}>
                <div>
                  <p>상태</p>
                  <Dropdown data={null}></Dropdown>
                </div>
                <div>
                  <p>담당자</p>
                  <div className={clsx(style.inputdropdown)}>
                    <InputDropdown small />
                  </div>
                </div>
              </div>
              <div className={clsx(style.gap)}>
                <p>
                  제목 <span className={clsx(style.star)}>*</span>
                </p>
                <input
                  className={clsx(style.input)}
                  placeholder="제목을 입력해 주세요"
                  onChange={function (
                    e: ChangeEvent<HTMLInputElement>,
                  ): void {}}
                ></input>
              </div>
              <div className={clsx(style.gap)}>
                <p>설명 *</p>
                <textarea
                  className={clsx(style.input)}
                  rows={5}
                  cols={40}
                  placeholder="설명을 입력해 주세요"
                ></textarea>
              </div>
              <div className={clsx(style.gap)}>
                <p>마감일</p>
                <Calendar />
              </div>
              <div className={clsx(style.gap)}>
                <p>태그</p>

                <TagChips
                  tagName={"가나다아라라"}
                  color={generateRandomColorHexCode()}
                />
                <input
                  className={clsx(style.input)}
                  placeholder="입력 후 Enter"
                ></input>
              </div>
              <div className={clsx(style.gap)}>
                <p> 이미지 </p>
                <div className={clsx(style.img)}>
                  <AddImage small profileImageUrl={null} />
                </div>
              </div>
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
              <BaseButton
                type="submit"
                small
                disabled={
                  !situationState.title ||
                  !formState.title ||
                  !formState.description
                }
              >
                생성
              </BaseButton>
            </div>
          </div>
        </ModalContainer>
      </form>
    </ModalPortal>
  );
}

export default TodoEditModal;
