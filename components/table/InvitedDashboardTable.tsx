import styles from "./InvitedDashboardTable.module.scss";
import { MappedInvitations } from "@/types/invitations";

interface InvitedDashboardTableProps {
  totalCount: number;
  invitations: MappedInvitations;
}

function InvitedDashboardTable({
  totalCount,
  invitations,
}: InvitedDashboardTableProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>초대받은 대시보드</div>
      {totalCount ? (
        <ul>
          {invitations.map(invitation => (
            <li>
              {invitation.dashboard}
              {invitation.inviter}
              {invitation.inviteAccepted}
            </li>
          ))}
        </ul>
      ) : (
        <div>아직 초대받은 대시보드가 없어요</div>
      )}
    </div>
  );
}

export default InvitedDashboardTable;
