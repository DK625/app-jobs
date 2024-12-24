import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "../../components-sma/topbar/Topbar";
import Sidebar from "../../components-sma/sidebar/Sidebar";
import Feed from "../../components-sma/feed/Feed";
import Rightbar from "../../components-sma/rightbar/Rightbar";
import "./CadidateIndex.module.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCandidateInfo } from '../../actions';

function Home() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8000/api/candidate/get-list/', {
      withCredentials: true,
    }).then(res => {
      // console.log(res.data.info);
      
      dispatch(setCandidateInfo({
        uid: res.data.info._id,
        ...res.data.info.member,
      }));
    })
      .catch(error => {
        console.log(error);
        const code = error.response.status;
        if (code === 401 || code === 403)
          nav("/login");
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
/*        <div className="homeFeed">
          <Feed/>
        </div>*/
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <div className="homeSidebar">
          <Sidebar />
        </div>
        <div className="homeFeed">
          <Feed/>
        </div>
        <div className="homeRightbar">
          <Rightbar/>
        </div>
      </div>
    </>
  );
}
export default Home;