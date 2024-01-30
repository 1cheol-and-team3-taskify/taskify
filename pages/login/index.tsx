import InviteButton from "@/components/button/InviteButton/InviteButton";

export default function Login() {
  return (
    <div>
      <InviteButton type="accept">수락</InviteButton>
      <InviteButton type="deny">거절</InviteButton>
    </div>
  );
}
