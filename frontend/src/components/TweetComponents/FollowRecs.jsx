import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchBarInput";
import SideTop from "../SidebarTop";
import { useSelector } from "react-redux";
import RecommendUser from "../userRec/RecommendUser";
const TrendBar = () => {
  const userIn = useSelector((state) => state.userReducer);
  const isAuthenticated = userIn.isAuthenticated;
  const showSearch = useSelector((state) => state.tweetReducer.searchBar);
  const recommendusers = useSelector(
    (state) => state.userReducer.recommendedUser
  );
  return (
    <div className="second-trend">
      <SideTop />
      {/* {showSearch !== "no" && <SearchInput />} */}
      {isAuthenticated ? (
        <div className="follow-recs">
          <h4 className="follow-title">Who to Follow ?</h4>
          {recommendusers ? recommendusers.map((user) => (
            <RecommendUser key={user.username} user={user} />
          )) : null}
         <Link 
         to="/follow-users"> 
         <span className="side-name">
           More User</span></Link>
        </div>
      ) : (
        <div className="follow">
        <h4 className="follow-title">Please Login</h4>
      
      </div>
      )} 
    </div>
  );
};

export default TrendBar;
