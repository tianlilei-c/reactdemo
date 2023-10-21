import React, { useState, useEffect, useMemo } from 'react';
import stylel from './auth.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userdata = useSelector(state => state.userdata);
    const cacheduserData = useMemo(() => userdata, [userdata]);
    const updateuserData = (newData) => {
        dispatch({ type: 'UPDATE_USERDATA', payload: newData });
    };
    const updatelogindata = (newData) => {
        dispatch({ type: 'LOGIN_DATA', payload: newData });
    };

    const [loginformData, setloginFormData] = useState({
        loginaccountname: "",
        loginpwd: "",
    });

    useEffect(() => {
        updatelogindata(null)
        localStorage.removeItem('user');
    }, [])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json()) 
            .then(data => {
                updateuserData(data);
            }).catch(error => console.error(error))
    }, []);

    const handleloginInputChange = (e) => {
        setloginFormData({
            ...loginformData,
            [e.target.name]: e.target.value
        });
    };

    const loginbtnsubmit = (e) => {
        e.preventDefault(); // 阻止默认提交行为
        const matchedUser = cacheduserData.filter(user => {
            return (
                user.username === loginformData.loginaccountname &&
                user.address.street === loginformData.loginpwd
            );
        });
        if (matchedUser.length === 1) {
            console.log(matchedUser[0]);
            updatelogindata(matchedUser[0]);
            const userString = JSON.stringify(matchedUser[0]);
            localStorage.setItem('user', userString);
            toast.success("login success");
            history.push("/");
        } else {
            console.log(false);
            toast.error("password Error or Incorrect password ");
        }
    };

    return (
        <div className={stylel.body}>
            <div className={stylel.shell}>
                <form action="" method="" className={stylel.form} id="b-form" onSubmit={loginbtnsubmit}>
                        <h2 className={`${stylel.form_title} ${stylel.title}`}>Login</h2>
                        <span className={stylel.form_span}>Please enter your Email and Password</span>
                        <input
                            name="loginaccountname"
                            placeholder="Your account name"
                            className={stylel.form_input}
                            required
                            value={loginformData.loginaccountname}
                            onChange={handleloginInputChange}
                        />
                        <input
                            type="password"
                            name="loginpwd"
                            className={stylel.form_input}
                            placeholder="Password"
                            required
                            value={loginformData.loginpwd}
                            onChange={handleloginInputChange}
                        />
                        <a className={stylel.form_link}>If you forget password please click here.</a>
                        <button className={`${stylel.form_button} ${stylel.button} ${stylel.submit}`} type="submit">SIGN IN</button>
                    </form>
            </div>
        </div>

    );
};

export default Login;
