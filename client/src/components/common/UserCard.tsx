import { ProfilePhoto } from 'components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SearchedUserProps } from 'utils/types';

const CardWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;

  p {
    margin-left: 16px;
    font-size: 0.875rem;
    color: black;
    text-decoration: none;
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

const UserCard: React.FC<SearchedUserProps> = ({ user }) => {
  return (
    <Link to={`/profile/${user.idx}`}>
      <CardWrap>
        <ProfilePhoto size="36px" />
        <p>{user.nickname}</p>
      </CardWrap>
    </Link>
  );
};

export default UserCard;
