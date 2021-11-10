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
  useEffect(() => {
    (async () => {
      const islogin = await fetch('api/islogin').then((res) => res.json());
      setLogin(islogin);
    })();
  }, [login]);
  // 단점 첨에 false였다가 true가 되어서 로그인 화면 잠깐 보였다가 HomePage가짐
  // initUserdata에서도 데이터 가져오면서 error이면 로그인화면으로 돌리니까
  // 여기서는 localStorage에 저장을 할까 고민중. 그러면 잠깐 로그인 화면 보이는거 해결은 가능
  // 설사 localStorage를 브라우저에서 수정해도 initUserdata에서 처리는 해주니

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
