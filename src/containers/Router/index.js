import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import Signup from "../Signup";
import VideoDetails from "../VideoDetails";
import ChangePassword from "../ChangePassword";
import UploadVideo from "../UploadVideo";

export const routes = {
  root: '/',
  login: '/users/login',
  signup: '/users/signup',
  videoDetails: '/videos/watch',
  changePassword: '/users/password',
  uploadVideo: '/videos/upload'
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={Home} />
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.signup} component={Signup} />
        <Route exact path={routes.videoDetails} component={VideoDetails} />
        <Route exact path={routes.changePassword} component={ChangePassword} />
        <Route exact path={routes.uploadVideo} component={UploadVideo} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
