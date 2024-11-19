import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePasswordAPI, forgotPasswordAPI } from '../utils/fetchFromAPI';

export default function ForgotPass() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState(""); // lưu info email dùng cho step nhập code và mật khẩu mới
    const navigate = useNavigate();

    return <div className="p-5 " style={{ minHeight: "100vh" }}>
        <div className=" d-flex justify-content-center">

            {step == 0 && <form className="row g-3 text-white">
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị state khi người dùng nhập email
                    />
                </div>

                <div className="col-12">
                    <button type="button" className="btn btn-primary"

                        onClick={() => {
                            // let email = document.getElementById("email").value;
                            let email = document.getElementById('email').value;
                            forgotPasswordAPI({email})
                            .then((res) => {
                                toast.success(res.message);
                                setStep(1);
                            })
                            .catch((err) => {
                                toast.error(err.response.data.message);
                            })
                        }}
                    >Next</button>

                </div>

            </form>}

            {step == 1 && <form className="row g-3 text-white">
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Nhập CODE</label>
                    <input className="form-control" id="code" />
                    <label htmlFor="inputEmail4" className="form-label">Đổi mật khẩu</label>
                    <input className="form-control" id="pass" />
                </div>

                <div className="col-12">
                    <button type="button" className="btn btn-primary"

                        onClick={() => {
                            let code = document.getElementById("code").value;
                            let newPass = document.getElementById("pass").value;
                            changePasswordAPI({email,code,newPass})
                            .then((res) => {
                                toast.success(res.message)
                                navigate('/login')
                            })
                            .catch((err) => {
                                toast.error("Change password is fail");
                            })
                        }}
                    >Next</button>

                </div>

            </form>}


        </div>
    </div>
}