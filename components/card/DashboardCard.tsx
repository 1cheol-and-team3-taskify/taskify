import styles from "./DashboardCard.module.scss";
import TagChips from "@/components/chips/TagChips";

const TEMP_IMAGE_PATH = "/temp/tempCardImage.png";
const TEMP_PROFILE_PATH = "/temp/tempCardProfile.svg";
const CALENDAR_ICON_PATH = "/icons/calendar.svg";

const DashboardCard = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.cardImage}
        src={TEMP_IMAGE_PATH}
        alt="Card Image"
      />
      <div>
        <div className={styles.cardTitle}>새로운 일정 관리 Taskify</div>
        <div className={styles.tagsAndDates}>
          <div className={styles.tags}>
            <TagChips tagName="백엔드" color="#D549B6" />
            <TagChips tagName="상" color="#4981D5" />
          </div>
          <div className={styles.dates}>
            <img
              className={styles.calendar}
              src={CALENDAR_ICON_PATH}
              alt="Calendar"
            />
            <span>2022.12.31</span>
          </div>
        </div>
      </div>
      <img
        className={styles.profileImage}
        src={TEMP_PROFILE_PATH}
        alt="Profile Image"
      />
    </div>
  );
};

export default DashboardCard;
