import Image from "next/image";
import styles from "./DashboardCard.module.scss";

const TEMP_IMAGE_PATH = "/temp/tempCardImage.png";

const DashboardCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardImage}>
        <Image src={TEMP_IMAGE_PATH} fill alt="Card Image" />
      </div>
      <div className={styles.cardInfo}>{"blabla.."}</div>
    </div>
  );
};

export default DashboardCard;
