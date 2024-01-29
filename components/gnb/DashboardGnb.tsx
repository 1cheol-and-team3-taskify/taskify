import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DashboardGnb.module.scss";

const DashboardGnb = () => {
  return (
    <div className={clsx(styles.gnb)}>
      <div className={clsx(styles.dashboardTitle)}>내 대시보드</div>
    </div>
  );
};

export default DashboardGnb;
