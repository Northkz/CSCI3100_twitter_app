import { useDispatch, useSelector } from "react-redux";
import HomeTweets from "../components/TweetComponents/HomeTweets";
import { removeMesage } from "../ReactRedux/slices/tweetSlice";
import AlertMessage from "../components/Details/alertMessage";
import React from "react";
import SearchInput from "../components/SearchBarInput";
import SideTop from "../components/SidebarTop";

const Home = () => {
  const userIn = useSelector((state) => state.userReducer);
  const showSearch = useSelector((state) => state.tweetReducer.searchBar);
  const message = useSelector((state) => state.tweetReducer.message);
  const dispatch = useDispatch();
  message &&
setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);

  return (
    <div>
      {/* <SideTop />
      {showSearch !== "no" && <SearchInput />} */}
      <HomeTweets />

      {message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={message}
        />
      )}
    </div>
  );
};


export default Home;
