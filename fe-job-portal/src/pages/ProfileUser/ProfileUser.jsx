import React, { useEffect, useState } from "react";
import axios from "axios";
import Feed from "../../components-sma/feed/Feed";
import Topbar from "../../components-sma/topbar/Topbar";
import styles from "./ProfileUser.css";

function ProfileUser() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });



  // Gọi API bài viết chỉ khi user._id đã có giá trị
  useEffect(() => {
    if (user.id) {
      axios
        .get(`http://localhost:8000/api/posts/user/${user.id}`, { withCredentials: true })
        .then((response) => {
          if (response.data && response.data.data) {
            setPosts(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API bài viết", error);
        });
    }
  }, [user._id]);


  return (
    console.log('posts: ', posts),
    <div className="profile">
      <Topbar />
      <div className="bigAvatar">
        <div className="info">
          <div className="avatar">
            <img src={user?.avatar} alt="avatar" />
          </div>
          <div className="infoText">
            <h1 className="name">{user?.fullName || "Tên không có"}</h1>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="box-1">
          <Feed posts={posts} />
        </div>
        <div className="box-2">
          <h2>Thông tin người dùng</h2>
          <ul>
            <li>Thành phố: {user?.address || "Chưa cập nhật"}</li>
            <li>Quê quán: {user?.address || "Chưa cập nhật"}</li>
            <li>Công việc hiện tại: {user.company || "Chưa cập nhật"}</li>
          </ul>
          <h2>Bạn bè</h2>
          <div className="list-friend">
            <div className="item">
              <div><img src="/assets/person/1.jpeg" alt="" /></div>
              <h4>Anh duc</h4>
            </div>
            <div className="item">
              <img src="/assets/person/1.jpeg" alt="" />
              <h4>Anh duc</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
