import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { showSidebar } from "../ReactRedux/slices/stateSlice";
import {RiTwitterFill, RiLogoutBoxLine} from "react-icons/ri";
import {BiBell, BiBookmark, BiSearchAlt, BiHomeCircle} from "react-icons/bi";
import {CgProfile} from "react-icons/cg"
import {FiMail} from "react-icons/fi"
import {checkAuthenticated, load_user, logoutAct} from "../ReactRedux/syncing/normalUser";
import {removeNotice} from "../ReactRedux/slices/NotificationUser";
import AlertMessage from "./Details/alertMessage";
import TrendBar from "./TweetComponents/FollowRecs";


const Sidebar = () => {
  
  const notificationInfo = useSelector((state) => state.notificationReducer);
  const notificationCount = notificationInfo ? notificationInfo.count : null;  //notifications 
  const message = notificationInfo.message;
  const sidebarClass = useSelector((state) => state.changeClass.myclass);
  const userIn = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(showSidebar(""));
    };
  }, [dispatch]);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutAct());
      dispatch(load_user());
      dispatch(checkAuthenticated());
    }
  };
  const { user, isAuthenticated } = userIn;

  return (
    <>
      {message && (
        <AlertMessage
          removeMesage={removeNotice}
          dispatch={dispatch}
          message={message}
        />
      )}
      <div className={`nav ${sidebarClass}`} id="nav">
        <ul className="navbar-nav">
          <li className="cu-tweet">
            <i id="twitter-icon">
              <RiTwitterFill />
            </i>
            <span className="cutweet-text">CU Tweet</span>
          </li>
          <li className="nav-element"> 
            <NavLink to="/">
              <i>
                <BiHomeCircle />
              </i>
              <span className="link-text">Home</span>
            </NavLink>
          </li>
          <li className="nav-element">
            <Link to="/explore">
              <i>
                <BiSearchAlt />
              </i>
              <span className="link-text">Search</span>
            </Link>
          </li>
          <li className="notify-div nav-element">
            <Link to="/notifications">
              {notificationCount && <div className="notify-count">{notificationCount}</div>}
              <i>
                <BiBell />
              </i>
              <span className="link-text">Notifications</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li className="notify-div nav-element">
              <Link to="/messages">
              {notificationInfo.msgNotiExist && <div className="notify-count sm"></div>}
                <i>
                  <FiMail />
                </i>
                <span className="link-text">Messages</span>
              </Link>
            </li>
          )}
          {/* <li>
            <Link to="/bookmark">
              <i>
                <BiBookmark />
              </i>
              <span className="link-text">Bookmarks</span>
            </Link>
          </li> */}
          {isAuthenticated && (
            <li className="nav-element">
              <Link to={(user && `/${user.username}`) || "profile"}>
                <i>
                  <CgProfile />
                </i>
                <span className="link-text">Profile</span>
              </Link>
            </li>
          )}

          <li className="logout-li">
            <Link to="/" id="logout-li" onClick={logout}>
              <i>
                <RiLogoutBoxLine />
              </i>
              <span className="link-text">Logout</span>
            </Link>          
          </li>
          <li className="recs">
            <TrendBar />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
