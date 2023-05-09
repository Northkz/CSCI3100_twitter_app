import React from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
import { TweetOperation } from "../TweetActions";
import Moment from "moment";
import { likeTweet } from "../../ReactRedux/syncing/userTweet";
import { BiGlobe } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { Cloudinary } from "cloudinary-core";
import { useEffect, useRef } from 'react';
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/dist/cld-video-player.min.css";
const VideoPlayer = ({ tweet, ...props }) => {
  const videoRef = useRef();
  const cloudinaryRef = useRef();
  const playerRef = useRef();
  useEffect(() => {
    if(tweet && tweet.video != null){
      // Store the Cloudinary window instance to a ref when the page renders
    
      if ( cloudinaryRef.current ) return;
  
      cloudinaryRef.current = window.cloudinary;
  
      playerRef.current = cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloud_name: "dyaylu9zv",
        secure: true
      });

      }
    }, []);

    if (tweet.image){
      return (
        <img alt="img" src={tweet?.image} className="image img" />
      ) 
    } 
    else if(tweet.image == null && tweet.video == null){
      return <></>
    }
    return (
      <div style={{ width: '500px'}}>
        <video
          ref={videoRef}
          className="cld-video-player cld-fluid"
          controls
          autoPlay
          data-cld-public-id = {`https://res.cloudinary.com/dyaylu9zv/${tweet.video}`}
          {...props}
          quality="auto"
        />
      </div>
    )
}


const TweetPostCard = ({ tweet, dispatch, user }) => {
  const likeTweetD = (id) => {
    dispatch(likeTweet(id));
  };
  return (
    <div className="tweetCard">
      <div className="actual-tweet">
        <div>
          <FiMoreHorizontal
            data-toggle="dropdown"
            className="dropdownIcon"
            id={`#${tweet.id}dropdown`}
            aria-haspopup="true"
            aria-expanded="false"
          />
          <DropDown
            target={`${tweet.id}dropdown`}
            tweet={tweet}
            user={user}
            tweetId={tweet.id}
          />
        </div>
        {tweet.parent ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong>
              <Link
                to={`${tweet.author.username}` || ""}
                className="mx-2 side-name"
              >
                {tweet?.author.username === user?.username
                  ? "You "
                  : tweet.author.username}{" "}
                retweeted !
              </Link>
            </strong>

            <TweetHasParentOrNot tweet={tweet.myparent} />
          </div>
        ) : (
          <TweetHasParentOrNot tweet={tweet} />
        )}
      </div>
      {tweet.parent ? (
        <TweetOperation
          liked={tweet.myparent.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.myparent.like_count}
          tweet={tweet.myparent}
          bookmark={tweet.myparent.i_bookmarked}
          id={tweet.myparent.id}
          oriId={tweet.id}
          retweet={tweet?.author.username === user?.username ? true : false}
        />
      ) : (
        <TweetOperation
          liked={tweet.iliked}
          likeTweetD={likeTweetD}
          like_count={tweet.like_count}
          tweet={tweet}
          bookmark={tweet.i_bookmarked}
          id={tweet.id}
          comment_count={tweet.comment_count}
        />
      )}
    </div>
  );
};

export default TweetPostCard;

const TweetHasParentOrNot = ({ tweet }) => {
  const url = "http://localhost:8000/";
  return (
    <>
      <span className="d-flex">
        <span className="add-tweet-image ">
          <Link to={`/${tweet?.author.username}`}>
            <img
              alt="img"
              src={tweet?.author.avatar}
              className="rounded-circle author-image "
              width="60px"
              height="60px"
            />
          </Link>
        </span>

        <Link to={`${tweet?.author.username}/tweet/${tweet?.id}`}>
          <div className="tweet-content">
            <span id="hover" className="d-flex">
              {tweet?.author.username}
              <span className="side-name">
                @ {tweet?.author.nickname} |{" "}
                {Moment(tweet?.created).fromNow(true)}
                <span className="mx-2">
                  {tweet?.is_private ? <FaLock /> : <BiGlobe />}
                  {tweet?.isEdited && <span className="mx-2">- Edited</span>}
                </span>
              </span>
            </span>

            <p className="mt-2">
              {tweet?.title} {tweet?.body}
            </p>
            <VideoPlayer tweet={tweet}/>
            
            
          </div>
        </Link>
      </span>
    </>
  );
};
