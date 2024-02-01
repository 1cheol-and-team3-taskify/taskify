import ReturnButton from "@/components/button/returnButton/returnButton";
import EditDashboardTable from "@/components/table/editDashboardTable/editDashboardTable";
import clsx from "clsx";
import styles from "@/styles/pages/DashboardEdit.module.scss";
import MembersDashboardTable from "@/components/table/membersDashboardTable/MembersDashboardTable";
import DeleteButton from "@/components/button/deleteButton/DeleteButton";
import InviteDashboardTable from "@/components/table/inviteDashboardTable/InviteDashboardTable";
import { deleteDashboard } from "@/api/dashboards/deleteDashboard";
import { DashboardType } from "@/types/dashboard";
import { useRouter } from "next/router";

function DashboardEdit({ id, title }: DashboardType) {
  const router = useRouter();

  const handleDeleteClick = async (dashboardId: number) => {
    await deleteDashboard(dashboardId);
    router.push(`/dashboard`);
  };
  return (
    <div className={clsx(styles.layout)}>
      <div className={clsx(styles.tables)}>
        <div>
          <ReturnButton />
        </div>
        <EditDashboardTable />
        <MembersDashboardTable />
        <InviteDashboardTable />
        <div className={clsx(styles.deleteButton)}>
          <DeleteButton
            onClick={() => {
              alert(`${title}을 삭제하시겠습니까?`);
              handleDeleteClick(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardEdit;
