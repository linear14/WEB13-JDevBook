import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userData, usersocket } from 'recoil/modal';
import { GroupPage, HomePage, LoginPage, ProfilePage } from './pages';

// interface AuthorityRouteType {
//   path: string;
//   component: React.ComponentType;
// }

// 로그인하고 새로고침해도 로그인화면으로 가짐;;
// const AuthorityRoute = ({ component, ...rest }: any) => {
//   const userdata = useRecoilValue(userData);
//   if (userdata.login) return <Route {...rest} exact component={component} />;
//   else return <Route {...rest} exact component={LoginPage} />;
// };

const Router: React.FC = () => {
  // const userdata = useRecoilValue(userData);
  // const socket = useRecoilValue(usersocket);
  // useEffect(() => {
  //   socket.emit('name', userdata.name);
  // }, [userdata]);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/group" exact component={GroupPage} />
        <Route path="/profile/:userId" exact component={ProfilePage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const NotFoundPage = () => {
  return <h2>404 Not Found Page</h2>;
};

export default Router;
