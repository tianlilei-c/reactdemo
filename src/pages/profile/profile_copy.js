
import React, { useState, useEffect, useMemo } from 'react';
import stylel from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logindata = useSelector(state => state.logindata);
    const cachelogindata = useMemo(() => logindata, [logindata]);
    const updatelogindata = (newData) => {
        dispatch({ type: 'LOGIN_DATA', payload: newData });
    };

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user) {
            updatelogindata(user)
        } else {
            history.push("/auth");
        }
    }, [])

    const handleInputChange = (e) => {
    }

    return (
        <div className={stylel.body}>
            <div className={stylel.shell}>
                <div className={`${stylel.containercanno}`} id="a-container">
                    <form
                        action=""
                        method=""
                        className={stylel.oldform}
                        id="a-form" 
                    >
                        <h4 className={`${stylel.form_title} ${stylel.titlecanno}`}>Curr Info</h4>
                        <input
                            id="accountname"
                            name="accountname"
                            placeholder={cachelogindata?.username || 'user did not login'}
                            className={stylel.form_inputcanno}

                            onChange={handleInputChange}
                        />
                        <input
                            id="email"
                            name="email"
                            className={stylel.form_inputcanno}
                            placeholder={cachelogindata?.email || 'user did not login'}
                            pattern="\w+@\w+(.\w+){1,4}"

                            onChange={handleInputChange}
                        />
                        <input
                            id="tel"
                            name="tel"
                            type="tel"
                            className={stylel.form_inputcanno}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder={cachelogindata?.phone || 'user did not login'}

                            onChange={handleInputChange}
                        />
                        <input
                            id="zip"
                            name="zip"
                            className={stylel.form_inputcanno}
                            pattern="[0-9]{5}"
                            placeholder={cachelogindata?.zipcode || cachelogindata?.address?.zipcode || ''}

                            onChange={handleInputChange}
                        />

                        <input
                            id="zip"
                            name="zip"
                            className={stylel.form_inputcanno}
                            pattern="[0-9]{5}"
                            placeholder={cachelogindata?.pwd ? '*'.repeat(cachelogindata.pwd.length) : cachelogindata?.address?.street ? '*'.repeat(cachelogindata.address.street.length) : ''}

                            onChange={handleInputChange}
                        />
                        <div className={stylel.oldmsgpicturebox}>
                            <img src='/image/tx1.jpg'></img>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Profile;
