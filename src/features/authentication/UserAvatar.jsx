import styled from "styled-components";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const avatar = user?.user_metadata?.avatar;
  const name = user?.user_metadata?.name;
  const role = user?.user_metadata?.role;
  console.log(user);
  return (
    <StyledUserAvatar
      onClick={role === "doctor" ? () => navigate("/profile") : undefined}
    >
      <Avatar src={avatar || "default-user.jpg"} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
