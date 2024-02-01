import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./MembersDashboardTable.module.scss";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import BaseButton from "@/components/button/baseButton/BaseButton";
import { getMemberList } from "@/api/members/getMemberList";
import { GetMemberListType } from "@/types/members";
import { deleteMember } from "@/api/members/deleteMember";

function MembersDashboardTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dashMember, setDashMember] = useState<GetMemberListType | null>({
    members: [],
    totalCount: 0,
  });

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil((dashMember?.totalCount || 1) / ITEMS_PER_PAGE);

  const currentPageData = dashMember?.members.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const handleDeleteMember = async (memberId: number) => {
    await deleteMember(memberId);
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    const fetchMemberListData = async (page: number) => {
      const dashMember = await getMemberList(page, 4);
      setDashMember(dashMember);
    };

    fetchMemberListData(currentPage);
  }, []);

  return (
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.dashboardTitle)}>
        <div>구성원</div>
        <div className={clsx(styles.pageNumber)}>
          {`${totalPage} 페이지 중 ${currentPage}`}
          <PagingButton
            onClick={{
              left: handleLeftButtonClick,
              right: handleRightButtonClick,
            }}
            disabled={{
              left: currentPage === 1,
              right: currentPage === totalPage,
            }}
            small
          />
        </div>
      </div>
      <div className={clsx(styles.label)}>이름</div>
      <ul>
        {currentPageData?.map((member, index) => (
          <li key={member.id}>
            <div className={clsx(styles.memberListWrapper)}>
              <div className={clsx(styles.profileImage)}>
                {member.profileImageUrl ? (
                  <Image
                    src={`${member.profileImageUrl as string}`}
                    alt="프로필 이미지"
                    width={38}
                    height={38}
                  />
                ) : (
                  member.nickname[0]
                )}
              </div>
              <div className={clsx(styles.memberNickname)}>
                {member.nickname}
              </div>
              {index === 0 && currentPage === 1 ? (
                <Image
                  className={clsx(styles.crownIcon)}
                  src="/button-icon/crown_icon.png"
                  width={16}
                  height={16}
                  alt="crown icon"
                />
              ) : (
                <div className={clsx(styles.button)}>
                  <BaseButton
                    onClick={() => {
                      alert(
                        `${member.nickname}님을 구성원에서 삭제하겠습니까?`,
                      );
                      handleDeleteMember(member.id);
                    }}
                    small
                    white
                  >
                    삭제
                  </BaseButton>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
}
export default MembersDashboardTable;
