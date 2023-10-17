import React, { useEffect, useState } from 'react';
import styles from '../main.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Trends = ({ user }) => {
    const logindata = useSelector(state => state.logindata);
    const [startTime, setStartTime] = useState(null);
    useEffect(() => {
        const timestamp = Date.now(); 
        setStartTime(timestamp); 
    }, []);
    return (
        <div className={styles.feeds}>
            {/* <!-- =================FEED 1=================--> */}
            <div className={styles.feed}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <div className={styles['trendphoto']}>
                            <img src="/image/5.jpg" />
                        </div>
                        <div className={styles.info}>
                            <h3>{user.title}</h3>
                            <small>{user.body}</small>
                        </div>
                    </div>
                </div>

                <div className={styles.photo}>
                    <img src="/image/1.jpg" />
                </div>

                <div className={styles['action-buttons']}>
                    <div className={styles['interaction-buttons']}>
                        <button className={styles['image-button']}>
                            <img src='/image/pl.png'></img>
                        </button>
                    </div>
                    <div className={styles['interaction-buttons']}>
                        <p>{logindata.username}</p>
                        <p>{user.time ? user.time : startTime}</p>
                    </div>
                    <div className={styles.bookmark}>
                        <button className={styles['image-button']}>
                            <img src="/image/bj.png" alt="Button Image"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trends;
