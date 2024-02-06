import mockInvitations from "./mockInvitations.json";
import mapInvitations from "@/utils/mapInvitations";
import { InitialInvitations } from "@/types/invitations";
import MyInvitedDashboardTable from "@/components/tables/myInvitedDashboardTable/MyInvitedDashboardTable";
import PlusBtn from "@/components/button/plusBtn/PlusBtn";
import styles from "@/styles/pages/Mydashboard.module.scss";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthProvider";
import ColumnAddModal from "@/components/modal/columnAddModal/ColumnAddModal";
import { SetStateAction, useState } from "react";
import TodoCreateModal from "@/components/modal/todoCreateModal/TodoCreateModal";

function MyDashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const mappedMockInvitations = mapInvitations(
    mockInvitations as InitialInvitations,
  );

  // 유저정보 테스트
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <div className={clsx(styles.bg)}>
      {/* {isOpen && <ColumnAddModal setIsOpen={setIsOpen}></ColumnAddModal>} */}
      <TodoCreateModal setIsOpen={setIsOpen}></TodoCreateModal>
      <PlusBtn textStyle={"colum16"}>새로운 대시보드</PlusBtn>
      <button
        style={{ backgroundColor: "lightgray", fontSize: "14px" }}
        onClick={() => logout()}
      >
        로그아웃 테스트 버튼
      </button>
      <MyInvitedDashboardTable
        totalCount={mockInvitations.totalCount}
        invitations={mappedMockInvitations}
      />
    </div>
  );
}

export default MyDashboard;
