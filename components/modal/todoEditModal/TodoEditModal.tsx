import ModalContainer from "../ModalContainer";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./TodoEditModal.module.scss";
import TagChips from "@/components/chips/TagChips";
import BaseButton from "@/components/button/baseButton/BaseButton";
import Dropdown from "@/components/dropdown/Dropdown";
import { DropdownItem } from "@/components/dropdown/Dropdown";
import { generateRandomColorHexCode } from "@/utils/color";
import Plus from "@/components/button/plusBtn/PlusBtn";
import InputDropdown from "@/components/inputdropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";
import { TodoEditType } from "@/types/cards";
import axios from "@/lib/axios";
import { title } from "process";
import authInstance from "@/lib/axios";
import { getMemberList } from "@/api/members";
interface TodoEditModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSelectItem: (selectedItemId: number) => void;
}

function TodoEditModal({ setIsOpen }: TodoEditModalProps) {
  const [formState, setFormState] = useState<TodoEditType>({
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: [],
    imageUrl: "",
  });
  const [todoData, setTodoData] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    axios
      .get("columns?dashboardId=3341")
      .then(response => {
        setTodoData(response.data.data);
      })
      .catch(error => {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      });
  }, []);

  const todoDropdownItems: DropdownItem[] = todoData.map(({ id, title }) => ({
    id,
    title,
  }));

  // const [members, setMembers] = useState<
  //   { id: number; nickname: string; profileImageUrl: string }[]
  // >([]);
  // useEffect(() => {
  //   axios
  //     .get("members?page=1&size=20&dashboardId=3341")
  //     .then(response => {
  //       setMembers(response.data.members);
  //     })
  //     .catch(error => {
  //       console.error("데이터를 불러오는데 실패했습니다.", error);
  //     });
  // }, []);
  // const router = useRouter();
  // const { id } = router.query;
  // useEffect(() => {
  //   if (id) {
  //     // 대시보드 ID를 사용하여 API 호출
  //     const fetchMembers = async () => {
  //       try {
  //         const response = await axios.get(`/api/members`, {
  //           params: {
  //             page: 1,
  //             size: 20,
  //             dashboardId: id,
  //           },
  //         });
  //         const data = response.data;
  //         console.log("멤버 목록:", data);
  //       } catch (error) {
  //         console.error("API 호출 실패:", error);
  //       }
  //     };

  //     fetchMembers(); // API 호출 함수 실행
  //   }
  // }, [id]);
  const handleTodoEditClick = async (event?: FormEvent) => {
    if (event) event.preventDefault();
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleTodoEditClick}>
          <div className={clsx(style.modalWrapper)}>
            <h1>할 일 수정</h1>
            <div className={clsx(style.inputWrapper)}>
              <div className={clsx(style.flexWrapper)}>
                <div>
                  <p>상태</p>
                  <Dropdown data={todoDropdownItems}></Dropdown>
                </div>
                <div>
                  <p>담당자</p>
                  <div className={clsx(style.inputdropdown)}>
                    <InputDropdown small onSelectItem={handleSelectedId} />
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
                  //상태
                  !formState.title || !formState.description
                }
              >
                생성
              </BaseButton>
            </div>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}
