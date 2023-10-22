import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';

const Indexpage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState(null);
    const [chagetrendarr, setchagetrendarr] = useState(false);
    const [SearchEmpty, setchageSearchEmpty] = useState(false);

    const userdata = useSelector(state => state.userdata);
    const cacheduserData = useMemo(() => userdata, [userdata]);
    const updateuserData = (newData) => {
        dispatch({ type: 'UPDATE_USERDATA', payload: newData });
    };

    const jsondata = useSelector(state => state.jsondata);
    const cachedjsonData = useMemo(() => jsondata, [jsondata]);
    const updatejsonData = (newData) => {
        dispatch({ type: 'UPDATE_JSONDATA', payload: newData });
    };

    const [FollowedList, setloginFollowedList] = useState([]);

    const [FollowedTrendsList, setloginFollowedTrendsList] = useState([]);


    const logindata = useSelector(state => state.logindata);
    const cachedlogindata = useMemo(() => logindata, [logindata]);
    const updatelogindata = (newData) => {
        dispatch({ type: 'LOGIN_DATA', payload: newData });
    };

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user) {
            updatelogindata(user)
            console.log('获取基础的登录数据通过且进行数据请求');
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json()) 
                .then(data => {
                    updatejsonData(data);
                    console.log('获取地post数据',data);
                }).catch(error => console.error(error))
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json()) 
                .then(data => {
                    updateuserData(data);
                    console.log('获取地user数据',data);
                }).catch(error => console.error(error))
        }
    }, [])

    useEffect(() => {
        try {
            if (cacheduserData && cachedlogindata.id != null) {
                const matchedUsers = cacheduserData.filter(user => {
                    return (
                        user.id === (cachedlogindata.id + 1) % 10 ||
                        user.id === (cachedlogindata.id + 2) % 10 ||
                        user.id === (cachedlogindata.id + 3) % 10 ||
                        (cachedlogindata.id === 9 && user.id === 10) ||
                        (cachedlogindata.id === 7 && user.id === 10) ||
                        (cachedlogindata.id === 8 && user.id === 10)
                    );
                });
                setchagetrendarr(true)
                setloginFollowedList(matchedUsers);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(FollowedList);
    }, [cachedlogindata, userdata, cacheduserData]);

    useEffect(() => {
        if (chagetrendarr) {
            try {
                let matchedUsers = []
                let trendsuserarr = []
                trendsuserarr = [cachedlogindata.id];
                cachedjsonData.forEach(obj => {
                    if (trendsuserarr.includes(obj.userId)) {
                        matchedUsers.push(obj);
                    }
                });
                setloginFollowedTrendsList(matchedUsers);
            } catch (error) {
                console.log(error);
            }

        }
    }, [chagetrendarr, FollowedList, cacheduserData, SearchEmpty]);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user || cachedlogindata) {
            updatelogindata(user)
            console.log('获取基础的登录数据通过');
        } else {
                history.push("/auth");
        }
    }, [])


    return (
        <>
        </>
    )
}
export default Indexpage;