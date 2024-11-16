import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";



const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              let email = document.getElementById("email").value;
              let pass_word = document.getElementById("pass").value;
              let payload = { email, pass_word };

              loginAPI(payload)
                .then((res) => {
                  toast.success(res.message);
                  // lưu accessToken vào local Storage
                  localStorage.setItem("LOGIN_USER", res.token)
                  navigate("/") // chuyễn hướng đến trang chủ
                })
                .catch((error) => {
                  console.log(error)
                  toast.error(error.response.data.message)
                })
            }}
          >
            Login
          </button>
          <ReactFacebookLogin
            appId="918464496420132"
            fields="name , email , picture"
            callback={(response) => {
              console.log(response);
              let {name, email, id} = response;
              let payload = {name, email, id};
              loginFacebookAPI(payload)
              .then((result) => {
                // lưu access token vào localStorage
                localStorage.setItem("LOGIN_USER", result.token);

                // hiển thị message login facebook thành công
                toast.success(result.message);

                // navigate về trang Home
                navigate("/");
              })
              .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
              })
            }}
          />
        </div>
      </form>
    </div>
  </div>
};

export default Login;
