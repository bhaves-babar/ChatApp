import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header";
// import ChatPage from "./ChatPage";
import MyChat from "../Components/Mychat";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userData");
    // If user data exists, navigate to a different page
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);
  const fetchAgain=()=>{
    console.log('fetchAgain clicked');
  }
  const setFetchAgain=()=>{
    console.log("hello");
  }
  return (
    <div>
    <Header/>
    {/* <ChatPage/> */}
    <MyChat/>
    </div>
  );
};

export default Home;
