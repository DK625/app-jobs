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
import { useState } from "react";
import axios from "axios";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // Hàm lưu bài viết
  const handleSavePost = async (userId, postId) => {
    console.log('User ID:', userId);  // Kiểm tra giá trị userId
    console.log('Post ID:', postId);  // Kiểm tra giá trị postId
    try {
        const res = await axios.post(`http://localhost:8000/api/posts/save/${postId}`, {
          "user_id": `${userId}`
        });

      console.log('res: ', res)
      if (res.status === 200) {
        console.log('Bài viết đã được lưu thành công!');
      } else {
        console.log('Lỗi khi lưu bài viết');
      }
    } catch (err) {
      console.error('Lỗi khi gọi API', err);
    }
  };

  return (
    console.log('post: ', post),
    <div className="post">
      <div className="postWrapper"> 
        <div className="postTop">
          <div className="postTopLeft">
            <div className="avatarContainer">
              <UserOutlined className="avatarIcon" />
            </div>
            <div className="postProfileUsernameDate">
              <span className="postUsername">{post.author_id.fullName}</span>
            </div>
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
            <button className="button" style={{ fontSize: "16px" }}>
              <Send />
              <span className="buttonTextApply">Ứng tuyển ngay</span>
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
              <span className="postCommentText">{post.comment} bình luận</span>
            </div>
          </div>
          <hr className="postBottomHr" />
          <div className="postBottomButtons">
            <button className="button">
              <ThumbUp />
              <span className="buttonText">Thích</span>
            </button>
            <button className="button">
              <Comment />
              <span className="buttonText">Bình luận</span>
            </button>
            <button
              className="button"
              onClick={() => handleSavePost(post.author_id._id, post._id)} // Truyền post.author_id._id và post._id
            >
              <BookmarkAdd />
              <span className="buttonText">Lưu bài viết</span>
            </button>
            <button className="button">
              <Share />
              <span className="buttonText">Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
