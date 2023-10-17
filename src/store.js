import { configureStore } from '@reduxjs/toolkit';

// 定义 reducer
function reducer(state = {}, action) {
  switch (action.type) {
    // 处理不同的 action
    case 'UPDATE_USERDATA':
      return { ...state, userdata: action.payload };
    case 'UPDATE_JSONDATA':
      return { ...state, jsondata: action.payload };
    case 'LOGIN_DATA':
      return { ...state, logindata: action.payload };
    default:
      return state;
  }
}

// 创建 store
const store = configureStore({ reducer });

export default store;
