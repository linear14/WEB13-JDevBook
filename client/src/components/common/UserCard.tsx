import { ProfilePhoto } from 'components';
import styled from 'styled-components';

export interface User {
  idx: number;
  nickname: string;
  profile: string;
}

type UserProps = {
  user: User;
};

const CardWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;

  p {
    margin-left: 16px;
    font-size: 0.875rem;
  }

  &:hover {
    background: #e3e4e5;
    border-radius: 8px;
  }

  & + div {
    margin-top: 2px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;

const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <CardWrap>
      <ProfilePhoto size="36px" />
      <p>{user.nickname}</p>
    </CardWrap>
  );
};

export default UserCard;
