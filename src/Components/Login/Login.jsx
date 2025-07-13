import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Login.module.css'
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [togglePasswordView, setTogglePasswordView] = useState(true);

    const { token, url } = useContext(AppContext);
    const navigate = useNavigate();

    // const { t } = useContext(AppContext);


    function callServer() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${url}admin`);
        xhr.onreadystatechange = function () {
            try {
                if (this.readyState === 4 && this.status === 200) {
                    let data = JSON.parse(this.responseText);
                    for (let a of data) {
                        if (document.getElementById('email').value === a.email && document.getElementById('pass').value === a.password) {
                            document.getElementById('email').value = '';
                            document.getElementById('pass').value = '';
                            alert('Welcome back!');
                            // localStorage.setItem('login', true);
                            navigate('/');
                            return 1;
                        }
                    }
                    alert("This email was not found. Try again");
                    document.getElementById('email').value = '';
                    document.getElementById('pass').value = '';
                }
            }
            catch {
                alert('Server error, try again later');
                document.getElementById('email').value = '';
                document.getElementById('pass').value = '';
            }
        }
        xhr.send();
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        if (valid()) {
            document.getElementById('invalidEmail').innerHTML = '';
            document.getElementById('invalidPassword').innerHTML = '';
            callServer();
        }
    }

    function valid() {
        if (document.getElementById('email').value && document.getElementById('pass').value) {
            return true;
        } else if (document.getElementById('email').value) {
            document.getElementById('invalidEmail').innerHTML = '';
            document.getElementById('invalidPassword').innerHTML = "invalid Password";
        } else if (document.getElementById('pass').value) {
            document.getElementById('invalidEmail').innerHTML = "Please fill out this field.";
        } else {
            document.getElementById('invalidEmail').innerHTML = "Please fill out this field.";
            document.getElementById('invalidPassword').innerHTML = "invalid Password";
        }
    }

    return (
        <div className='bg-hover-color'>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh", color: "var(--text-color)" }}>
                <div className=" p-5 border rounded bg-white-color" style={{
                    maxWidth: "480px",
                    width: "100%", borderRadius: "1.25rem !important", boxShadow: " rgba(149, 157, 165, 0.2) 0px 6px 14px"
                }}>
                    <div className="logo text-center mb-3">
                        <img src={assets.admin_logo} alt="logo" className='img-responsive' style={{
                            width: "100%",
                            maxWidth: "220px"
                        }} />
                    </div>
                    <div className='login'>
                        <div className='text-center'>
                            <h1 className='m-0'>Admin Login</h1>
                            <p>Please login</p>
                        </div>

                        <form action="" method='post' className="was-validated" id='loginForm' onSubmit={handleSubmit}>
                            <div className="email mb-3">
                                <label htmlFor="email" className='d-block mb-2'>Email</label>
                                <input type="Email" id='email' name='email' placeholder='Enter Admin Email' className='d-block border rounded p-2 w-100 bg-transparent' style={{ outline: "none", caretColor: "var(--main-color)" }} />
                                {/* <div className="invalid-feedback">Please fill out this field.</div> */}
                                <span id="invalidEmail" style={{ color: "red", fontSize: ".75rem" }}></span>

                            </div>
                            <div className="password mb-3">
                                <label htmlFor="pass" className='d-block mb-2'>Password</label>
                                {
                                    togglePasswordView ?
                                        <div className='password border rounded p-2 w-100 bg-transparent position-relative'>
                                            <input type="password" name='password' id='pass' className='bg-transparent' style={{ outline: "none", border: "none", caretColor: "var(--main-color)" }} />
                                            <img src={assets.eye} alt="" width="30" className='position-absolute' style={{
                                                right: ".5rem",
                                                top: "50%",
                                                transform: "translateY(-50%)"
                                            }} onClick={() => setTogglePasswordView(!togglePasswordView)} />
                                        </div>
                                        :
                                        <div className='text border rounded p-2 w-100 bg-transparent position-relative '>
                                            <input type="text" name='password' id='pass' className='bg-transparent' style={{ outline: "none", border: "none", caretColor: "var(--main-color)" }} />
                                            <img src={assets.view} alt="" width="30" className='position-absolute' style={{
                                                right: ".5rem",
                                                top: "50%",
                                                transform: "translateY(-50%)"
                                            }} onClick={() => setTogglePasswordView(!togglePasswordView)} />
                                        </div>
                                }
                                <span id="invalidPassword" style={{ color: "red", fontSize: ".75rem" }}></span>

                            </div>

                            <input type="submit" value='Login' className='btn' style={{ backgroundColor: "var(--main-color)", color: "white", float: "right", fontWeight: "600" }} />


                        </form>
                    </div>
                </div>
            </div >
        </div>


    )
}

export default Login
