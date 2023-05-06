import React, {  useState } from "react";
import { BsSearch } from "react-icons/bs";
import { searchTweet } from "../ReactRedux/syncing/userTweet";
import { useDispatch, useSelector } from "react-redux";
import "../styles/explore.css";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const tweetsInfo = useSelector((state) => state.notificationReducer);
  const searchResult = tweetsInfo.searchQuery;
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const searchMe = (e) => {
    e.preventDefault();

      dispatch(searchTweet(query,isAuthenticated));
  
  };
  return (
    <form
      autoComplete="off"
      onSubmit={searchMe}
      className="searchform d-flex align-items-center form-control-sm"
    >
      
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyUp={searchMe}
        type="text"
        className="searchinput"
        id="search-bar"
        placeholder="Search for users"
      />
      {searchResult.length > 0 && (
        <div className="resultDiv">
          {searchResult.map((res) => (
            <Link to={`${res.username}`} key={res.id}>
              <SearchResult res={res} />
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchInput;

export const SearchResult = ({ res }) => {
  return (
    <div className="d-flex result">
      <img className="authorImage" src={res?.avatar} alt="your result" />
      <div className="mx-3">
        <strong>{res.username}</strong>
        <p className="side-name">{res.bio}</p>
      </div>
    </div>
  );
};
