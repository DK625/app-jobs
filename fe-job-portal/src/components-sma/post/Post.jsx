import "./post.css";
import {
  MoreVert,
  Send,
  Share,
  BookmarkAdd,
  ThumbUp,
  Comment,
} from "@mui/icons-material";
import { UserOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import axios from "axios";


export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleSavePost = async (e,postId) =>{
    console.log(e)
    console.log(postId)
    try{
      const res = await axios.post(`http://localhost:8000/api/posts/save/${postId}`,{
        user_id: e
      });
      if (res.status === 200){
        console.log('done')
      }else{
        console.log('loi')
      }
    }catch(err){
      console.error('Loi khi goi Api', err)
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
           
          <div className="avatarContainer">
           <UserOutlined className="avatarIcon" />
          </div>

            <div className="postProfileUsernameDate">
              <span className="postUsername">{post.author_id.fullName}</span>
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
          <span className="postText">{post?.content}</span>
          <div className="postCenterImg">
            <img className="postImg" src={post.photo} alt="" />
          </div>
        </div>
        <div className="postBottom">
          <div className="postBottomApply">
            <button class="button" style={{ fontSize: "16px" }}>
              <Send />
              <span class="buttonTextApply">Ứng tuyển ngay</span>
            </button>
          </div>
          <hr className="postBottomHr" />
          <div className="postBottom1">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="assets/like.png"
                onClick={likeHandler}
                alt=""
              />
              <img
                className="likeIcon"
                src="assets/heart.png"
                onClick={likeHandler}
                alt=""
              />
              <span className="postLikeCounter">{like}</span>
            </div>
            <div className="postBottomRight">
              {/*<Link to={`/post/${post.id}`}>*/}
              <span className="postCommentText">{post.comment} bình luận</span>
              {/*</Link>*/}
            </div>
          </div>
          <hr className="postBottomHr" />
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
              <span class="buttonText" onClick={() => handleSavePost(post.author_id._id, post._id)}>Lưu bài viết</span>
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
