import "./post.css";
import { MoreVert, Send, Share, BookmarkAdd, ThumbUp, Comment } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
//import TimeAgo from 'timeago-react';
//import * as timeago from 'timeago.js';
//import vi from 'timeago.js/lib/lang/vi';
{/*
import { Link } from "react-router-dom";
*/}

//timeago.register('vi', vi);

export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/*<Link to={`/profile/`}>*/}
              <img
                className="postProfileImg"
                src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                alt=""
              />
              <div className="postProfileUsernameDate">
                <span className="postUsername">
                  {Users.filter((u) => u.id === post?.userId)[0].username}
                </span>
              {/*</Link>*/}
              {/*<Link to={`/post/${post.id}`}>*/}

              </div>
            {/*</Link>*/}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <div className="postCenterImg">
            <img className="postImg" src={post.photo} alt="" />
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomApply">
            <button class="button" style={{fontSize: '16px'}}>
              <Send />
              <span class="buttonTextApply">Ứng tuyển ngay</span>
            </button>
          </div>
          <hr className="postBottomHr"/>
          <div className="postBottom1">
            <div className="postBottomLeft">
              <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
              <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
              <span className="postLikeCounter">{like}</span>
            </div>
            <div className="postBottomRight">
              {/*<Link to={`/post/${post.id}`}>*/}
                <span className="postCommentText">{post.comment} bình luận</span>
              {/*</Link>*/}
            </div>
          </div>
          <hr className="postBottomHr"/>
          <div className="postBottomButtons">
              <button class="button">
                <ThumbUp />
                <span class="buttonText">Thích</span>
              </button>
              <button class="button">
                <Comment />
                <span class="buttonText">Bình luận</span>
              </button>
              <button class="button">
                <BookmarkAdd />
                <span class="buttonText">Lưu bài viết</span>
              </button>
              <button class="button">
                <Share />
                <span class="buttonText">Chia sẻ</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
