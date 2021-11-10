import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userData, usersocket } from 'recoil/store';
import { GroupPage, HomePage, LoginPage, ProfilePage } from './pages';

// interface AuthorityRouteType {
//   path: string;
//   component: React.ComponentType;
// }

//로그인하고 새로고침해도 로그인화면으로 가짐;;
//처음에 login false로 하면 아예 첨부터 넘어갈 수가 없음
//아래 함수 내부에서 userRecoilValue하면 처음 userData값인 빈 값만 받고 업데이트 안됨
//일단 Authority.tsx에서 location.href로 옮기는데 좀 느림
// const AuthorityRoute = ({ component, login, ...rest }: any) => {
//   if (login) return <Route {...rest} exact component={component} />;
//   else return <Route {...rest} exact component={LoginPage} />;
// };

const Router: React.FC = () => {
  const [login, setLogin] = useState(false);
  const userdata = useRecoilValue(userData);
  useEffect(() => {
    (async () => {
      const isloginRes: Response = await fetch('api/islogin');
      const islogin: boolean = await isloginRes.json();
      setLogin(islogin);
    })();
  }, [login, userdata]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route
          path="/home"
          exact
          render={() => (login ? <HomePage /> : <LoginPage />)}
        />
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
