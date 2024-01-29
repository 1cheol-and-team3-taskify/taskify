import clsx from "clsx";
import styles from "./editDashboardTable.module.scss";
import EditButton from "@/components/button/editButton/EditButton";

function EditDashboardTable() {
  return (
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.dashboardTitle)}>
        <div className={clsx(styles.dashboardTitleText)}>
          {"dashboard title"}
        </div>
        <div>(color chips)</div>
      </div>
      <div className={clsx(styles.dashboardInputBox)}>
        <label className={clsx(styles.label)}>대시보드 이름</label>
        <input
          className={clsx(styles.dashboardInput)}
          placeholder="뉴 프로젝트"
        />
      </div>
      <div className={clsx(styles.editButton)}>
        <EditButton />
      </div>
    </form>
  );
}
export default EditDashboardTable;
