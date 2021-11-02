import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from './pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/group" exact component={GroupPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

const GroupPage = () => {
  return <h2>GroupPage</h2>;
};

const ProfilePage = () => {
  return <h2>ProfilePage</h2>;
};

const NotFoundPage = () => {
  return <h2>404 Not Found Page</h2>;
};

export default Router;
