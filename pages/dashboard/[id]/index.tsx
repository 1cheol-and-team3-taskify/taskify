import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/Dashboard.module.scss";
import PlusBtn from "@/components/button/plusBtn/PlusBtn";
import CardColumn from "@/components/card/CardColumn";
import ColumnAddModal from "@/components/modal/columnAddModal/ColumnAddModal";
import { getColumnList } from "@/api/columns";
import { ColumnDataType } from "@/types/column";
import clsx from "clsx";

const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [columnData, setColumnData] = useState<ColumnDataType>();

  const ColumnListData = async (dashboardId: number) => {
    try {
      const response = await getColumnList(dashboardId);
      setColumnData(response);
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      ColumnListData(dashboardId);
    }
  }, [dashboardId]);

  useEffect(() => {
    if (!isOpen) {
      if (router.query.id) {
        ColumnListData(dashboardId);
      }
    }
  }, [isOpen]);

  const refreshColumnList = () => {
    ColumnListData(dashboardId);
  };

  const openModal = () => {
    const maxColumnCount = 10;
    if (columnData && columnData.data.length < maxColumnCount) {
      setIsOpen(true);
    } else {
      alert(`더 이상 컬럼을 추가할 수 없습니다. (최대 ${maxColumnCount}개)`);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.columns}>
        {columnData?.data.map(column => (
          <CardColumn
            key={column.id}
            id={column.id}
            title={column.title}
            refreshColumnList={refreshColumnList}
          />
        ))}
        <div className={clsx(styles.plusBtn)}>
          <PlusBtn size={"colum"} textStyle={"colum"} onClick={openModal}>
            새로운 컬럼 추가하기
          </PlusBtn>
        </div>
        {isOpen && (
          <ColumnAddModal
            setIsOpen={setIsOpen}
            currentId={dashboardId}
            refreshColumnList={refreshColumnList}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
