import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should clear local browser cache after clicking Logout', () => {
    // 渲染 App 组件
    const { getByText } = render(<App />);

    // 点击 "Logout" 按钮
    const logoutButton = getByText('logout');
    fireEvent.click(logoutButton);

    // 检查本地浏览器缓存是否发生变化
    expect(localStorage.length).toBe(0);
    // 或者根据具体的缓存键值来检查
    // expect(localStorage.getItem('someKey')).toBeNull();
  });
});
