import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./userPages/Login";
import Register from "./userPages/Register";
import Home from "./userPages/Home";
import Activate from "./userPages/Activate";
import AdminRedirect from "./userPages/AdminRedirect";
import Profile from "./userPages/Profile";
import TweetDetail from "./userPages/TweetDetail";
import NotFound from "./components/PageNotFound";
import { load_user, recommendMeUser } from "./ReactRedux/syncing/normalUser";
import { useDispatch, useSelector } from "react-redux";
import BookmarkList from "./userPages/userBookmark";
import ReconnectingWebSocket from "reconnecting-websocket";
import Notifications from "./userPages/Notifications";
import { removeNotice, tweetNotice } from "./ReactRedux/slices/NotificationUser";
import Explore from "./userPages/Explore";
import ChatMessage from "./userPages/ChatMessage";
import PrivateRoomChat from "./userPages/PrivateRoomChat";
import FollowUser from "./userPages/FollowUser";
import { getNotifications } from "./ReactRedux/syncing/userNotify";

function App() {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const dispatch = useDispatch();
  const noticeInfo = useSelector((state) => state.notificationReducer);
  const message = noticeInfo.message;
  let endpoint = `ws://127.0.0.1:8000/ws/home/`;
  let client;

  function websocketCon() {
    client = new ReconnectingWebSocket(endpoint + "?token=" + userIn.access);
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data);

      dispatch(tweetNotice(data.payload));
    };

    client.onclose = function () {
      console.log("WebSocket Client disconnected");
    };
  }
  message &&
    setTimeout(() => {
      dispatch(removeNotice());
    }, 3000);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      websocketCon();
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(load_user());
    if (isAuthenticated) {
      dispatch(recommendMeUser());
      dispatch(getNotifications());
    }

    !isAuthenticated && <Redirect to="/login"></Redirect>;
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/activate/:uid/:token" exact component={Activate} />
        <Route path="/admin" component={AdminRedirect} />
        <Route path="/login" component={Login} />
        <Route path="/messages/w/:username" component={PrivateRoomChat} />
        <Route path="/messages" component={ChatMessage} />
        <Route path="/register" component={Register} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/bookmark" component={BookmarkList} />
        <Route path="/follow-users" component={FollowUser} />
        <Route path="/explore" component={Explore} />
        <Route path="/:username" exact component={Profile} />
        <Route path="/:username/tweet/:id" component={TweetDetail} />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
