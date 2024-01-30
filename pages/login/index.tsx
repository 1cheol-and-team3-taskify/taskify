import InviteButton from "@/components/button/InviteButton/InviteButton";

export default function Login() {
  const handleAccept = () => {
    console.log("수락 버튼이 클릭되었습니다.");
  };

  const handleDeny = () => {
    console.log("거절 버튼이 클릭되었습니다.");
  };
  const handleDelte = () => {
    console.log("삭제 버튼이 클릭되었습니다.");
  };

  return (
    <div>
      <InviteButton type="accept" onAccept={handleAccept}>
        수락
      </InviteButton>
      <InviteButton type="deny" onDeny={handleDeny}>
        거절
      </InviteButton>
      <InviteButton type="delete" onDelete={handleDelte}>
        삭제
      </InviteButton>
    </div>
  );
}
