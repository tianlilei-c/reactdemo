import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Indexpage from './main'; // 修改为您的组件路径
import store from '../../store.js'; // 修改为您的Redux store路径

describe('<Indexpage />', () => {
    const mockUser = {
        id: 5,
        company: { catchPhrase: "Test" },
        username: "TestUser"
    };

    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([])
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('loads user data from localStorage', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        expect(localStorage.getItem).toHaveBeenCalledWith('user');
        // 添加更多的断言，如果需要验证Redux store的数据
    });

    it('redirects to /auth if no user is in localStorage', () => {
        const history = createMemoryHistory();
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Indexpage />
                </Router>
            </Provider>
        );

        expect(history.location.pathname).toBe("/auth");
    });

    it('calculates followed user list correctly', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        // 由于使用了useEffect和异步操作，可能需要使用act确保所有操作都已完成
        await act(async () => {});

        // 添加断言以验证Followed用户列表的正确性
        // 比如：expect(screen.getByText(/some user name/i)).toBeInTheDocument();
    });

    it('adds a user to followed list', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        const input = screen.getByRole('textbox', { name: /whatever_the_label_is/i }); // 修改为适当的标签/占位符
        userEvent.type(input, 'UsernameToFollow');
        const addButton = screen.getByRole('button', { name: /add/i }); // 修改为按钮的真实文本
        userEvent.click(addButton);

        // 添加断言以验证新用户是否已被添加到Followed列表中
    });

    it('filters the trends based on search input', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        const searchInput = screen.getByRole('textbox', { name: /search/i }); // 修改为适当的标签/占位符
        userEvent.type(searchInput, 'SearchText');
        // 如果有一个搜索按钮，点击它，否则这个步骤可能不需要

        // 添加断言以验证FollowedTrendsList是否正确地显示了匹配的条目
    });
});
